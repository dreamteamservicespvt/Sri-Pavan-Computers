import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkrYvenTa44MZQSxizXkOJto8Nr2LSPUs",
  authDomain: "sri-pavan-computers.firebaseapp.com",
  projectId: "sri-pavan-computers",
  storageBucket: "sri-pavan-computers.firebasestorage.app",
  messagingSenderId: "96955041621",
  appId: "1:96955041621:web:c443a9260dd68ecc2e11dc",
  measurementId: "G-1NZ1BCX5BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
const initializeAnalytics = async () => {
  try {
    if (await isSupported()) {
      return getAnalytics(app);
    }
    return null;
  } catch (error) {
    console.warn('Analytics not supported in this environment:', error);
    return null;
  }
};

export const analyticsPromise = initializeAnalytics();

export default app;
