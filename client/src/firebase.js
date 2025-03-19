// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-estate-app-ba3b5.firebaseapp.com",
  projectId: "mern-estate-app-ba3b5",
  storageBucket: "mern-estate-app-ba3b5.firebasestorage.app",
  messagingSenderId: "878286729569",
  appId: "1:878286729569:web:be611e64f58b4a959c1520"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);