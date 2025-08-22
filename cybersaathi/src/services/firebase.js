import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDROsPkWqf0yQ98MHM2xEYgxMTDVqAliSM",
  authDomain: "cybersaathi-a33f0.firebaseapp.com",
  projectId: "cybersaathi-a33f0",
  storageBucket: "cybersaathi-a33f0.firebasestorage.app",
  messagingSenderId: "538224292604",
  appId: "1:538224292604:web:527df83328eb5a793d5d79",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
