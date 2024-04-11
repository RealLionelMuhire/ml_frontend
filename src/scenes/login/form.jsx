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
  IconButton
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TokenStorage from "../../utils/TokenStorage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const login = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const loggedInResponse = await fetch(`${baseUrl}login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!loggedInResponse.ok) {
        const errorData = await loggedInResponse.json();
        toast.error(errorData.message);
        onSubmitProps.resetForm();
        setLoading(false);
      }

      const loggedIn = await loggedInResponse.json();
      if (loggedInResponse.ok) {
        toast.success(loggedIn.message);
        setLoading(false);
      }

      onSubmitProps.resetForm();
      if (loggedIn?.token) {
        localStorage.setItem("user_id", loggedIn.user_id)
        localStorage.setItem("userType", loggedIn.userType)
        TokenStorage.saveToken(loggedIn.token);
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
          );
          setLoading(true);
          setTimeout(() => {
            navigate("/landing-user");
            window.location.href = "/landing-user"
            setLoading(false);
          }, 100);
        }
    } catch (error) {
      onSubmitProps.resetForm();
      toast.error("Error logging in. Please try again.");
      setLoading(false);
    }
  };

  const forgotPassword = async (values, onSubmitProps) => {
    try {
      setLoading(true);
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
        navigate("/");
      }

      if (forgotPasswordResponse.ok) {
        const forgotPassword = await forgotPasswordResponse.json();
        toast.message(forgotPassword.message);
        navigate("/");
      }

      onSubmitProps.resetForm();
      navigate("/");
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
      navigate("/");
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
                          onClick={() => setShowPassword(prev => !prev)}
                          size="small"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              p="2rem"
              m="2rem auto"
              borderRadius="1.5rem"
              alignItems="flex-end"
            >
              <Typography
                // color="secondary"
                ml="5px"
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
              <Typography
                // color="secondary"
                mr="5px"
                fontWeight="500"
                variant="h5"
                onClick={() => {
                  navigate("/");
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
