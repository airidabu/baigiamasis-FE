import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from "@mui/material";
import {customTheme} from "./colors/customTheme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <React.Fragment>
          <ThemeProvider theme={customTheme}>
              <CssBaseline enableColorScheme/>
              <App/>
          </ThemeProvider>
      </React.Fragment>
  </StrictMode>
)
