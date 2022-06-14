import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                const uid = user.uid;
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'init'}
            <footer>Twitter</footer>
        </>
    );
}

export default App;
