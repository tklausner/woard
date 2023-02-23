// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Q6zegYnJP_PtRl2gyWM9PV9-rPPYGqw",
  authDomain: "surface-5e49f.firebaseapp.com",
  databaseURL: "https://surface-5e49f-default-rtdb.firebaseio.com",
  projectId: "surface-5e49f",
  storageBucket: "surface-5e49f.appspot.com",
  messagingSenderId: "657700436196",
  appId: "1:657700436196:web:5f4f35076a36a7a6b614f1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
