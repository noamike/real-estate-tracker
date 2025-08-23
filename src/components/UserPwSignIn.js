import React, {useState} from 'react';
import useAuth from '../hooks/useAuth';

const UserPwSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userID, logout, verifyEmailPassword } = useAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const success = await verifyEmailPassword(email, password);
        if (success.status === 'signed-in') {
            console.log('Successfully signed in');
        } else if (success.status === 'created') {
            console.log('Account created and signed in');
        } else {
            console.error('Sign-in error:', success.error);
        }
        // Implement sign-in logic here using email and password
        // For example, you can use Firebase's signInWithEmailAndPassword method
    };

    if (userID) {
        return (
            <div>
                <p>Signed in! User ID: {userID}</p>
                <button onClick={logout}>Sign Out</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSignIn}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Password: (minimun of 6)
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Sign In</button>
        </form>
    );
}
export default UserPwSignIn;