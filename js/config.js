// ============================================================
// FILL IN YOUR FIREBASE CONFIG VALUES HERE (see SETUP.md)
// ============================================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBGlnJVyUvHJXtbqfrAS0zbfTq6_oMrxK4",
  authDomain: "quiz-night-5f3b4.firebaseapp.com",
  projectId: "quiz-night-5f3b4",
  storageBucket: "quiz-night-5f3b4.firebasestorage.app",
  messagingSenderId: "548530919727",
  appId: "1:548530919727:web:492cf1050902e7b2b429da"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
