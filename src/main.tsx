import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./colors/customTheme.ts";
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <React.Fragment>
            <AuthProvider>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline enableColorScheme />
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </React.Fragment>
    </StrictMode>
)
