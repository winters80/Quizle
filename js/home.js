// =============================================
// HOME PAGE LOGIC
// =============================================
import { loginUser, registerUser, getCurrentUser, logout } from './auth.js';
import { createGame, getGameByCode, joinGame, selectQuestions, getWeeklyLeaderboard, getMonthlyLeaderboard } from './db.js';
import { showAlert, clearAlert, isFriday, getWeekLabel, getMonthLabel } from './utils.js';

const user = getCurrentUser();

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ---- Render winner banners ----
async function renderWinnerBanners() {
  const container = document.getElementById('winner-banners');
  if (!container) return;

  try {
    const [weekly, monthly] = await Promise.all([
      getWeeklyLeaderboard(),
      getMonthlyLeaderboard(),
    ]);

    let html = '';

    // Weekly winner — show on Fridays or if there are results
    if (weekly.length > 0) {
      const w = weekly[0];
      html += `
        <div class="winner-banner mb-md fade-in">
          <span class="winner-crown">&#127942;</span>
          <p class="text-muted" style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.25rem;">
            ${isFriday() ? '&#127881; This Week\'s Winner!' : 'This Week\'s Leader'}
            &nbsp;·&nbsp; ${getWeekLabel()}
          </p>
          <h3 class="gold-text">${escHtml(w.handle)}</h3>
          <p class="text-muted" style="font-size:0.875rem;">${w.totalScore} pts · ${w.gamesPlayed} game${w.gamesPlayed !== 1 ? 's' : ''}</p>
        </div>`;
    }

    // Monthly winner — show on first of month
    const today = new Date();
    if (today.getDate() === 1 && monthly.length > 0) {
      const m = monthly[0];
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      html += `
        <div class="winner-banner mb-md fade-in" style="border-color:var(--accent); box-shadow:0 0 30px var(--accent-glow);">
          <span class="winner-crown">&#127881;</span>
          <p class="text-muted" style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.25rem;">
            &#127881; Monthly Champion · ${getMonthLabel(lastMonth)}
          </p>
          <h3 class="gradient-text">${escHtml(m.handle)}</h3>
          <p class="text-muted" style="font-size:0.875rem;">${m.totalScore} pts · ${m.wins} win${m.wins !== 1 ? 's' : ''}</p>
        </div>`;
    }

    container.innerHTML = html;
  } catch (e) {
    // Silently fail — non-critical
  }
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- Auth: Login ----
document.getElementById('btn-login').addEventListener('click', async () => {
  const handle = document.getElementById('login-handle').value.trim();
  const password = document.getElementById('login-password').value;
  clearAlert('login-alert');

  const btn = document.getElementById('btn-login');
  btn.disabled = true;
  btn.textContent = 'Logging in...';

  try {
    const result = await loginUser(handle, password);
    if (!result.ok) {
      showAlert('login-alert', result.error, 'error');
    } else {
      initHome(result.user);
    }
  } catch (e) {
    showAlert('login-alert', 'Connection error. Check your internet and Firebase setup.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Login';
  }
});

// ---- Auth: Register ----
document.getElementById('btn-register').addEventListener('click', async () => {
  const handle = document.getElementById('reg-handle').value.trim();
  const pw = document.getElementById('reg-password').value;
  const pw2 = document.getElementById('reg-confirm').value;
  clearAlert('register-alert');

  if (pw !== pw2) {
    showAlert('register-alert', 'Passwords do not match.', 'error');
    return;
  }

  const btn = document.getElementById('btn-register');
  btn.disabled = true;
  btn.textContent = 'Requesting...';

  try {
    const result = await registerUser(handle, pw);
    if (!result.ok) {
      showAlert('register-alert', result.error, 'error');
    } else {
      showAlert('register-alert',
        '&#10003; Registration submitted! The admin will approve your account. Check back soon.',
        'success');
    }
  } catch (e) {
    showAlert('register-alert', 'Connection error. Check your internet and Firebase setup.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Request Access';
  }
});

// ---- Home: Create Game ----
document.getElementById('btn-create').addEventListener('click', async () => {
  clearAlert('create-alert');

  const activeCats = [...document.querySelectorAll('.category-btn.active')].map(el => el.dataset.cat);
  if (activeCats.length === 0) {
    showAlert('create-alert', 'Please select at least one category.', 'error');
    return;
  }

  const numQuestions = parseInt(document.getElementById('num-questions').value, 10);
  const difficulty = document.getElementById('difficulty-mix').value;
  const timerMode = document.querySelector('input[name="timer"]:checked')?.value || '30s';

  const settings = { numQuestions, categories: activeCats, difficulty, timerMode };

  const btn = document.getElementById('btn-create');
  btn.disabled = true;
  btn.textContent = 'Creating room...';

  try {
    // Select questions upfront
    const questions = await selectQuestions(settings);
    if (questions.length === 0) {
      showAlert('create-alert', 'No questions found for those settings. Try different categories or difficulty.', 'error');
      btn.disabled = false;
      btn.textContent = 'Create Game Room';
      return;
    }

    const currentUser = getCurrentUser();
    const gameId = await createGame(currentUser.userId, currentUser.handle, settings, questions);
    window.location.href = `game.html?code=${gameId}`;
  } catch (e) {
    console.error(e);
    showAlert('create-alert', 'Failed to create game. Check your Firebase setup.', 'error');
    btn.disabled = false;
    btn.textContent = 'Create Game Room';
  }
});

// ---- Home: Join Game ----
document.getElementById('btn-join').addEventListener('click', async () => {
  const code = document.getElementById('join-code').value.trim().toUpperCase();
  clearAlert('join-alert');

  if (code.length !== 6) {
    showAlert('join-alert', 'Please enter a 6-character room code.', 'error');
    return;
  }

  const btn = document.getElementById('btn-join');
  btn.disabled = true;
  btn.textContent = 'Joining...';

  try {
    const game = await getGameByCode(code);
    if (!game) {
      showAlert('join-alert', 'Game room not found. Check the code and try again.', 'error');
      btn.disabled = false;
      btn.textContent = 'Join Game';
      return;
    }
    if (game.status !== 'lobby') {
      showAlert('join-alert', 'That game has already started. Wait for the next one!', 'error');
      btn.disabled = false;
      btn.textContent = 'Join Game';
      return;
    }

    const currentUser = getCurrentUser();
    const result = await joinGame(game.id, currentUser.userId, currentUser.handle);
    if (!result.ok) {
      showAlert('join-alert', result.error, 'error');
      btn.disabled = false;
      btn.textContent = 'Join Game';
      return;
    }

    window.location.href = `game.html?code=${game.id}`;
  } catch (e) {
    showAlert('join-alert', 'Connection error. Try again.', 'error');
    btn.disabled = false;
    btn.textContent = 'Join Game';
  }
});

// Join on Enter key in code field
document.getElementById('join-code').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-join').click();
});

// ---- Logout ----
document.getElementById('btn-logout').addEventListener('click', logout);

// ---- Init ----
function initHome(u) {
  const currentUser = u || getCurrentUser();
  if (!currentUser) {
    showScreen('screen-auth');
    document.getElementById('navbar').classList.add('hidden');
    return;
  }

  document.getElementById('nav-handle').textContent = currentUser.handle;
  document.getElementById('navbar').classList.remove('hidden');
  showScreen('screen-home');
  renderWinnerBanners();
}

initHome(user);
