import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes } from 'react-router-dom';
import App from './components/App';
import firebase from './fbase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
