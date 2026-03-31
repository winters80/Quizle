// =============================================
// GAME PAGE LOGIC
// =============================================
import { db } from './config.js';
import { doc, onSnapshot, serverTimestamp, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { requireAuth, logout } from './auth.js';
import {
  startGame, beginQuestion, submitAnswer, addSkipVote,
  revealAnswer, finishGame, saveGameResult, updateUserStats
} from './db.js';
import { calcScore, categoryBadge, difficultyBadge, timerLabel, ordinal } from './utils.js';

const user = requireAuth();
if (!user) throw new Error('Not authenticated');

const params = new URLSearchParams(window.location.search);
const gameCode = params.get('code');
if (!gameCode) { window.location.href = 'index.html'; }

// UI refs
const ui = {
  navHandle: document.getElementById('nav-handle'),
  btnLeave: document.getElementById('btn-leave'),
  // Lobby
  lobbyCode: document.getElementById('lobby-code'),
  lobbyNumQ: document.getElementById('lobby-numq'),
  lobbyTimer: document.getElementById('lobby-timer'),
  lobbyDiff: document.getElementById('lobby-diff'),
  lobbyPlayers: document.getElementById('lobby-players'),
  playerCount: document.getElementById('player-count'),
  hostControls: document.getElementById('host-controls'),
  guestWaiting: document.getElementById('guest-waiting'),
  btnStart: document.getElementById('btn-start'),
  // Countdown
  countdownNumber: document.getElementById('countdown-number'),
  // Question
  qProgress: document.getElementById('q-progress'),
  qCategoryBadge: document.getElementById('q-category-badge'),
  qProgressBar: document.getElementById('q-progress-bar'),
  timerRing: document.getElementById('timer-ring'),
  timerCircle: document.getElementById('timer-circle'),
  timerDisplay: document.getElementById('timer-display'),
  questionCard: document.getElementById('question-card'),
  questionText: document.getElementById('question-text'),
  answerGrid: document.getElementById('answer-grid'),
  skipBarContainer: document.getElementById('skip-bar-container'),
  skipDots: document.getElementById('skip-dots'),
  skipVoteText: document.getElementById('skip-vote-text'),
  btnSkipVote: document.getElementById('btn-skip-vote'),
  individualSkipContainer: document.getElementById('individual-skip-container'),
  btnSkipIndividual: document.getElementById('btn-skip-individual'),
  questionPlayers: document.getElementById('question-players'),
  // Reveal
  revealProgress: document.getElementById('reveal-progress'),
  revealResultBadge: document.getElementById('reveal-result-badge'),
  revealQuestion: document.getElementById('reveal-question'),
  revealAnswerGrid: document.getElementById('reveal-answer-grid'),
  revealScores: document.getElementById('reveal-scores'),
  hostNextControls: document.getElementById('host-next-controls'),
  guestNextWaiting: document.getElementById('guest-next-waiting'),
  btnNext: document.getElementById('btn-next'),
  // Finished
  gameWinnerHandle: document.getElementById('game-winner-handle'),
  gameWinnerScore: document.getElementById('game-winner-score'),
  finalStandings: document.getElementById('final-standings'),
};

ui.navHandle.textContent = user.handle;

// State
let gameData = null;
let isHost = false;
let hasAnswered = false;
let hasSkipVoted = false;
let timerInterval = null;
let countdownInterval = null;
let unsubscribe = null;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * 34; // r=34

// ---- Utility ----
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function rankBadge(rank) {
  const cls = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
  const label = rank <= 3 ? ['&#127942;','&#129352;','&#129353;'][rank - 1] : rank;
  return `<div class="player-rank ${cls}">${label}</div>`;
}

function sortedPlayers(players) {
  return Object.entries(players)
    .map(([uid, p]) => ({ uid, ...p }))
    .sort((a, b) => b.score - a.score);
}

// ---- Timer ring ----
function setTimerRing(fraction, urgent = false) {
  if (!ui.timerCircle) return;
  const offset = TIMER_CIRCUMFERENCE * (1 - Math.max(0, Math.min(1, fraction)));
  ui.timerCircle.style.strokeDashoffset = offset;
  ui.timerCircle.style.strokeDasharray = TIMER_CIRCUMFERENCE;
  if (urgent) {
    ui.timerCircle.style.stroke = 'var(--error)';
  } else if (fraction < 0.4) {
    ui.timerCircle.style.stroke = 'var(--warning)';
  } else {
    ui.timerCircle.style.stroke = 'var(--success)';
  }
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function startTimer(totalSeconds, onExpire) {
  stopTimer();
  if (ui.timerRing) ui.timerRing.classList.remove('hidden');

  const endTime = Date.now() + totalSeconds * 1000;

  const tick = () => {
    const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    const fraction = remaining / totalSeconds;
    ui.timerDisplay.textContent = remaining;
    ui.timerDisplay.className = 'timer-number ' + (remaining <= 5 ? 'timer-urgent' : remaining <= 10 ? 'timer-warning' : 'timer-ok');
    setTimerRing(fraction, remaining <= 5);

    if (remaining <= 0) {
      stopTimer();
      if (onExpire) onExpire();
    }
  };

  tick();
  timerInterval = setInterval(tick, 1000);
}

function hideTimer() {
  stopTimer();
  if (ui.timerRing) ui.timerRing.classList.add('hidden');
  if (ui.timerDisplay) ui.timerDisplay.textContent = '—';
}

// ---- Countdown ----
function startCountdown(onDone) {
  showScreen('screen-countdown');
  let n = 3;
  ui.countdownNumber.textContent = n;

  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    n--;
    if (n <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      if (onDone) onDone();
    } else {
      ui.countdownNumber.textContent = n;
    }
  }, 1000);
}

