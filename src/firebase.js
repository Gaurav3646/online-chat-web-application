// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCGzNDjQN14XGTCm4CT8Df3c1WUiupJHsM",
  authDomain: "my-chat-66dd4.firebaseapp.com",
  projectId: "my-chat-66dd4",
  storageBucket: "my-chat-66dd4.appspot.com",
  messagingSenderId: "941809685558",
  appId: "1:941809685558:web:8fafda8d7ecbf7e63c7497"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();