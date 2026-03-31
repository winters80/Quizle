// =============================================
// SHARED UTILITIES
// =============================================

/** SHA-256 hash a string, returns hex string */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Generate a random alphanumeric code of given length */
export function generateCode(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/** Generate a UUID v4 */
export function generateId() {
  return crypto.randomUUID ? crypto.randomUUID() :
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/** Format a Firestore Timestamp or Date for display */
export function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Format a date as "Mon DD" */
export function formatShortDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

/** Format time elapsed as "Xm Xs ago" */
export function timeAgo(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const secs = Math.floor((Date.now() - d.getTime()) / 1000);
  if (secs < 60) return 'just now';
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

/** Get the start of the current week (Monday midnight) */
export function getWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const diff = (day === 0 ? -6 : 1 - day);
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** Get the start of the current month */
export function getMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
}

/** Get readable month label e.g. "March 2026" */
export function getMonthLabel(date = new Date()) {
  return date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
}

/** Get readable week label e.g. "24 Mar – 30 Mar" */
export function getWeekLabel() {
  const start = getWeekStart();
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = d => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
  return `${fmt(start)} – ${fmt(end)}`;
}

/** True if today is Friday (day 5) */
export function isFriday() {
  return new Date().getDay() === 5;
}

/** Ordinal suffix: 1st, 2nd, 3rd */
export function ordinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** Shuffle an array (Fisher-Yates) */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Show a simple alert inside a container element */
export function showAlert(containerId, message, type = 'error') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

export function clearAlert(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
}

/** Get/set session storage for current user */
export function getSession() {
  try {
    const s = sessionStorage.getItem('quiz_session');
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

export function setSession(user) {
  sessionStorage.setItem('quiz_session', JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem('quiz_session');
}

/** Category display info */
export const CATEGORY_INFO = {
  movies:  { label: 'Movies',          icon: '🎬', badge: 'badge-movies'  },
  tv:      { label: 'TV Shows',        icon: '📺', badge: 'badge-tv'      },
  scifi:   { label: 'Sci-Fi',          icon: '🚀', badge: 'badge-scifi'   },
  fantasy: { label: 'Fantasy',         icon: '🧙', badge: 'badge-fantasy' },
  general: { label: 'General Knowledge', icon: '🧠', badge: 'badge-general' },
};

export function categoryBadge(cat) {
  const info = CATEGORY_INFO[cat] || { label: cat, badge: '' };
  return `<span class="badge ${info.badge}">${info.icon} ${info.label}</span>`;
}

export function difficultyBadge(diff) {
  return `<span class="badge badge-${diff}">${diff}</span>`;
}

/** Calculate score for a correct answer */
export function calcScore(timerMode, timeRemaining, totalTime) {
  const base = 100;
  if (timerMode === 'vote' || !timeRemaining || !totalTime) return base;
  const bonus = Math.round((timeRemaining / totalTime) * 50);
  return base + bonus;
}

/** Timer mode display */
export function timerLabel(mode) {
  if (mode === '30s') return '30s';
  if (mode === '60s') return '60s';
  return 'Vote';
}
