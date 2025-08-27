import UserPwSignIn from "./UserPwSignIn";
import EmailSignIn from "./EmailSignIn";
import React, { useState } from "react";

const SignInOptions = () => {
    const [selectedOption, setSelectedOption] = useState(null);

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
                {selectedOption === 'emailLink' && <EmailSignIn />}
                {selectedOption === 'emailPassword' && <UserPwSignIn />}
            </div>
        </div>
    );
}

export default SignInOptions;