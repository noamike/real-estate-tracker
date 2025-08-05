import {useState,useEffect} from 'react';
import {signInWithCustomToken,signInAnonymously, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase/FirebaseConfig';


signInAnonymously(auth);
 //Store the UserID once Authenticated
const useAuth=()=>{
    const[userID,setUserID]=useState(null);
    onAuthStateChanged(auth,(user)=>{
        if(user){
            setUserID(auth.currentUser.uid);
        }
    });
    return{userID};
};
export default useAuth;



/* First attempt at onAuthStateChanged Function
//Look for Authentication Changes
onAuthStateChanged(auth,async(user)=>{
  if(user){
    //User is signed in
    userID=user.uid;
    console.log("Signed in anonymously with UID:",userID);
    /*
     *Potential to add other operations
     *could fetch user data if needed
     *Potential to use later
    
  }else{
    //user is signed out, attempt to sign in anonymousley
    console.log("No user found. Signing in anonymously");
    try{
      await signInAnonymously(auth);
    }catch(error){
      console.error("Error during anonymous sign-in:",error);
    }
  }
});
const useAuth=()=>{
    const userID=user.uid;
    return{userID};
}
export default useAuth;
 */