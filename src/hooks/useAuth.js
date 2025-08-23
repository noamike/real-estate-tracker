import { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';

const actionCodeSettings = {
    url: window.location.origin,
    handleCodeInApp: true,
};

/*
 * A custom React hook for managing the Firebase authentication state.
 * It provides the current user's ID and listens for authentication state changes.
 * @returns {{userID: string|null}} An object containing the current user's ID.
*/
const useAuth = () => {
    // userID is initialized to null and will be updated when the user is authenticated.
    const [userID, setUserID] = useState(null);
    const [identifier, setIdentifier] = useState(null);
    const [emailForSignIn, setEmailForSignIn] = useState('');
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                setIdentifier('email');
                setUserEmail(user.email); // Add this line
            } else {
                setUserID(null);
                setIdentifier(null);
                setUserEmail(null); // Add this line
            }
        });

        // Handle email link sign-in if applicable
        if (isSignInWithEmailLink(auth, window.location.href)) {
            const email = window.localStorage.getItem('emailForSignIn');
            if (email) {
                signInWithEmailLink(auth, email, window.location.href)
                    .then((result) => {
                        setUserID(result.user.uid);
                        setIdentifier('email');
                        window.localStorage.removeItem('emailForSignIn');
                    })
                    .catch((error) => {
                        console.error('Error signing in with email link:', error);
                    });
            }
        }

        // Sign out when tab/window is closed or refreshed
        const handleUnload = () => {
            signOut(auth);
        };
        window.addEventListener('unload', handleUnload);

        return () => {
            unsubscribe();
            window.removeEventListener('unload', handleUnload);
        };
    }, []);

    // Function to send sign-in link to email
    const sendEmailLink = async (email) => {
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            setEmailForSignIn(email);
            return true;
        } catch (error) {
            console.error('Error sending email link:', error);
            return false;
        }
    };

    // Return the user ID state and the function to send email link to any component that uses this hook.
    // The component can then use these values to conditionally render content or trigger email sign-in.
    return { userID, userEmail, identifier, sendEmailLink, emailForSignIn };
};

export default useAuth;




