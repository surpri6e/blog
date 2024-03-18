import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initializeApp } from 'firebase/app';
import { configFirebase } from './config.ts';

export const app = initializeApp(configFirebase);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
