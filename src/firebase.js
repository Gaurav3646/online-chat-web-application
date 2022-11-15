// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBAaREG_RRjcpZg3Fm4Mkh-FH8ozdH2xig",
  authDomain: "chat-25259.firebaseapp.com",
  projectId: "chat-25259",
  storageBucket: "chat-25259.appspot.com",
  messagingSenderId: "573368599151",
  appId: "1:573368599151:web:58ff3c3c6e84b2ce45839a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();