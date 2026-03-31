// =============================================
// LEADERBOARD PAGE LOGIC
// =============================================
import { getWeeklyLeaderboard, getMonthlyLeaderboard, getAllTimeLeaderboard, getGameResults } from './db.js';
import { getCurrentUser } from './auth.js';
import { getWeekLabel, getMonthLabel, formatShortDate, ordinal } from './utils.js';

const user = getCurrentUser();

if (user) {
  const navHandle = document.getElementById('nav-handle');
  if (navHandle) navHandle.textContent = user.handle;
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function rankBadge(rank) {
  const icons = ['&#127942;', '&#129352;', '&#129353;'];
  const cls = rank <= 3 ? ['rank-1','rank-2','rank-3'][rank-1] : 'rank-other';
  const label = rank <= 3 ? icons[rank - 1] : rank;
  return `<div class="player-rank ${cls}">${label}</div>`;
}

function renderLeaderboardList(containerId, emptyId, entries, currentUserId) {
  const container = document.getElementById(containerId);
  const empty = document.getElementById(emptyId);
  if (!container) return;

  if (!entries || entries.length === 0) {
    container.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');

  container.innerHTML = entries.map((entry, i) => {
    const rank = i + 1;
    const isMe = currentUserId && entry.userId === currentUserId;
    return `
      <div class="leaderboard-row${rank === 1 ? ' winner' : ''} fade-in" style="animation-delay:${i * 0.04}s">
        ${rankBadge(rank)}
        <div style="font-weight:${isMe ? '800' : '600'}; color:${isMe ? 'var(--accent-light)' : 'var(--text)'};">
          ${escHtml(entry.handle)}
          ${isMe ? '<span class="badge badge-approved" style="margin-left:0.4rem;">You</span>' : ''}
        </div>
        <div style="text-align:right;">
          <div style="font-weight:700; color:var(--cyan);">${entry.totalScore} pts</div>
          <div style="font-size:0.75rem; color:var(--text-dim);">${entry.gamesPlayed} game${entry.gamesPlayed !== 1 ? 's' : ''}</div>
        </div>
        <div class="leaderboard-wins" style="text-align:right;">
          <div style="font-weight:700; color:var(--gold);">&#127942; ${entry.wins}</div>
          <div style="font-size:0.75rem; color:var(--text-dim);">win${entry.wins !== 1 ? 's' : ''}</div>
        </div>
      </div>`;
  }).join('');
}

function renderWinnerBanner(bannerId, nameId, statId, entry, period) {
  if (!entry) {
    document.getElementById(bannerId)?.classList.add('hidden');
    return;
  }
  document.getElementById(bannerId)?.classList.remove('hidden');
  const nameEl = document.getElementById(nameId);
  const statEl = document.getElementById(statId);
  if (nameEl) nameEl.textContent = entry.handle;
  if (statEl) statEl.textContent = `${entry.totalScore} points · ${entry.wins} win${entry.wins !== 1 ? 's' : ''}`;
}

async function renderRecentGames() {
  const container = document.getElementById('recent-games-list');
  const empty = document.getElementById('recent-empty');
  if (!container) return;

  try {
    const results = await getGameResults({ limitN: 10 });
    if (!results || results.length === 0) {
      container.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }

    if (empty) empty.classList.add('hidden');

    container.innerHTML = results.map(game => {
      const players = (game.players || []).slice(0, 3);
      const winner = game.winner;
      const date = game.playedAt ? formatShortDate(game.playedAt) : '—';
      const cats = (game.categories || []).map(c => {
        const icons = { movies:'🎬', tv:'📺', scifi:'🚀', fantasy:'🧙', general:'🧠' };
        return icons[c] || c;
      }).join(' ');

      return `
        <div class="card card-sm mb-sm fade-in">
          <div class="flex items-center justify-between" style="margin-bottom:0.5rem;">
            <div>
              <span style="font-weight:700; color:var(--gold);">&#127942; ${escHtml(winner?.handle || '—')}</span>
              <span class="text-muted" style="font-size:0.8rem;"> won with ${winner?.score || 0} pts</span>
            </div>
            <span class="text-dim" style="font-size:0.8rem;">${date}</span>
          </div>
          <div class="flex gap-sm" style="font-size:0.8rem; color:var(--text-muted); flex-wrap:wrap;">
            <span>${cats}</span>
            <span>·</span>
            <span>${game.numQuestions || '?'} questions</span>
            <span>·</span>
            <span>${(game.players || []).length} player${(game.players || []).length !== 1 ? 's' : ''}</span>
          </div>
        </div>`;
    }).join('');
  } catch (e) {
    console.error(e);
    container.innerHTML = '<p class="text-dim" style="font-size:0.875rem;">Failed to load recent games.</p>';
  }
}

async function init() {
  const weekLabel = document.getElementById('week-label');
  const monthLabel = document.getElementById('month-label');
  if (weekLabel) weekLabel.textContent = getWeekLabel();
  if (monthLabel) monthLabel.textContent = getMonthLabel();

  try {
    const [weekly, monthly, allTime] = await Promise.all([
      getWeeklyLeaderboard(),
      getMonthlyLeaderboard(),
      getAllTimeLeaderboard(),
    ]);

    // Render weekly
    renderLeaderboardList('weekly-list', 'weekly-empty', weekly, user?.userId);
    const weekCount = document.getElementById('weekly-game-count');
    if (weekCount) weekCount.textContent = `${weekly.length} player${weekly.length !== 1 ? 's' : ''}`;

    // Weekly winner banner
    renderWinnerBanner('weekly-winner-banner', 'weekly-winner-name', 'weekly-winner-stat', weekly[0], 'week');

    // Render monthly
    renderLeaderboardList('monthly-list', 'monthly-empty', monthly, user?.userId);
    const monthCount = document.getElementById('monthly-game-count');
    if (monthCount) monthCount.textContent = `${monthly.length} player${monthly.length !== 1 ? 's' : ''}`;

    // Monthly winner banner (show on 1st of month)
    if (new Date().getDate() === 1) {
      renderWinnerBanner('monthly-winner-banner', 'monthly-winner-name', 'monthly-winner-stat', monthly[0], 'month');
    }

    // Render all time
    renderLeaderboardList('alltime-list', 'alltime-empty', allTime, user?.userId);
    const alltimeCount = document.getElementById('alltime-game-count');
    if (alltimeCount) alltimeCount.textContent = `${allTime.length} player${allTime.length !== 1 ? 's' : ''}`;

  } catch (e) {
    console.error(e);
  }

  renderRecentGames();
}

init();
