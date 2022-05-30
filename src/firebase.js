import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAhFiz_FY389IyywhI18Eo25T-RsvB9KbE",
  authDomain: "todo-app-5031f.firebaseapp.com",
  projectId: "todo-app-5031f",
  storageBucket: "todo-app-5031f.appspot.com",
  messagingSenderId: "596093879387",
  appId: "1:596093879387:web:5f1dc04779e990b9f56b7e",
  measurementId: "G-B08D4X5SGL"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
