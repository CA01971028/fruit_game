import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Flask from './compornent/Flask'
import Flask_account from './compornent/Flask_account';
import { BrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

