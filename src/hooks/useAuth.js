import {useState,useEffect} from 'react';
import {signInWithCustomToken,signInAnonymously} from 'firebase/auth';
import {auth} from '../firebase/FirebaseConfig';

const useAuth=()=>{
    const[userID,setUserID]=useState(null);
    signInAnonymously(auth);
    setUserID(auth.currentUser.uid);
    return{userID};
}
export default useAuth