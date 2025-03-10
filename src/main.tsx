import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import AuthorPage from "./pages/AuthorPage.tsx";
import AuthorsPage from "./pages/AuthorsPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route index element={<App />}/>
              <Route path="/authors" element={<AuthorsPage/>}/>
              <Route path="/authors/:id" element={<AuthorPage />}/>
              <Route path="/books/:id" element={<h1 />}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
