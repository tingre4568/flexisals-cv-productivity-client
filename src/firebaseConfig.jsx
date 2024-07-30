// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA9026j1W17mPccHiSa-W4MclmCeiBqio",
  authDomain: "cv-productivity-tracker.firebaseapp.com",
  projectId: "cv-productivity-tracker",
  storageBucket: "cv-productivity-tracker.appspot.com",
  messagingSenderId: "1071051539731",
  appId: "1:1071051539731:web:870685aa5ea7fd103bc6e6",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
