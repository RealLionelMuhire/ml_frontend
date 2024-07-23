import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
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

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

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

const LoginForm = ({ isNonMobile, palette }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const login = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const csrftoken = getCookie('csrftoken');
      const loggedInResponse = await fetch(`${baseUrl}login/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(values),
      });

      if (!loggedInResponse.ok) {
        const errorData = await loggedInResponse.json();
        toast.error(errorData.message);
        onSubmitProps.resetForm();
        setLoading(false);
        return;
      }

      const loggedIn = await loggedInResponse.json();
      if (loggedInResponse.ok) {
        toast.success(loggedIn.message);
        setLoading(false);
      }

      onSubmitProps.resetForm();
      if (loggedIn?.token) {
        localStorage.setItem("user_id", loggedIn.user_id);
        localStorage.setItem("userType", loggedIn.userType);
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
          window.location.href = "/landing-user";
          setLoading(false);
        }, 100);
      }
    } catch (error) {
      onSubmitProps.resetForm();
      toast.error("Error logging in. Please try again.");
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
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
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
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
                <Typography variant="h5" fontWeight="100">LOGIN</Typography>
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
