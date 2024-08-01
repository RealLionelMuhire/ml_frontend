import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TokenStorage from "../../utils/TokenStorage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Validation schema for login
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

// Initial form values for login
const initialValuesLogin = {
  email: "",
  password: "",
};

// Validation schema for forgot password
const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});

// Initial form values for forgot password
const initialValuesForgotPassword = {
  email: "",
};

// Function to get CSRF token from cookies
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// Form component
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isForgotPassword = pageType === "forgotPassword";
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  // Function to handle login
  const login = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const csrftoken = getCookie('csrftoken');
      const response = await fetch(`${baseUrl}login/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle specific error messages based on response status
        switch (response.status) {
          case 401:
            setErrorMessage("Invalid credentials. Please check your email and password.");
            break;
          case 500:
            setErrorMessage("Server error. Please try again later.");
            break;
          default:
            setErrorMessage(data.message || "Error logging in. Please try again.");
        }
        onSubmitProps.resetForm();
        setLoading(false);
        return;
      }
  
      // Store tokens
      try {
        TokenStorage.saveAccessToken(data.access);
        TokenStorage.saveRefreshToken(data.refresh);
      } catch (storageError) {
        setErrorMessage("Error saving tokens. Please try again.");
        onSubmitProps.resetForm();
        setLoading(false);
        return;
      }
  
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("userType", data.user_roles);
  
      // Dispatch login action
      try {
        dispatch(setLogin({
          user: data.user,
          token: data.access,
        }));
      } catch (dispatchError) {
        setErrorMessage("Error completing login. Please try again.");
        onSubmitProps.resetForm();
        setLoading(false);
        return;
      }
  
      toast.success(data.message || "Logged in successfully");
      setLoading(false);
      onSubmitProps.resetForm();
  
      // Redirect after successful login
      navigate("/landing-user");
    } catch (error) {
      setErrorMessage("Error logging in. Please check your internet connection.");
      onSubmitProps.resetForm();
      setLoading(false);
    }
  };

  // Function to handle forgot password
  const forgotPassword = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Error sending reset link. Please try again.");
      } else {
        toast.success("Password reset link sent to your email.");
      }

      onSubmitProps.resetForm();
      navigate("/");
    } catch (error) {
      setErrorMessage("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (values, onSubmitProps) => {
    setErrorMessage(""); // Clear any previous error messages
    if (isLogin) await login(values, onSubmitProps);
    if (isForgotPassword) await forgotPassword(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesForgotPassword}
      validationSchema={isLogin ? loginSchema : forgotPasswordSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isForgotPassword && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            {isLogin && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}
          </Box>

          {/* Error Message Box */}
          {errorMessage && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: palette.error.main,
                color: palette.error.contrastText,
                borderRadius: 1,
              }}
            >
              <Typography variant="h5">{errorMessage}</Typography>
            </Box>
          )}

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              color="secondary"
              variant="contained"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.secondary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <Typography variant="h5" fontWeight="100">
                    {isLogin ? "LOGIN" : "RESET PASSWORD"}
                  </Typography>
                </>
              )}
            </Button>
            <Box
              display="flex"
              gap="50px"
              sx={{
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                mr="5px"
                fontWeight="500"
                variant="h5"
                onClick={() => {
                  window.location.href = `${baseUrl}reset_password/`;
                }}
                sx={{
                  mb: "1.5rem",
                  textDecoration: "underline",
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.secondary.light,
                  },
                }}
              >
                {isLogin
                  ? "Forgot your password? Reset it here."
                  : "Remember your password? Login here."}
              </Typography>
              <Typography
                mr="5px"
                fontWeight="500"
                variant="h5"
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  mb: "1.5rem",
                  textDecoration: "underline",
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.secondary.light,
                  },
                }}
              >
                Back to Home
              </Typography>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
