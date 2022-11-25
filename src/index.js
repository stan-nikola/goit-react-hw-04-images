import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'App/App';
import { ThemeProvider } from '@emotion/react';
import { Theme } from './constants/theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
