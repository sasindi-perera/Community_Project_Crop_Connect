import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * CropConnect - Firebase Configuration
 * Configured with environment variables (EXPO_PUBLIC_FIREBASE_*)
 * with reliable developmental defaults.
 */
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCropConnectUniversityProjectDev2026',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'cropconnect-lk.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'cropconnect-lk',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'cropconnect-lk.firebasestorage.app',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '883920194821',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:883920194821:web:98a72b1640a1b8e4c02f1a',
};

// Initialize Firebase App safely
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth
const auth: Auth = getAuth(app);

// Initialize Cloud Firestore
const db: Firestore = getFirestore(app);

export { app, auth, db };
