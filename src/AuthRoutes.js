// AuthRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLoginPage from './authentication/AdminLoginPage';
import ForgetPassword from './authentication/ForgetPassword';

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  );
}

export default AuthRoutes;

