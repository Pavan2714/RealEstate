// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-87b56.firebaseapp.com",
  projectId: "realestate-87b56",
  storageBucket: "realestate-87b56.firebasestorage.app",
  messagingSenderId: "193681112095",
  appId: "1:193681112095:web:28849586fde2252deee92a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);