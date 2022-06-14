import { authService } from 'fbase';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                data = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value={newAccount ? 'Create Account' : 'Sign In'}
                />
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? 'Sign In' : 'Create Account'}
            </span>
            <div>{error}</div>
            <button onClick={onSocialClick} name='google'>
                Google
            </button>
            <button onClick={onSocialClick} name='github'>
                GitHub
            </button>
        </div>
    );
};

export default Auth;
