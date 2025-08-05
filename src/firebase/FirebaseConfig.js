// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth,signInAnonymously,onAuthStateChanged} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig={
  apiKey: "AIzaSyBsEGOb_qI_aTMgeb9ui6n4103e3q3Jfzw",
  authDomain: "real-estate-tracker-fa139.firebaseapp.com",
  projectId: "real-estate-tracker-fa139",
  storageBucket: "real-estate-tracker-fa139.firebasestorage.app",
  messagingSenderId: "850477052728",
  appId: "1:850477052728:web:07c911c1da2292c2c187cd",
  measurementId: "G-S8RFBQ623Z"
};
// Initialize Firebase
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);

export const db=getFirestore(app);
/*Ability to add Analytics to application over time
 *const analytics = getAnalytics(app);
*/

export{app};