import {useState,useEffect} from 'react';
import {signInWithCustomToken,signInAnonymously, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase/FirebaseConfig';

/*
 * Initiates an anonymous sign-in process for the user.
 * This is typically called once when the application loads.
 */
signInAnonymously(auth);

/*
 * A custom React hook for managing the Firebase anonymous authentication state.
 * It provides the current user's ID and listens for authentication state changes.
 * @returns {{userID: string|null}} An object containing the current user's ID.
*/
const useAuth =() => {
    // Use the useState hook to create a state variable for the user ID.
    // It is initialized to null and will be updated when the user is authenticated.
    const [userID, setUserID] = useState(null);

    // Set up a listener for authentication state changes.
    // The onAuthStateChanged function runs whenever the user signs in or out.
    // This hook is called only once per component mount.
    onAuthStateChanged(auth, (user) => {
        // Check if a user object exists. If it does, the user is signed in.
        if (user) {
            // Update the state with the authenticated user's unique ID (UID).
            // This will cause components using this hook to re-render with the new ID.
            setUserID(user.uid);
        } else {
            // If the user object is null, the user is signed out.
            // Reset the user ID state to null.
            setUserID(null);
        }
    });

    // Return the user ID state to any component that uses this hook.
    // The component can then use this value to conditionally render content.
    return { userID };
};

export default useAuth;




/*
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
*/

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