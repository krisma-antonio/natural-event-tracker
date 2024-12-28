import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
         <App />
    </BrowserRouter>
  </StrictMode>,
)
