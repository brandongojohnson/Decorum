// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdSESO2ZyJEEp7uYqLBJ0fgSYhyKRRChc",
  authDomain: "decorum-b3f16.firebaseapp.com",
  databaseURL: "https://decorum-b3f16-default-rtdb.firebaseio.com",
  projectId: "decorum-b3f16",
  storageBucket: "decorum-b3f16.appspot.com",
  messagingSenderId: "665419809183",
  appId: "1:665419809183:web:5992ca2237d7ca3f57bdaa",
  measurementId: "G-RQDL3LCR1S"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db, app};