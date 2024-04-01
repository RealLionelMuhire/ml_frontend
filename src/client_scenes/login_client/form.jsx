import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import TokenStorage from "../../utils/TokenStorage";


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
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const registerSchema = yup.object().shape({
  FirstName: yup.string().required("required"),
  LastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  NationalID: yup.string().required("required"),
  BirthDate: yup.date().required("required"),
  UserRoles: yup.string().required("required"),
  Address: yup.string().required("required"),
  cv_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
  contract_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
  accessLevel: yup.string().required("required"),
});

const registerValues = {
  FirstName: "",
  LastName: "",
  email: "",
  contact: "",
  password: "",
  NationalID: "",
  BirthDate: "",
  UserRoles: "",
  Address: "",
  accessLevel: "",
  cv_file: null,
  contract_file: null,
  national_id_file: null,
};

const ClientLandingForm = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isForgotPassword = pageType === "forgotPassword";
  const isRegister = pageType === "register";
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const login = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const loggedInResponse = await fetch(`${baseUrl}client/login/`, {
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
            navigate("/dashboard");
            setLoading(false);
          }, 2000);
        }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
      setLoading(false);
    }
  };

  const register = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const registerResponse = await fetch(`${baseUrl}client/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        toast.error(errorData.message);
        onSubmitProps.resetForm();
        setLoading(false);
      }

      const registered = await registerResponse.json();
      if (registerResponse.ok) {
        toast.success(registered.message);
        setLoading(false);
      }

      onSubmitProps.resetForm();
      setLoading(false);
    } catch (error) {
      toast.error("Error registering. Please try again.");
      setLoading(false);
    }
  };

  const forgotPassword = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const forgotPasswordResponse = await fetch(
        `${baseUrl}client/forgot-password/`,
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
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isRegister ? registerValues : isLogin ? initialValuesLogin : initialValuesForgotPassword}
      validationSchema={isRegister ? registerSchema : isLogin ? loginSchema : forgotPasswordSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        setFieldValue,
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

            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.FirstName}
                  name="FirstName"
                  error={Boolean(touched.FirstName) && Boolean(errors.FirstName)}
                  helperText={touched.FirstName && errors.FirstName}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.LastName}
                  name="LastName"
                  error={Boolean(touched.LastName) && Boolean(errors.LastName)}
                  helperText={touched.LastName && errors.LastName}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  label="Contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={Boolean(touched.contact) && Boolean(errors.contact)}
                  helperText={touched.contact && errors.contact}
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
                />
                <TextField
                  label="National ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.NationalID}
                  name="NationalID"
                  error={Boolean(touched.NationalID) && Boolean(errors.NationalID)}
                  helperText={touched.NationalID && errors.NationalID}
                />
                <TextField
                  label="Birth Date"
                  type="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.BirthDate}
                  name="BirthDate"
                  error={Boolean(touched.BirthDate) && Boolean(errors.BirthDate)}
                  helperText={touched.BirthDate && errors.BirthDate}
                />
                <TextField
                  label="User Roles"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.UserRoles}
                  name="UserRoles"
                  error={Boolean(touched.UserRoles) && Boolean(errors.UserRoles)}
                  helperText={touched.UserRoles && errors.UserRoles}
                />
                <TextField
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address}
                  name="Address"
                  error={Boolean(touched.Address) && Boolean(errors.Address)}
                  helperText={touched.Address && errors.Address}
                />
                <TextField
                  label="Access Level"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accessLevel}
                  name="accessLevel"
                  error={Boolean(touched.accessLevel) && Boolean(errors.accessLevel)}
                  helperText={touched.accessLevel && errors.accessLevel}
                />
                <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                  {values.cv_file ? values.cv_file.name : <label htmlFor="cv_file">Upload CV</label>}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="cv_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("cv_file", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.cv_file && errors.cv_file && (
                  <div>{errors.cv_file}</div>
                )}
              </Box>
              <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                  {values.contract_file ? values.contract_file.name : <label htmlFor="contract_file">Upload Contract</label>}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="contract_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("contract_file", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.contract_file && errors.contract_file && (
                  <div>{errors.contract_file}</div>
                )}
                </Box>
                <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}> 
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                  {values.national_id_file ? values.national_id_file.name : <label htmlFor="national_id_file">Upload National ID</label>}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="national_id_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("national_id_file", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.national_id_file && errors.national_id_file && (
                  <div>{errors.national_id_file}</div>
                )}
                </Box>
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

export default ClientLandingForm;
