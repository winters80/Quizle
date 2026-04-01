// =============================================
// DATABASE HELPERS — Firestore CRUD
// =============================================
import { db } from './config.js';
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp, Timestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { shuffle, getWeekStart, getMonthStart, generateCode } from './utils.js';

// ---- USERS ----

export async function getAllUsers() {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map(d => d.data());
}

export async function updateUserStatus(userId, status) {
  await updateDoc(doc(db, 'users', userId), { status });
}

export async function deleteUser(userId) {
  await deleteDoc(doc(db, 'users', userId));
}

export async function updateUserStats(userId, scoreGained, won) {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return;
  const u = snap.data();
  await updateDoc(userRef, {
    totalScore: (u.totalScore || 0) + scoreGained,
    gamesPlayed: (u.gamesPlayed || 0) + 1,
    wins: (u.wins || 0) + (won ? 1 : 0),
  });
}

// ---- QUESTIONS ----

export async function getQuestions(filters = {}) {
  let q = collection(db, 'questions');
  const constraints = [];
  if (filters.category) constraints.push(where('category', '==', filters.category));
  if (filters.difficulty) constraints.push(where('difficulty', '==', filters.difficulty));
  const snap = await getDocs(constraints.length ? query(q, ...constraints) : q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addQuestion(data) {
  const ref = await addDoc(collection(db, 'questions'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateQuestion(id, data) {
  await updateDoc(doc(db, 'questions', id), data);
}

export async function deleteQuestion(id) {
  await deleteDoc(doc(db, 'questions', id));
}

export async function importQuestions(questionsArray) {
  const batch = [];
  for (const q of questionsArray) {
    const { id, ...rest } = q;
    batch.push(setDoc(doc(db, 'questions', id), { ...rest, createdAt: serverTimestamp() }));
  }
  await Promise.all(batch);
  return batch.length;
}

/** Select N questions from the DB based on settings */
export async function selectQuestions(settings) {
  const { numQuestions, categories, difficulty } = settings;

  let allQuestions = [];
  for (const cat of categories) {
    const qs = await getQuestions({ category: cat });
    allQuestions = allQuestions.concat(qs);
  }

  // Filter by difficulty
  let pool = allQuestions;
  if (difficulty !== 'mixed') {
    pool = pool.filter(q => q.difficulty === difficulty);
  }

  if (pool.length === 0) return [];

  // If mixed, aim for ~30% easy, 50% medium, 20% hard
  let selected = [];
  if (difficulty === 'mixed') {
    const easy   = shuffle(pool.filter(q => q.difficulty === 'easy'));
    const medium = shuffle(pool.filter(q => q.difficulty === 'medium'));
    const hard   = shuffle(pool.filter(q => q.difficulty === 'hard'));

    const numEasy   = Math.max(1, Math.round(numQuestions * 0.3));
    const numHard   = Math.max(1, Math.round(numQuestions * 0.2));
    const numMedium = numQuestions - numEasy - numHard;

    selected = [
      ...easy.slice(0, numEasy),
      ...medium.slice(0, numMedium),
      ...hard.slice(0, numHard),
    ];

    // Fill any gaps if we didn't have enough of a difficulty
    if (selected.length < numQuestions) {
      const remaining = shuffle(pool.filter(q => !selected.find(s => s.id === q.id)));
      selected = selected.concat(remaining.slice(0, numQuestions - selected.length));
    }
  } else {
    selected = shuffle(pool).slice(0, numQuestions);
  }

  return shuffle(selected).slice(0, numQuestions);
}

// ---- GAMES ----

export async function createGame(hostUserId, hostHandle, settings, questions) {
  let code;
  let attempts = 0;
  // Ensure unique code
  while (attempts < 10) {
    code = generateCode(6);
    const existing = await getDocs(query(
      collection(db, 'games'),
      where('code', '==', code),
      where('status', 'in', ['lobby', 'countdown', 'question', 'reveal'])
    ));
    if (existing.empty) break;
    attempts++;
  }

  const gameId = code;
  const playerEntry = {
    handle: hostHandle,
    score: 0,
    answered: false,
    answer: null,
    skipped: false,
  };

  await setDoc(doc(db, 'games', gameId), {
    code,
    status: 'lobby',
    host: hostUserId,
    players: { [hostUserId]: playerEntry },
    settings,
    questions,
    currentQuestionIndex: 0,
    questionStartTime: null,
    skipVotes: [],
    countdownStart: null,
    createdAt: serverTimestamp(),
    finishedAt: null,
  });

  return gameId;
}

export async function getGameByCode(code) {
  const snap = await getDocs(query(
    collection(db, 'games'),
    where('code', '==', code.toUpperCase())
  ));
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export async function joinGame(gameId, userId, handle) {
  const gameRef = doc(db, 'games', gameId);
  const snap = await getDoc(gameRef);
  if (!snap.exists()) return { ok: false, error: 'Game not found.' };
  const game = snap.data();
  if (game.status !== 'lobby') return { ok: false, error: 'Game already started.' };

  await updateDoc(gameRef, {
    [`players.${userId}`]: {
      handle,
      score: 0,
      answered: false,
      answer: null,
      skipped: false,
    }
  });
  return { ok: true };
}

export async function startGame(gameId) {
  await updateDoc(doc(db, 'games', gameId), {
    status: 'countdown',
    countdownStart: serverTimestamp(),
  });
}

export async function beginQuestion(gameId, questionIndex, playerIds) {
  // Reset all players' answered state
  const playerUpdates = {};
  for (const uid of playerIds) {
    playerUpdates[`players.${uid}.answered`] = false;
    playerUpdates[`players.${uid}.answer`] = null;
    playerUpdates[`players.${uid}.skipped`] = false;
  }
  await updateDoc(doc(db, 'games', gameId), {
    status: 'question',
    currentQuestionIndex: questionIndex,
    questionStartTime: serverTimestamp(),
    skipVotes: [],
    ...playerUpdates,
  });
}

export async function submitAnswer(gameId, userId, answerIndex, skipped = false) {
  await updateDoc(doc(db, 'games', gameId), {
    [`players.${userId}.answered`]: true,
    [`players.${userId}.answer`]: skipped ? null : answerIndex,
    [`players.${userId}.skipped`]: skipped,
  });
}

export async function addSkipVote(gameId, userId) {
  const snap = await getDoc(doc(db, 'games', gameId));
  if (!snap.exists()) return;
  const game = snap.data();
  const votes = game.skipVotes || [];
  if (!votes.includes(userId)) {
    await updateDoc(doc(db, 'games', gameId), {
      skipVotes: [...votes, userId],
    });
  }
}

export async function revealAnswer(gameId, scores) {
  // scores: { [userId]: pointsGained }
  const updates = { status: 'reveal' };
  for (const [uid, pts] of Object.entries(scores)) {
    updates[`players.${uid}.score`] = pts;
  }
  await updateDoc(doc(db, 'games', gameId), updates);
}

export async function finishGame(gameId) {
  await updateDoc(doc(db, 'games', gameId), {
    status: 'finished',
    finishedAt: serverTimestamp(),
  });
}

// ---- GAME RESULTS ----

export async function saveGameResult(gameId, code, players, settings) {
  // players: array of { userId, handle, score }
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0] || null;

  await setDoc(doc(db, 'gameResults', gameId), {
    gameId,
    code,
    playedAt: serverTimestamp(),
    players: sorted.map((p, i) => ({ ...p, rank: i + 1 })),
    winner: winner ? { userId: winner.userId, handle: winner.handle, score: winner.score } : null,
    numQuestions: settings.numQuestions,
    categories: settings.categories,
  });
}

export async function getGameResults({ since, limitN = 20 } = {}) {
  const constraints = [orderBy('playedAt', 'desc'), limit(limitN)];
  if (since) constraints.unshift(where('playedAt', '>=', Timestamp.fromDate(since)));
  const snap = await getDocs(query(collection(db, 'gameResults'), ...constraints));
  return snap.docs.map(d => d.data());
}

// ---- LEADERBOARD ----

export async function getWeeklyLeaderboard() {
  const results = await getGameResults({ since: getWeekStart(), limitN: 100 });
  return aggregateLeaderboard(results);
}

export async function getMonthlyLeaderboard() {
  const results = await getGameResults({ since: getMonthStart(), limitN: 200 });
  return aggregateLeaderboard(results);
}

export async function getAllTimeLeaderboard() {
  const results = await getGameResults({ limitN: 500 });
  return aggregateLeaderboard(results);
}

function aggregateLeaderboard(results) {
  const map = {};
  for (const game of results) {
    for (const p of (game.players || [])) {
      if (!map[p.userId]) {
        map[p.userId] = { userId: p.userId, handle: p.handle, totalScore: 0, gamesPlayed: 0, wins: 0 };
      }
      map[p.userId].totalScore += p.score || 0;
      map[p.userId].gamesPlayed += 1;
      if (p.rank === 1) map[p.userId].wins += 1;
    }
  }
  return Object.values(map).sort((a, b) => b.totalScore - a.totalScore);
}

// ---- ADMIN CONFIG ----

export async function getAdminConfig() {
  const snap = await getDoc(doc(db, 'config', 'admin'));
  return snap.exists() ? snap.data() : null;
}

export async function setAdminPassword(hash) {
  await setDoc(doc(db, 'config', 'admin'), { passwordHash: hash });
}
