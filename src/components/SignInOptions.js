import UserPwSignIn from "./UserPwSignIn";
import EmailSignIn from "./EmailSignIn";
import React, { useState } from "react";

const SignInOptions = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <h2>Sign In Options</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value="emailLink"
                        checked={selectedOption === 'emailLink'}
                        onChange={() => handleOptionChange('emailLink')}
                    />
                    Sign in with Email Link
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        value="emailPassword"
                        checked={selectedOption === 'emailPassword'}
                        onChange={() => handleOptionChange('emailPassword')}
                    />
                    Sign in with Email and Password
                </label>
            </div>

            <div style={{ marginTop: '20px' }}>
                {selectedOption === 'emailLink' && <EmailSignIn />}
                {selectedOption === 'emailPassword' && <UserPwSignIn />}
            </div>
        </div>
    );
}
export default SignInOptions;