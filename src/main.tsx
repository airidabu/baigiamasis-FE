import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import * as React from 'react';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ThemeProviderWithContext } from './contexts/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <React.Fragment>
            <AuthProvider>
                <ThemeProviderWithContext>
                    <App />
                </ThemeProviderWithContext>
            </AuthProvider>
        </React.Fragment>
    </StrictMode>
)
