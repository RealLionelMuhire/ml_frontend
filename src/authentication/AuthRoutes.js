// authentication/AuthRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "./AdminLoginPage";
import ForgetPassword from "./ForgetPassword";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
