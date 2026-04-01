// =============================================
// ADMIN PAGE LOGIC
// =============================================
import { db } from './config.js';
import { collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  getAdminConfig, setAdminPassword,
  getAllUsers, updateUserStatus, deleteUser,
  getQuestions, addQuestion, updateQuestion, deleteQuestion, importQuestions,
  getGameResults
} from './db.js';
import { hashPassword, formatDate, categoryBadge, difficultyBadge, showAlert, clearAlert } from './utils.js';
import defaultQuestions from './questions.js';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let allUsers = [];
let allQuestions = [];
let editingQuestionId = null;

// ---- Admin login ----
async function init() {
  const config = await getAdminConfig();

  if (!config || !config.passwordHash) {
    showScreen('screen-set-password');
    return;
  }

  showScreen('screen-admin-login');
}

document.getElementById('btn-admin-login').addEventListener('click', async () => {
  const pw = document.getElementById('admin-password-input').value;
  clearAlert('admin-login-alert');

  if (!pw) {
    showAlert('admin-login-alert', 'Please enter the admin password.', 'error');
    return;
  }

  const btn = document.getElementById('btn-admin-login');
  btn.disabled = true;
  btn.textContent = 'Checking...';

  try {
    const config = await getAdminConfig();
    const hash = await hashPassword(pw);

    if (hash !== config.passwordHash) {
      showAlert('admin-login-alert', 'Incorrect password.', 'error');
      btn.disabled = false;
      btn.textContent = 'Enter Admin Panel';
      return;
    }

    showScreen('screen-admin-dash');
    loadDashboard();
  } catch (e) {
    showAlert('admin-login-alert', 'Error: ' + e.message, 'error');
    btn.disabled = false;
    btn.textContent = 'Enter Admin Panel';
  }
});

// Enter key for admin login
document.getElementById('admin-password-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-admin-login').click();
});

document.getElementById('btn-set-password').addEventListener('click', async () => {
  const pw = document.getElementById('new-admin-pw').value;
  const pw2 = document.getElementById('confirm-admin-pw').value;
  clearAlert('set-pw-alert');

  if (!pw || pw.length < 6) {
    showAlert('set-pw-alert', 'Password must be at least 6 characters.', 'error');
    return;
  }
  if (pw !== pw2) {
    showAlert('set-pw-alert', 'Passwords do not match.', 'error');
    return;
  }

  const btn = document.getElementById('btn-set-password');
  btn.disabled = true;
  btn.textContent = 'Setting password...';

  try {
    const hash = await hashPassword(pw);
    await setAdminPassword(hash);
    showScreen('screen-admin-dash');
    loadDashboard();
  } catch (e) {
    showAlert('set-pw-alert', 'Error: ' + e.message, 'error');
    btn.disabled = false;
    btn.textContent = 'Set Password & Enter';
  }
});

document.getElementById('btn-admin-logout').addEventListener('click', () => {
  showScreen('screen-admin-login');
});

// ---- Dashboard ----
async function loadDashboard() {
  await Promise.all([loadUsers(), loadQuestions(), loadGameHistory()]);
  loadStats();
}

async function loadStats() {
  const pending = allUsers.filter(u => u.status === 'pending').length;
  const approved = allUsers.filter(u => u.status === 'approved').length;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-approved').textContent = approved;
  document.getElementById('stat-questions').textContent = allQuestions.length;
}

// ---- Users ----
async function loadUsers() {
  try {
    allUsers = await getAllUsers();
    renderPendingUsers();
    renderUsersTable(allUsers);
  } catch (e) {
    console.error(e);
  }
}

function renderPendingUsers() {
  const pending = allUsers.filter(u => u.status === 'pending');
  const countEl = document.getElementById('pending-count');
  if (countEl) countEl.textContent = pending.length;

  const container = document.getElementById('pending-list');
  if (!container) return;

  if (pending.length === 0) {
    container.innerHTML = '<p class="text-dim" style="font-size:0.875rem;">No pending registrations.</p>';
    return;
  }

  container.innerHTML = pending.map(u => `
    <div class="card card-sm mb-sm flex items-center justify-between" style="flex-wrap:wrap; gap:0.5rem;">
      <div>
        <span style="font-weight:700;">${escHtml(u.handle)}</span>
        <span class="text-dim" style="font-size:0.8rem; margin-left:0.5rem;">Registered ${formatDate(u.createdAt)}</span>
      </div>
      <div class="flex gap-sm">
        <button class="btn btn-success btn-sm" onclick="handleUserAction('${u.userId}', 'approved')">Approve</button>
        <button class="btn btn-danger btn-sm" onclick="handleUserAction('${u.userId}', 'rejected')">Reject</button>
        <button class="btn btn-danger btn-sm" onclick="handleDeleteUser('${u.userId}', '${escHtml(u.handle)}')">Delete</button>
      </div>
    </div>`).join('');
}

