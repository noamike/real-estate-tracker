import UserPwSignIn from "./UserPwSignIn";
import EmailSignIn from "./EmailSignIn";
import React, { use, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

const SignInOptions = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [name, setName] = useState('');
    const [nameSaved, setNameSaved] = useState(false);

    //Function to set boolean to true once user is signed in
    const isSignedIn = () => {
        console.log("isSignedIn called");
        setSignedIn(true);
    };

    //Function to update user's display name in Firebase
    const saveName = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        if (auth.currentUser && name) {
            await updateProfile(auth.currentUser, { displayName: name });
            setNameSaved(true);
        }
    };

    return (
        <div>
            <h2>Sign In Options</h2>
            <div>
                <button
                    type="button"
                    className="App-button"
                    onClick={() => setSelectedOption('emailLink')}
                    style={{
                        marginRight: '10px',
                        backgroundColor: selectedOption === 'emailLink' ? '#007bff' : '#f0f0f0',
                        color: selectedOption === 'emailLink' ? '#fff' : '#000'
                    }}
                >
                    Email Link
                </button>
                <button
                    className="App-button"
                    type="button"
                    onClick={() => setSelectedOption('emailPassword')}
                    style={{
                        backgroundColor: selectedOption === 'emailPassword' ? '#007bff' : '#f0f0f0',
                        color: selectedOption === 'emailPassword' ? '#fff' : '#000'
                    }}
                >
                    Email and Password
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                {!signedIn && selectedOption === 'emailLink' && <EmailSignIn onSignInSuccess={isSignedIn} />}
                {!signedIn && selectedOption === 'emailPassword' && <UserPwSignIn onSignInSuccess={isSignedIn} />}
                {signedIn && !nameSaved && (
                    <form onSubmit={saveName} style={{ marginTop: '20px' }}>
                        <label> Enter Display Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" className="App-button" style={{ marginLeft: '10px' }}>Save Name</button>
                    </form>
                )}
                {nameSaved && <p style={{ color: 'green' }}>Display name saved successfully!</p>}
            </div>
        </div>
    );
}

export default SignInOptions;