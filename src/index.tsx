import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContext } from './hooks/useNavigation'; // Fix: Corrected import path for AppContext

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* AppContext.Provider, App.tsx'e taşındı. */}
    <App />
  </React.StrictMode>
);