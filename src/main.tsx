import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { SEOProvider } from './contexts/SEOContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <SEOProvider>
        <App />
      </SEOProvider>
    </HelmetProvider>
  </React.StrictMode>
);
