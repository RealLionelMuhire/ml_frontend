import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import LoginForm from "./helper/LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import RegisterForm from "./RegisterForm";
import TermsAndConditions from "./TermsAndConditions";

const ClientLandingForm = () => {
  const [pageType, setPageType] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values, onSubmitProps) => {
    // Handle form submission based on page type
    switch (pageType) {
      case "login":
        // Submit login form
        break;
      case "forgotPassword":
        // Submit forgot password form
        break;
      case "register":
        // Submit register form
        break;
      default:
        break;
    }
  };

  // Define initial values and validation schema for each form
  const loginInitialValues = {
    email: "",
    password: "",
  };

  const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const forgotPasswordInitialValues = {
    email: "",
  };

  const forgotPasswordValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const registerInitialValues = {
    // Define initial values for register form fields
  };

  const registerValidationSchema = yup.object().shape({
    // Define validation schema for register form fields
  });

  return (
    <Box>
      {/* Render form based on page type */}
      {pageType === "login" && (
        <LoginForm
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleFormSubmit}
        />
      )}

      {pageType === "forgotPassword" && (
        <ForgotPasswordForm
          initialValues={forgotPasswordInitialValues}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleFormSubmit}
        />
      )}

      {pageType === "register" && (
        <RegisterForm
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleFormSubmit}
        />
      )}

      {pageType === "termsConditions" && <TermsAndConditions />}

      {/* Loading spinner */}
      {loading && <CircularProgress />}

      {/* Buttons to switch between forms */}
      <Box>
        <Button onClick={() => setPageType("login")}>Login</Button>
        <Button onClick={() => setPageType("forgotPassword")}>
          Forgot Password
        </Button>
        <Button onClick={() => setPageType("register")}>Register</Button>
        <Button onClick={() => setPageType("termsConditions")}>
          Terms and Conditions
        </Button>
      </Box>
    </Box>
  );
};

export default ClientLandingForm;
