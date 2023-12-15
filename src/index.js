// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ReactStrictMode } from 'react-dom/client';  // Note the import change here
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactStrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReactStrictMode>
);
