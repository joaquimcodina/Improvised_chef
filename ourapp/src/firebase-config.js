import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClJpc3O6IY4A7gP4TNzdJuhRkInSHlT7s",
  authDomain: "prova-7de70.firebaseapp.com",
  projectId: "prova-7de70",
  storageBucket: "prova-7de70.appspot.com",
  messagingSenderId: "727332993787",
  appId: "1:727332993787:web:154578af31b5701848ce5e",
  measurementId: "G-PYN5HK2T55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
}