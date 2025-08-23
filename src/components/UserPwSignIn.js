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
            <div className='form-section'>
                <div className='form-row'>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div className='form-row'>
                    <label>Password: (min 6 char)</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button className='App-button' type="submit">Sign In</button>
        </form>
    );
}
export default UserPwSignIn;