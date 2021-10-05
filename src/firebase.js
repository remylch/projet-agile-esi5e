import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// TODO : PUT config into a .env file
const firebaseConfig = {
  apiKey: "AIzaSyCFWk9aIXqCP9EYxecPxtOZ0V2sYIonEYI",
  authDomain: "projet-esi5e.firebaseapp.com",
  projectId: "projet-esi5e",
  storageBucket: "projet-esi5e.appspot.com",
  messagingSenderId: "978945975949",
  appId: "1:978945975949:web:40fc7a24f5c41d519764c4",
  measurementId: "G-LPFHVW9QCR",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
