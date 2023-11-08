import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from 'styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <GlobalStyles />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
