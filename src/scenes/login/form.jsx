import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { toast } from "react-toastify";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});

const initialValuesForgotPassword = {
  email: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isForgotPassword = pageType === "forgotPassword";
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(`${baseUrl}login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!loggedInResponse.ok) {
        const errorData = await loggedInResponse.json();
        toast.error(errorData.message);
        return;
      }

      const loggedIn = await loggedInResponse.json();
      if (loggedInResponse.ok) {
        toast.success(loggedIn.message);
      }

      onSubmitProps.resetForm();
      if (loggedIn?.token) {
        localStorage.setItem("token", loggedIn.token);
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
    }
  };

  const forgotPassword = async (values, onSubmitProps) => {
    try {
      const forgotPasswordResponse = await fetch(
        `${baseUrl}forgot-password/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!forgotPasswordResponse.ok) {
        const errorData = await forgotPasswordResponse.json();
        toast.error(errorData.message);
        return;
      }

      onSubmitProps.resetForm();
      // Handle the result as needed, e.g., show a success message.
      toast.success("Password reset instructions sent successfully.");
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
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
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}
          </Box>

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
              <>
              <Typography variant="h5" fontWeight="100">{isLogin ? "LOGIN" : "RESET PASSWORD"}</Typography>
              </>
            </Button>
            <Typography
              // color="secondary"
              fontWeight="500"
              variant="h5"
              onClick={() => {
                setPageType(isLogin ? "forgotPassword" : "login");
                resetForm();
              }}
              sx={{
                mb: "1.5rem",
                textDecoration: "underline",
                // color: palette.secondary.main,
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
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
