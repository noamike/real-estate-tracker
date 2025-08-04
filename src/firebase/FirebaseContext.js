// Import the functions you need from the SDKs you need
import React, {useState, useEffect, createContext, useContext} from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, isSignInWithEmailLink, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
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
};

export const FirebaseProvider = ({children})=>{
  const [app,setApp] = useState(null);
  const [db,setDb] = useState(null);
  const [auth,setAuth] = useState(null);
  const [userId,setUserId] = useState(null);
  const [isAuthReady,setIsAuthReady] = useState(false);

  useEffect(()=>{
    try{
      const initializedApp = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(initializedApp);
      const firebaseAuth = getAuth(initializedApp);

      setApp(initializedApp);
      setDb(firestoreDb);
      setAuth(firebaseAuth);

      //sign in or use existing token
      const signIn=async()=>{
        try{
          //will turn this into a user sign in
          await signInAnonymously(firebaseAuth);
        } catch (error){
          console.error("Firebase authentication error:", error);
        }
      };
      signIn();
      //look for authentication state changes
      const unsubscribe = onAuthStateChanged(firebaseAuth,(user)=>{
        if(user){
          setUserId(user.uid);
          console.log("Firebase Auth State changed, User ID is:",user.uid);
        }else{
          setUserId(crypto.randomUUID())//fallback for anonymous
          console.log("Firebase Auth: No user, using fallback UID. User object:", user);
        }
        setIsAuthReady(true);
      });
      return()=> unsubscribe();
    }catch(error){
      console.error("Error initializing Firebase:",error);
    }
},[]);
  return(
    <FirebaseContext.Provider value={{app,db,auth,userId,isAuthReady}}>
      {children}
    </FirebaseContext.Provider>
  );
};

/*// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/