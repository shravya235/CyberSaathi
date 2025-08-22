export default function Page() {
  return (
    <div>
      <h1>About Page</h1>
      {/* Your content */}
    </div>
  );
}
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDROsPkWqf0yQ98MHM2xEYgxMTDVqAliSM",
  authDomain: "cybersaathi-a33f0.firebaseapp.com",
  projectId: "cybersaathi-a33f0",
  storageBucket: "cybersaathi-a33f0.firebasestorage.app",
  messagingSenderId: "538224292604",
  appId: "1:538224292604:web:527df83328eb5a793d5d79",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export to use in your app
export { auth, googleProvider };
