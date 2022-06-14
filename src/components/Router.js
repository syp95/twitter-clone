import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile/:id' element={<Profile />} />
                    </>
                ) : (
                    <Route path='/' element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
