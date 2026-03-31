// =============================================
// AUTH — login, register, session management
// =============================================
import { db } from './config.js';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc,
  query, where, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { hashPassword, generateId, getSession, setSession, clearSession } from './utils.js';

const USERS = 'users';

/** Register a new user. Returns { ok, error } */
export async function registerUser(handle, password) {
  // Validate handle
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(handle)) {
    return { ok: false, error: 'Handle must be 3–20 characters: letters, numbers, underscores only.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }

  // Check handle uniqueness (case-insensitive)
  const q = query(collection(db, USERS), where('handleLower', '==', handle.toLowerCase()));
  const snap = await getDocs(q);
  if (!snap.empty) {
    return { ok: false, error: 'That handle is already taken.' };
  }

  const userId = generateId();
  const passwordHash = await hashPassword(password);

  await setDoc(doc(db, USERS, userId), {
    userId,
    handle,
    handleLower: handle.toLowerCase(),
    passwordHash,
    status: 'pending',
    createdAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
    totalScore: 0,
    gamesPlayed: 0,
    wins: 0,
  });

  return { ok: true };
}

/** Login. Returns { ok, user, error } */
export async function loginUser(handle, password) {
  if (!handle || !password) {
    return { ok: false, error: 'Please enter your handle and password.' };
  }

  const q = query(collection(db, USERS), where('handleLower', '==', handle.toLowerCase()));
  const snap = await getDocs(q);

  if (snap.empty) {
    return { ok: false, error: 'Handle not found.' };
  }

  const userDoc = snap.docs[0];
  const user = userDoc.data();

  const inputHash = await hashPassword(password);
  if (inputHash !== user.passwordHash) {
    return { ok: false, error: 'Incorrect password.' };
  }

  if (user.status === 'pending') {
    return { ok: false, error: 'Your account is awaiting admin approval. Check back soon!' };
  }
  if (user.status === 'rejected') {
    return { ok: false, error: 'Your account access has been declined.' };
  }

  // Update lastSeen
  await updateDoc(doc(db, USERS, user.userId), { lastSeen: serverTimestamp() });

  const sessionUser = { userId: user.userId, handle: user.handle, status: user.status };
  setSession(sessionUser);
  return { ok: true, user: sessionUser };
}

/** Get current session user, or null */
export function getCurrentUser() {
  return getSession();
}

/** Logout */
export function logout() {
  clearSession();
  window.location.href = 'index.html';
}

/** Require login — redirect to index if not logged in */
export function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  return user;
}

/** Fetch a user by userId from Firestore */
export async function getUserById(userId) {
  const snap = await getDoc(doc(db, USERS, userId));
  return snap.exists() ? snap.data() : null;
}
