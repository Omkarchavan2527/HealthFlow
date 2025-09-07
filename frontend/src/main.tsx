// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './components/UserContext'; // adjust path if needed
import './index.css'; // if you have global styles
import MedicineReminder from "./MedicineReminder";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(() => {
    console.log("Service Worker registered");
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>

        <App />
        <MedicineReminder />

      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
