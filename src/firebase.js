import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOKSRWm2VMLaHanyeAurwRjZd8qcKvA_A",
  authDomain: "react-chat-9fbd8.firebaseapp.com",
  projectId: "react-chat-9fbd8",
  storageBucket: "react-chat-9fbd8.appspot.com",
  messagingSenderId: "653046693950",
  appId: "1:653046693950:web:24b52c5f0d9e075d77116f",
  measurementId: "G-6W5G2RZM74"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
