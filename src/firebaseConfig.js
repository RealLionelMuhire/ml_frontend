// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQNkZ1xyq10VwT1jR0aRZPH_Dywd0c9xs",
  authDomain: "mlcs-de102.firebaseapp.com",
  projectId: "mlcs-de102",
  storageBucket: "mlcs-de102.appspot.com",
  messagingSenderId: "45220810637",
  appId: "1:45220810637:web:a28ef7da81531bb0b437c4",
  measurementId: "G-DQ3FS9259D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
