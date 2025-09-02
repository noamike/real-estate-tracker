//app.js imports
import useAuth from "./hooks/useAuth.js";
import "./App.css";
import SignInOptions from "./components/SignInOptions.jsx";
import MainComponent from "./components/MainComponent.jsx";
import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";

const App = () => {
    //Create variables and states to use later
    const { userID, logout, userEmail } = useAuth();
    const auth = getAuth();
    const [name, setName] = useState('');
    const [nameSaved, setNameSaved] = useState(false);

    const needsName = userID && (!auth.currentUser?.displayName || !auth.currentUser.displayName.trim());

    const saveName = async (e) => {
        e.preventDefault();
        if (auth.currentUser && name) {
            await updateProfile(auth.currentUser, { displayName: name });
            setNameSaved(true);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Real Estate Deal Tracker</h1>
                {!userID && <SignInOptions />}
                {userID && needsName && !nameSaved && (
                    <form onSubmit={saveName} style={{ marginTop: '20px' }}>
                        <label>Enter Display Name:
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" className="App-button" style={{ marginLeft: '10px' }}>Save Name</button>
                    </form>
                )}
                {userID && (!needsName || nameSaved) && (
                    <div>
                        <h2>Welcome, {auth.currentUser?.displayName || userEmail} </h2>
                        <button className="form-button" onClick={logout}>
                            Sign Out
                        </button>
                    </div>
                )}
            </header>
            {!userID ? (
                <h1>Please sign in to manage your deals.</h1>
            ) : (!needsName || nameSaved) ? (
                <MainComponent />
            ) : null}
        </div>
    );
};

export default App;
