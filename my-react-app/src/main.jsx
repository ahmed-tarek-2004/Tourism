import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // <--- هذا السطر كان مفقوداً 
import './style.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);