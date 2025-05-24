// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy51VhHHabvzjck_MB4hUCyQchXchxXag",
  authDomain: "todomern-69cfc.firebaseapp.com",
  projectId: "todomern-69cfc",
  storageBucket: "todomern-69cfc.appspot.com",
  messagingSenderId: "1097503694513",
  appId: "1:1097503694513:web:3e5612b2208c36cd99cc90",
  measurementId: "G-K7C8HRS389"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication

// Export the app and auth for use in other files
export { analytics, app, auth };