function renderUsersTable(users) {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;

  if (!users || users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-dim text-center" style="padding:2rem;">No users found.</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(u => `
    <tr>
      <td style="font-weight:600;">${escHtml(u.handle)}</td>
      <td><span class="badge badge-${u.status}">${u.status}</span></td>
      <td>${u.gamesPlayed || 0}</td>
      <td>${u.totalScore || 0}</td>
      <td>${u.wins || 0}</td>
      <td class="text-dim" style="font-size:0.8rem;">${formatDate(u.createdAt)}</td>
      <td>
        <div class="flex gap-sm">
          ${u.status !== 'approved' ? `<button class="btn btn-success btn-sm" onclick="handleUserAction('${u.userId}', 'approved')">Approve</button>` : ''}
          ${u.status !== 'rejected' ? `<button class="btn btn-danger btn-sm" onclick="handleUserAction('${u.userId}', 'rejected')">Reject</button>` : ''}
          ${u.status === 'rejected' ? `<button class="btn btn-secondary btn-sm" onclick="handleUserAction('${u.userId}', 'pending')">Re-review</button>` : ''}
          <button class="btn btn-danger btn-sm" onclick="handleDeleteUser('${u.userId}', '${escHtml(u.handle)}')">Delete</button>
        </div>
      </td>
    </tr>`).join('');
}

window.handleUserAction = async (userId, newStatus) => {
  clearAlert('admin-alert');
  try {
    await updateUserStatus(userId, newStatus);
    showAlert('admin-alert', `User status updated to "${newStatus}".`, 'success');
    await loadUsers();
    loadStats();
  } catch (e) {
    showAlert('admin-alert', 'Error: ' + e.message, 'error');
  }
};

window.handleDeleteUser = async (userId, handle) => {
  if (!confirm(`Permanently delete user "${handle}"? This cannot be undone.`)) return;
  clearAlert('admin-alert');
  try {
    await deleteUser(userId);
    showAlert('admin-alert', `User "${handle}" deleted.`, 'success');
    await loadUsers();
    loadStats();
  } catch (e) {
    showAlert('admin-alert', 'Error: ' + e.message, 'error');
  }
};

window.handleRefresh = async () => {
  const btn = document.getElementById('btn-refresh');
  btn.textContent = 'Refreshing...';
  btn.disabled = true;
  await loadDashboard();
  btn.textContent = '↻ Refresh';
  btn.disabled = false;
};

// User search
document.getElementById('user-search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filtered = allUsers.filter(u => u.handle.toLowerCase().includes(q));
  renderUsersTable(filtered);
});

// ---- Questions ----
async function loadQuestions() {
  try {
    allQuestions = await getQuestions();
    renderQuestionsTable(allQuestions);
    const qCount = document.getElementById('q-count');
    if (qCount) qCount.textContent = `${allQuestions.length} question${allQuestions.length !== 1 ? 's' : ''} in database`;
  } catch (e) {
    console.error(e);
  }
}

function renderQuestionsTable(questions) {
  const tbody = document.getElementById('questions-tbody');
  if (!tbody) return;

  if (!questions || questions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-dim text-center" style="padding:2rem;">No questions found. Click "Import Default Questions" to add the built-in set.</td></tr>';
    return;
  }

  tbody.innerHTML = questions.map(q => `
    <tr>
      <td style="max-width:350px;">
        <div style="font-size:0.875rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          ${escHtml(q.question)}
        </div>
        <div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.2rem;">
          ✓ ${escHtml(q.options?.[q.correct] || '?')}
        </div>
      </td>
      <td>${categoryBadge(q.category)}</td>
      <td>${difficultyBadge(q.difficulty)}</td>
      <td>
        <div class="flex gap-sm">
          <button class="btn btn-secondary btn-sm" onclick="openEditQuestion('${q.id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="handleDeleteQuestion('${q.id}')">Del</button>
        </div>
      </td>
    </tr>`).join('');
}

// Question filters
function applyQuestionFilters() {
  const cat = document.getElementById('q-filter-cat').value;
  const diff = document.getElementById('q-filter-diff').value;
  const search = document.getElementById('q-search').value.toLowerCase();

  let filtered = allQuestions;
  if (cat) filtered = filtered.filter(q => q.category === cat);
  if (diff) filtered = filtered.filter(q => q.difficulty === diff);
  if (search) filtered = filtered.filter(q => q.question.toLowerCase().includes(search));

  renderQuestionsTable(filtered);
}

document.getElementById('q-filter-cat').addEventListener('change', applyQuestionFilters);
document.getElementById('q-filter-diff').addEventListener('change', applyQuestionFilters);
document.getElementById('q-search').addEventListener('input', applyQuestionFilters);

// Add question button
document.getElementById('btn-add-question').addEventListener('click', () => {
  openAddQuestion();
});

function openAddQuestion() {
  editingQuestionId = null;
  document.getElementById('q-modal-title').textContent = 'Add Question';
  document.getElementById('q-text').value = '';
  document.getElementById('q-cat').value = 'movies';
  document.getElementById('q-diff').value = 'easy';
  document.getElementById('q-edit-id').value = '';
  document.querySelectorAll('.q-opt').forEach((inp, i) => { inp.value = ''; inp.placeholder = `Option ${['A','B','C','D'][i]}${i === 0 ? ' (mark correct)' : ''}`; });
  document.querySelectorAll('input[name="correct-opt"]')[0].checked = true;
  clearAlert('q-modal-alert');
  document.getElementById('question-modal').classList.remove('hidden');
}

window.openEditQuestion = (id) => {
  const q = allQuestions.find(x => x.id === id);
  if (!q) return;
  editingQuestionId = id;
  document.getElementById('q-modal-title').textContent = 'Edit Question';
  document.getElementById('q-text').value = q.question;
  document.getElementById('q-cat').value = q.category;
  document.getElementById('q-diff').value = q.difficulty;
  document.getElementById('q-edit-id').value = id;
  document.querySelectorAll('.q-opt').forEach((inp, i) => { inp.value = q.options?.[i] || ''; });
  document.querySelectorAll('input[name="correct-opt"]').forEach((r, i) => { r.checked = i === q.correct; });
  clearAlert('q-modal-alert');
  document.getElementById('question-modal').classList.remove('hidden');
};

document.getElementById('btn-save-question').addEventListener('click', async () => {
  clearAlert('q-modal-alert');
  const questionText = document.getElementById('q-text').value.trim();
  const cat = document.getElementById('q-cat').value;
  const diff = document.getElementById('q-diff').value;
  const opts = [...document.querySelectorAll('.q-opt')].map(i => i.value.trim());
  const correct = parseInt(document.querySelector('input[name="correct-opt"]:checked')?.value || '0', 10);

  if (!questionText) { showAlert('q-modal-alert', 'Please enter the question text.', 'error'); return; }
  if (opts.some(o => !o)) { showAlert('q-modal-alert', 'Please fill in all 4 options.', 'error'); return; }

  const btn = document.getElementById('btn-save-question');
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const data = { question: questionText, category: cat, difficulty: diff, options: opts, correct };
    if (editingQuestionId) {
      await updateQuestion(editingQuestionId, data);
    } else {
      await addQuestion(data);
    }
    document.getElementById('question-modal').classList.add('hidden');
    await loadQuestions();
    loadStats();
  } catch (e) {
    showAlert('q-modal-alert', 'Error: ' + e.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Question';
  }
});

window.handleDeleteQuestion = async (id) => {
  if (!confirm('Delete this question?')) return;
  try {
    await deleteQuestion(id);
    await loadQuestions();
    loadStats();
  } catch (e) {
    alert('Error: ' + e.message);
  }
};

// Import default questions
document.getElementById('btn-import-questions').addEventListener('click', async () => {
  const btn = document.getElementById('btn-import-questions');

  if (!confirm(`Import ${defaultQuestions.length} default questions into Firestore? This will overwrite any questions with the same ID.`)) return;

  btn.disabled = true;
  btn.textContent = 'Importing...';

  try {
    const count = await importQuestions(defaultQuestions);
    alert(`✓ Successfully imported ${count} questions.`);
    await loadQuestions();
    loadStats();
  } catch (e) {
    alert('Import failed: ' + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '↙ Import Default Questions';
  }
});

// ---- Game History ----
async function loadGameHistory() {
  const container = document.getElementById('game-history-list');
  const statEl = document.getElementById('stat-games');

  try {
    const results = await getGameResults({ limitN: 20 });

    if (statEl) statEl.textContent = results.length;

    if (!results || results.length === 0) {
      if (container) container.innerHTML = '<p class="text-dim" style="font-size:0.875rem;">No games played yet.</p>';
      return;
    }

    container.innerHTML = results.map(game => {
      const cats = (game.categories || []).join(', ');
      const players = (game.players || []).map(p => `${escHtml(p.handle)} (${p.score})`).join(' · ');
      const winner = game.winner;
      return `
        <div class="card card-sm mb-sm">
          <div class="flex items-center justify-between mb-sm">
            <div>
              <span style="font-weight:700; color:var(--gold);">&#127942; ${escHtml(winner?.handle || '—')}</span>
              <span class="text-muted" style="font-size:0.8rem;"> · ${winner?.score || 0} pts · Code: ${escHtml(game.code || '?')}</span>
            </div>
            <span class="text-dim" style="font-size:0.8rem;">${game.playedAt ? formatDate(game.playedAt) : '—'}</span>
          </div>
          <div class="text-dim" style="font-size:0.8rem;">${players}</div>
        </div>`;
    }).join('');
  } catch (e) {
    console.error(e);
    if (container) container.innerHTML = '<p class="text-dim" style="font-size:0.875rem;">Failed to load game history.</p>';
  }
}

// ---- Boot ----
init();