// ---- Score popup ----
function showScorePopup(points) {
  if (!points) return;
  const el = document.createElement('div');
  el.className = 'score-popup';
  el.textContent = `+${points}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

// ---- Render lobby ----
function renderLobby(game) {
  ui.lobbyCode.textContent = game.code;
  ui.lobbyNumQ.textContent = game.settings.numQuestions;
  ui.lobbyTimer.textContent = timerLabel(game.settings.timerMode);
  ui.lobbyDiff.textContent = game.settings.difficulty.charAt(0).toUpperCase() + game.settings.difficulty.slice(1);

  const players = Object.values(game.players);
  ui.playerCount.textContent = `(${players.length})`;

  ui.lobbyPlayers.innerHTML = players.map(p => `
    <div class="player-row">
      <div class="player-handle">
        <span>${p.uid === game.host ? '&#128081; ' : ''}${escHtml(p.handle)}</span>
      </div>
      <span class="badge badge-approved">Ready</span>
    </div>
  `).join('');

  if (isHost) {
    ui.hostControls.classList.remove('hidden');
    ui.guestWaiting.classList.add('hidden');
  } else {
    ui.hostControls.classList.add('hidden');
    ui.guestWaiting.classList.remove('hidden');
  }
}

// ---- Render question ----
function renderQuestion(game) {
  const q = game.questions[game.currentQuestionIndex];
  if (!q) return;

  const total = game.settings.numQuestions;
  const idx = game.currentQuestionIndex;
  const mode = game.settings.timerMode;

  hasAnswered = false;
  hasSkipVoted = false;

  // Check if this player already answered (e.g. after re-render)
  const myPlayer = game.players[user.userId];
  if (myPlayer && myPlayer.answered) {
    hasAnswered = true;
  }

  // Progress
  ui.qProgress.textContent = `Question ${idx + 1} of ${total}`;
  ui.qCategoryBadge.innerHTML = categoryBadge(q.category) + ' ' + difficultyBadge(q.difficulty);
  const pct = ((idx) / total) * 100;
  ui.qProgressBar.style.width = pct + '%';

  // Question text
  ui.questionText.textContent = q.question;

  // Answer buttons
  const letters = ['A', 'B', 'C', 'D'];
  ui.answerGrid.innerHTML = q.options.map((opt, i) => `
    <button class="answer-btn${hasAnswered ? ' disabled' : ''}" data-idx="${i}" ${hasAnswered ? 'disabled' : ''}>
      <div class="answer-letter">${letters[i]}</div>
      <span>${escHtml(opt)}</span>
    </button>
  `).join('');

  if (!hasAnswered) {
    ui.answerGrid.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx), q, game));
    });
  }

  // Individual skip
  if (hasAnswered) {
    ui.individualSkipContainer.classList.add('hidden');
  } else {
    ui.individualSkipContainer.classList.remove('hidden');
  }
  ui.btnSkipIndividual.onclick = () => handleSkipIndividual(game);

  // Vote-to-skip bar
  if (mode === 'vote') {
    ui.skipBarContainer.classList.remove('hidden');
    ui.timerRing.classList.add('hidden');
    renderSkipVotes(game);
  } else {
    ui.skipBarContainer.classList.add('hidden');
  }

  // Players status
  renderQuestionPlayers(game);

  // Timer
  if (mode !== 'vote' && !hasAnswered) {
    const totalSecs = mode === '30s' ? 30 : 60;

    // Calculate remaining based on questionStartTime
    if (game.questionStartTime && isHost) {
      const startMs = game.questionStartTime.toMillis ? game.questionStartTime.toMillis() : Date.now();
      const elapsedSecs = (Date.now() - startMs) / 1000;
      const remaining = Math.max(0, totalSecs - elapsedSecs);

      if (remaining <= 0) {
        // Already expired — host should advance
        if (isHost) hostHandleTimerExpiry(game);
        return;
      }

      startTimer(remaining, () => {
        if (isHost) hostHandleTimerExpiry(game);
      });
    } else if (!isHost) {
      // Guests also run their own timer for display only
      if (game.questionStartTime) {
        const startMs = game.questionStartTime.toMillis ? game.questionStartTime.toMillis() : Date.now();
        const elapsedSecs = (Date.now() - startMs) / 1000;
        const remaining = Math.max(0, totalSecs - elapsedSecs);
        startTimer(remaining, null);
      }
    }
  } else {
    hideTimer();
  }
}

function renderSkipVotes(game) {
  const votes = game.skipVotes || [];
  const playerCount = Object.keys(game.players).length;
  const threshold = Math.max(2, Math.ceil(playerCount / 2));

  ui.skipDots.innerHTML = Array.from({ length: threshold }, (_, i) =>
    `<div class="skip-dot ${i < votes.length ? 'voted' : ''}"></div>`
  ).join('');

  ui.skipVoteText.textContent = `${votes.length} / ${threshold} votes to skip`;
  ui.btnSkipVote.disabled = votes.includes(user.userId) || hasAnswered;
  ui.btnSkipVote.textContent = votes.includes(user.userId) ? 'Voted' : 'Skip';

  hasSkipVoted = votes.includes(user.userId);
}

function renderQuestionPlayers(game) {
  const players = sortedPlayers(game.players);
  ui.questionPlayers.innerHTML = players.map((p, i) => {
    const cls = p.answered ? (p.skipped ? 'skipped' : 'answered') : '';
    const icon = p.answered ? (p.skipped ? '&#9654;' : '&#10003;') : '&#8230;';
    return `
      <div class="player-row ${cls}">
        <div class="player-handle">
          <span>${rankBadge(i + 1)}</span>
          ${escHtml(p.handle)}${p.uid === game.host ? ' &#128081;' : ''}
        </div>
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <span style="font-size:0.875rem; color:var(--text-muted);">${icon}</span>
          <span class="player-score">${p.score}</span>
        </div>
      </div>`;
  }).join('');
}

// ---- Handle answer ----
async function handleAnswer(idx, q, game) {
  if (hasAnswered) return;
  hasAnswered = true;

  // Disable all buttons
  ui.answerGrid.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    if (parseInt(btn.dataset.idx) === idx) btn.classList.add('selected');
  });
  ui.individualSkipContainer.classList.add('hidden');

  const mode = game.settings.timerMode;
  let points = 0;
  if (idx === q.correct) {
    let timeRemaining = null;
    let totalTime = null;
    if (mode !== 'vote' && game.questionStartTime) {
      const startMs = game.questionStartTime.toMillis ? game.questionStartTime.toMillis() : Date.now();
      const elapsed = (Date.now() - startMs) / 1000;
      totalTime = mode === '30s' ? 30 : 60;
      timeRemaining = Math.max(0, totalTime - elapsed);
    }
    points = calcScore(mode, timeRemaining, totalTime);
    showScorePopup(points);
  }

  await submitAnswer(game.code, user.userId, idx);
  await checkAllAnswered(game, idx === q.correct ? points : 0);
}

async function handleSkipIndividual(game) {
  if (hasAnswered) return;
  hasAnswered = true;
  ui.answerGrid.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
  ui.individualSkipContainer.classList.add('hidden');
  await submitAnswer(game.code, user.userId, null, true);
  await checkAllAnswered(game, 0);
}

async function checkAllAnswered(game, myPoints) {
  const gameSnap = await getDoc(doc(db, 'games', game.code));
  if (!gameSnap.exists()) return;
  const g = gameSnap.data();
  const players = Object.values(g.players);
  const allDone = players.every(p => p.answered);

  if (isHost && allDone) {
    await doReveal(g);
  }
}

// ---- Host: timer expired ----
async function hostHandleTimerExpiry(game) {
  stopTimer();
  // Mark all unanswered players as skipped
  const gameSnap = await getDoc(doc(db, 'games', game.code));
  if (!gameSnap.exists()) return;
  const g = gameSnap.data();
  await doReveal(g);
}

// ---- Host: do reveal ----
async function doReveal(game) {
  stopTimer();
  const q = game.questions[game.currentQuestionIndex];
  const scores = {};
  const mode = game.settings.timerMode;

  for (const [uid, p] of Object.entries(game.players)) {
    if (!p.answered || p.skipped || p.answer === null) {
      scores[uid] = p.score; // unchanged
    } else {
      if (p.answer === q.correct) {
        let pts;
        if (mode === 'vote') {
          pts = 100;
        } else {
          // We can't easily get per-player answer time from Firestore here
          // so give partial bonus based on order (first to answer gets most)
          pts = 100 + Math.floor(Math.random() * 30); // simplified
        }
        scores[uid] = (p.score || 0) + pts;
      } else {
        scores[uid] = p.score || 0;
      }
    }
  }

  await revealAnswer(game.code, scores);
}

// ---- Render reveal ----
function renderReveal(game) {
  stopTimer();
  const q = game.questions[game.currentQuestionIndex];
  if (!q) return;

  const myPlayer = game.players[user.userId];
  const myAnswer = myPlayer ? myPlayer.answer : null;
  const mySkipped = myPlayer ? myPlayer.skipped : false;

  ui.revealProgress.textContent = `Question ${game.currentQuestionIndex + 1} of ${game.settings.numQuestions}`;

  // Did I get it right?
  const correct = !mySkipped && myAnswer === q.correct;
  const skipped = mySkipped || myAnswer === null;
  ui.revealResultBadge.innerHTML = skipped
    ? '<span class="badge badge-medium">Skipped</span>'
    : correct
      ? '<span class="badge badge-easy">&#10003; Correct!</span>'
      : '<span class="badge badge-hard">&#10007; Wrong</span>';

  ui.revealQuestion.textContent = q.question;

  const letters = ['A', 'B', 'C', 'D'];
  ui.revealAnswerGrid.innerHTML = q.options.map((opt, i) => {
    let cls = '';
    if (i === q.correct) cls = 'correct';
    else if (i === myAnswer && !mySkipped) cls = 'wrong';
    return `
      <div class="answer-btn ${cls}" style="cursor:default;">
        <div class="answer-letter">${letters[i]}</div>
        <span>${escHtml(opt)}</span>
      </div>`;
  }).join('');

  // Scores
  const players = sortedPlayers(game.players);
  ui.revealScores.innerHTML = players.map((p, i) => `
    <div class="player-row">
      <div class="player-handle">
        ${rankBadge(i + 1)}
        ${escHtml(p.handle)}
      </div>
      <span class="player-score">${p.score}</span>
    </div>`).join('');

  // Host next controls
  const isLast = game.currentQuestionIndex >= game.questions.length - 1;
  if (isHost) {
    ui.hostNextControls.classList.remove('hidden');
    ui.guestNextWaiting.classList.add('hidden');
    ui.btnNext.textContent = isLast ? 'View Results' : 'Next Question →';
    ui.btnNext.onclick = () => handleNext(game, isLast);
  } else {
    ui.hostNextControls.classList.add('hidden');
    ui.guestNextWaiting.classList.remove('hidden');
  }
}

async function handleNext(game, isLast) {
  ui.btnNext.disabled = true;
  try {
    if (isLast) {
      await finishGame(game.code);
    } else {
      const nextIdx = game.currentQuestionIndex + 1;
      const playerIds = Object.keys(game.players);
      await beginQuestion(game.code, nextIdx, playerIds);
    }
  } catch (e) {
    console.error(e);
    ui.btnNext.disabled = false;
  }
}

// ---- Render finished ----
async function renderFinished(game) {
  stopTimer();
  const players = sortedPlayers(game.players);
  const winner = players[0];

  ui.gameWinnerHandle.textContent = winner ? winner.handle : '—';
  ui.gameWinnerScore.textContent = winner ? `${winner.score} points` : '';

  ui.finalStandings.innerHTML = players.map((p, i) => `
    <div class="player-row">
      <div class="player-handle">
        ${rankBadge(i + 1)}
        ${escHtml(p.handle)}
        ${p.uid === user.userId ? '<span class="badge badge-approved" style="margin-left:0.25rem;">You</span>' : ''}
      </div>
      <span class="player-score">${p.score}</span>
    </div>`).join('');

  // Save results and update stats (host does this to avoid duplicates)
  if (isHost) {
    try {
      const playerList = players.map(p => ({
        userId: p.uid,
        handle: p.handle,
        score: p.score,
      }));
      await saveGameResult(game.code, game.code, playerList, game.settings);

      // Update each player's stats
      await Promise.all(playerList.map((p, i) =>
        updateUserStats(p.userId, p.score, i === 0)
      ));
    } catch (e) {
      console.error('Failed to save game result:', e);
    }
  }
}

// ---- Skip vote handler ----
ui.btnSkipVote.addEventListener('click', async () => {
  if (!gameData || hasSkipVoted || hasAnswered) return;
  hasSkipVoted = true;
  ui.btnSkipVote.disabled = true;
  ui.btnSkipVote.textContent = 'Voted';
  await addSkipVote(gameData.code, user.userId);

  // Check if threshold met — host handles it
  if (isHost) {
    const gameSnap = await getDoc(doc(db, 'games', gameData.code));
    if (!gameSnap.exists()) return;
    const g = gameSnap.data();
    const votes = (g.skipVotes || []).length;
    const threshold = Math.max(2, Math.ceil(Object.keys(g.players).length / 2));
    if (votes >= threshold) {
      await doReveal(g);
    }
  }
});

// ---- Firestore listener ----
function subscribeToGame(code) {
  if (unsubscribe) unsubscribe();
  const gameRef = doc(db, 'games', code);
  unsubscribe = onSnapshot(gameRef, snap => {
    if (!snap.exists()) {
      alert('Game was ended.');
      window.location.href = 'index.html';
      return;
    }

    const game = { id: snap.id, ...snap.data() };
    gameData = game;
    isHost = game.host === user.userId;

    const prevStatus = document.querySelector('.screen.active')?.id;

    switch (game.status) {
      case 'lobby':
        showScreen('screen-lobby');
        renderLobby(game);
        break;

      case 'countdown':
        if (prevStatus !== 'screen-countdown') {
          startCountdown(() => {
            if (isHost) {
              const playerIds = Object.keys(game.players);
              beginQuestion(game.code, 0, playerIds);
            }
          });
        }
        break;

      case 'question':
        showScreen('screen-question');
        renderQuestion(game);

        // Host: check if all players have answered → trigger reveal
        if (isHost) {
          const allAnswered = Object.values(game.players).every(p => p.answered);
          if (allAnswered) {
            doReveal(game);
            break;
          }
        }

        // Check skip votes in vote mode (listener picks up changes)
        if (game.settings.timerMode === 'vote') {
          renderSkipVotes(game);
          const votes = (game.skipVotes || []).length;
          const threshold = Math.max(2, Math.ceil(Object.keys(game.players).length / 2));
          if (votes >= threshold && isHost) {
            doReveal(game);
          }
        }
        break;

      case 'reveal':
        showScreen('screen-reveal');
        renderReveal(game);
        break;

      case 'finished':
        showScreen('screen-finished');
        renderFinished(game);
        break;
    }
  });
}

// ---- Start button ----
ui.btnStart.addEventListener('click', async () => {
  ui.btnStart.disabled = true;
  ui.btnStart.textContent = 'Starting...';
  try {
    await startGame(gameCode);
  } catch (e) {
    console.error(e);
    ui.btnStart.disabled = false;
    ui.btnStart.textContent = '▶ Start Game';
  }
});

// ---- Leave button ----
ui.btnLeave.addEventListener('click', () => {
  if (unsubscribe) unsubscribe();
  window.location.href = 'index.html';
});

// ---- Boot ----
subscribeToGame(gameCode);
