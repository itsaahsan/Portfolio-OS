import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WindowProvider } from './context/WindowContext';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <WindowProvider>
        <App />
      </WindowProvider>
    </ThemeProvider>
  </React.StrictMode>
);
