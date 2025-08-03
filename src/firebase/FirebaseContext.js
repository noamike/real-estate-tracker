// Import the functions you need from the SDKs you need
import React, {useState, useEffect, createContext, useContext} from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, isSignInWithEmailLink, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsEGOb_qI_aTMgeb9ui6n4103e3q3Jfzw",
  authDomain: "real-estate-tracker-fa139.firebaseapp.com",
  projectId: "real-estate-tracker-fa139",
  storageBucket: "real-estate-tracker-fa139.firebasestorage.app",
  messagingSenderId: "850477052728",
  appId: "1:850477052728:web:07c911c1da2292c2c187cd",
  measurementId: "G-S8RFBQ623Z"
};

//Setup for Firebase and for the users (creates react conext and sets to null)
const FirebaseContext = createContext(null);
export const useFirebase =() =>{
    const context = useContext(FirebaseContext);
    if(!context){
        throw new Error('useFirebase must be used within a Firebase Provider');
    }
    return context;
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);