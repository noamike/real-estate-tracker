import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const EmailSignIn = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { userEmail, sendEmailLink, userID } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await sendEmailLink(email);
        if (success) {
            setMessage('Sign-in link sent! Check your email.');
        } else {
            setMessage('Failed to send sign-in link. Please try again.');
        }
    };

    if (userID && userEmail) {
        return <div>Signed in! Email: {userEmail}</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Send Sign-In Link</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default EmailSignIn;