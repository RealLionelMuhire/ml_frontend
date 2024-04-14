import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import TokenStorage from "../../utils/TokenStorage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TermsAndConditions from "./TermsAndConditions";
import { FormControlLabel, Checkbox } from "@mui/material";

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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  clientEmail: yup.string().email("invalid email").required("required"),
  clientContact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup
    .string()
    .required("required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one special char and one number"
    ),
  confirmPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  birthDate: yup.date().required("required"),
  countryOfResidence: yup.string().required("required"),
  preferredLanguage: yup.string().required("required"),
  NameOfEntity: yup.string().required("required"),
  TIN: yup.string().required("required"),
  citizenship: yup.string().required("required"),
  NationalID: yup.string().when("citizenship", {
    is: "Rwandan",
    then: yup.string().required("required"),
  }),
  national_id_file: yup.mixed().when("citizenship", {
    is: "Rwandan",
    then: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true;
          }
          if (value[0].type !== "application/pdf") {
            return false;
          }
          return true;
        }
      ),
  }),
  specifiedCitizenship: yup.string().when("citizenship", {
    is: "Other",
    then: yup.string().required("required"),
  }),
  passportIdNumber: yup.string().when("citizenship", {
    is: "Other",
    then: yup.string().required("required"),
  }),
  countryOfIssue: yup.string().when("citizenship", {
    is: "Other",
    then: yup.string().required("required"),
  }),
  passportExpiryDate: yup.date().when("citizenship", {
    is: "Other",
    then: yup.date().required("required"),
  }),
  passportIdNumber_file: yup.mixed().when("citizenship", {
    is: "Other",
    then: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true;
          }
          if (value[0].type !== "application/pdf") {
            return false;
          }
          return true;
        }
      ),
  }),
  registration_certificate: yup
    .mixed()
    .test(
      "fileType",
      "Invalid file format. Please upload a PDF file.",
      (value) => {
        if (!value || value.length === 0 || !value[0]) {
          return true; // No file provided or empty array, validation passes
        }
        if (value[0].type !== "application/pdf") {
          return false; // File type is not PDF, validation fails
        }
        return true; // Validation passes
      }
    ),
});

const registerValues = {
  firstName: "",
  lastName: "",
  clientEmail: "",
  clientContact: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  NationalID: "",
  passportIdNumber: "",
  countryOfIssue: "",
  passportExpiryDate: "",
  citizenship: "",
  specifiedCitizenship: "",
  countryOfResidence: "",
  preferredLanguage: "",
  NameOfEntity: "",
  TIN: "",
  national_id_file: null,
  registration_certificate: null,
  passportIdNumber_file: null,
};

const ClientLandingForm = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isForgotPassword = pageType === "forgotPassword";
  const isRegister = pageType === "register";
  const isTermsConditions = pageType === "termsConditions";
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRepeatRegisterPassword, setShowRepeatRegisterPassword] =
    useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleTermsChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

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
          navigate("/landing");
          window.location.href = "/landing";
          setLoading(false);
        }, 100);
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
      initialValues={
        isRegister
          ? registerValues
          : isLogin
          ? initialValuesLogin
          : initialValuesForgotPassword
      }
      validationSchema={
        isRegister
          ? registerSchema
          : isLogin
          ? loginSchema
          : forgotPasswordSchema
      }
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
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
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
                  sx={{ gridColumn: "span 2" }}
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
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Password"
                  type={showLoginPassword ? "text" : "password"}
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
                          onClick={() => setShowLoginPassword((prev) => !prev)}
                          size="small"
                        >
                          {showLoginPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}

            {isTermsConditions && (
              <>
                <Box fullWidth sx={{ gridColumn: "span 4" }}>
                  <TermsAndConditions />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={acceptedTerms}
                      onChange={handleTermsChange}
                    />
                  }
                  label="Agree to Terms and Conditions"
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            {isRegister && (
              <>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.clientEmail}
                  name="clientEmail"
                  error={
                    Boolean(touched.clientEmail) && Boolean(errors.clientEmail)
                  }
                  helperText={touched.clientEmail && errors.clientEmail}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.clientContact}
                  name="clientContact"
                  error={
                    Boolean(touched.clientContact) &&
                    Boolean(errors.clientContact)
                  }
                  helperText={touched.clientContact && errors.clientContact}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Password"
                  type={showRegisterPassword ? "text" : "password"}
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
                          onClick={() =>
                            setShowRegisterPassword((prev) => !prev)
                          }
                          size="small"
                        >
                          {showRegisterPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Retype Password"
                  type={showRepeatRegisterPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={
                    Boolean(touched.confirmPassword) &&
                    Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowRepeatRegisterPassword((prev) => !prev)
                          }
                          size="small"
                        >
                          {showRepeatRegisterPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Date of Birth"
                  type="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.birthDate}
                  name="birthDate"
                  error={
                    Boolean(touched.birthDate) && Boolean(errors.birthDate)
                  }
                  helperText={touched.birthDate && errors.birthDate}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Country of Residence"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.countryOfResidence}
                  name="countryOfResidence"
                  error={
                    Boolean(touched.countryOfResidence) &&
                    Boolean(errors.countryOfResidence)
                  }
                  helperText={
                    touched.countryOfResidence && errors.countryOfResidence
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  select
                  label="Preferred Language"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.preferredLanguage}
                  name="preferredLanguage"
                  error={
                    !!touched.preferredLanguage && !!errors.preferredLanguage
                  }
                  helperText={
                    touched.preferredLanguage && errors.preferredLanguage
                  }
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="french">French</MenuItem>
                  <MenuItem value="kinyarwanda">Kinyarwanda</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name of Entity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.NameOfEntity}
                  name="NameOfEntity"
                  error={
                    Boolean(touched.NameOfEntity) &&
                    Boolean(errors.NameOfEntity)
                  }
                  helperText={touched.NameOfEntity && errors.NameOfEntity}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="TIN Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.TIN}
                  name="TIN"
                  error={Boolean(touched.TIN) && Boolean(errors.TIN)}
                  helperText={touched.TIN && errors.TIN}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  select
                  label="Citizenship"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.citizenship}
                  name="citizenship"
                  error={
                    Boolean(touched.citizenship) && Boolean(errors.citizenship)
                  }
                  helperText={touched.citizenship && errors.citizenship}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="Rwandan">Rwandan</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                {/* Conditional rendering based on citizenship selection */}
                {values.citizenship === "Rwandan" && (
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="National ID"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.NationalID}
                      name="NationalID"
                      error={
                        Boolean(touched.NationalID) &&
                        Boolean(errors.NationalID)
                      }
                      helperText={touched.NationalID && errors.NationalID}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <Box
                      variant="outlined"
                      display="flex"
                      justifyContent="space-between"
                      sx={{
                        backgroundColor: colors.primary[400],
                        gridColumn: "span 2",
                        margin: "1px 0px 1px",
                        borderRadius: "4px",
                        padding: "13px 5px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={colors.greenAccent[500]}
                        fontWeight="500"
                      >
                        {values.national_id_file ? (
                          values.national_id_file.name
                        ) : (
                          <label htmlFor="national_id_file">
                            Upload National ID
                          </label>
                        )}
                      </Typography>
                      <input
                        type="file"
                        accept=".pdf"
                        name="national_id_file"
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(
                            "national_id_file",
                            e.currentTarget.files[0]
                          );
                        }}
                        sx={{ gridColumn: "span 2" }}
                      />
                      {touched.national_id_file && errors.national_id_file && (
                        <div>{errors.national_id_file}</div>
                      )}
                    </Box>
                  </>
                )}
                {values.citizenship === "Other" && (
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Specify Citizenship"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.specifiedCitizenship}
                      name="specifiedCitizenship"
                      error={
                        Boolean(touched.specifiedCitizenship) &&
                        Boolean(errors.specifiedCitizenship)
                      }
                      helperText={
                        touched.specifiedCitizenship &&
                        errors.specifiedCitizenship
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Passport ID Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.passportIdNumber}
                      name="passportIdNumber"
                      error={
                        Boolean(touched.passportIdNumber) &&
                        Boolean(errors.passportIdNumber)
                      }
                      helperText={
                        touched.passportIdNumber && errors.passportIdNumber
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Country of Issue"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.countryOfIssue}
                      name="countryOfIssue"
                      error={
                        Boolean(touched.countryOfIssue) &&
                        Boolean(errors.countryOfIssue)
                      }
                      helperText={
                        touched.countryOfIssue && errors.countryOfIssue
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Passport Expiry Date"
                      type="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.passportExpiryDate}
                      name="passportExpiryDate"
                      error={
                        Boolean(touched.passportExpiryDate) &&
                        Boolean(errors.passportExpiryDate)
                      }
                      helperText={
                        touched.passportExpiryDate && errors.passportExpiryDate
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                    <Box
                      variant="outlined"
                      display="flex"
                      justifyContent="space-between"
                      sx={{
                        backgroundColor: colors.primary[400],
                        gridColumn: "span 2",
                        margin: "1px 0px 1px",
                        borderRadius: "4px",
                        padding: "13px 5px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={colors.greenAccent[500]}
                        fontWeight="500"
                      >
                        {values.passportIdNumber_file ? (
                          values.passportIdNumber_file.name
                        ) : (
                          <label htmlFor="passportIdNumber_file">
                            Upload Passport ID
                          </label>
                        )}
                      </Typography>
                      <input
                        type="file"
                        accept=".pdf"
                        name="passportIdNumber_file"
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(
                            "passportIdNumber_file",
                            e.currentTarget.files[0]
                          );
                        }}
                        sx={{ gridColumn: "span 2" }}
                      />
                      {touched.passportIdNumber_file &&
                        errors.passportIdNumber_file && (
                          <div>{errors.passportIdNumber_file}</div>
                        )}
                    </Box>
                  </>
                )}

                <Box
                  variant="outlined"
                  display="flex"
                  justifyContent="space-between"
                  sx={{
                    backgroundColor: colors.primary[400],
                    gridColumn: "span 2",
                    margin: "1px 0px 1px",
                    borderRadius: "4px",
                    padding: "13px 5px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    fontWeight="500"
                  >
                    {values.registration_certificate ? (
                      values.registration_certificate.name
                    ) : (
                      <label htmlFor="registration_certificate">
                        Upload Registration Certificate
                      </label>
                    )}
                  </Typography>
                  <input
                    type="file"
                    accept=".pdf"
                    name="registration_certificate"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "registration_certificate",
                        e.currentTarget.files[0]
                      );
                    }}
                    sx={{ gridColumn: "span 2" }}
                  />
                  {touched.registration_certificate &&
                    errors.registration_certificate && (
                      <div>{errors.registration_certificate}</div>
                    )}
                </Box>
              </>
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isRegister && !acceptedTerms}
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor:
                    isRegister && acceptedTerms
                      ? palette.secondary.main
                      : palette.secondary.disabled,
                  color:
                    isRegister && acceptedTerms
                      ? palette.background.alt
                      : "white",
                  "&:hover": {
                    backgroundColor:
                      isRegister && acceptedTerms
                        ? palette.secondary.main
                        : palette.secondary.disabled,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    <Typography variant="h5" fontWeight="100">
                      {isLogin
                        ? "LOGIN"
                        : isRegister
                        ? "REGISTER"
                        : isForgotPassword
                        ? "RESET PASSWORD"
                        : "CONTINUE"}
                    </Typography>
                  </>
                )}
              </Button>
            </Box>

            <Box
              display="flex"
              gap="50px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              p="2rem"
              m="2rem auto"
              borderRadius="1.5rem"
              alignItems="flex-end"
            >
              {isLogin && (
                <Typography
                  ml="5px"
                  fontWeight="500"
                  variant="h5"
                  onClick={() => {
                    setPageType("forgotPassword");
                    resetForm();
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
                  Forgot your password? Reset it here.
                </Typography>
              )}
              {isLogin && (
                <Typography
                  mr="5px"
                  fontWeight="500"
                  variant="h5"
                  onClick={() => {
                    setPageType("register");
                    resetForm();
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
                  New user? Register here.
                </Typography>
              )}
              {isRegister && (
                <Typography
                  ml="5px"
                  fontWeight="500"
                  variant="h5"
                  onClick={() => {
                    setPageType("login");
                    resetForm();
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
                  Already have an account? Login here.
                </Typography>
              )}
              {isRegister && (
                <>
                  <Box
                    display="flex"
                    alignItems="flex-end"
                    sx={{ gridColumn: "span 4" }} // Adjust grid layout if needed
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptedTerms}
                          onChange={handleTermsChange}
                          color="secondary"
                        />
                      }
                    />
                    <Typography
                      mr="5px"
                      fontWeight="500"
                      variant="h5"
                      onClick={() => {
                        setPageType("termsConditions");
                        resetForm();
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
                      Agree to Terms and Conditions
                    </Typography>
                  </Box>
                </>
              )}
              {isForgotPassword && (
                <Typography
                  mr="5px"
                  fontWeight="500"
                  variant="h5"
                  onClick={() => {
                    setPageType("login");
                    resetForm();
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
                  Back to Login
                </Typography>
              )}
              {isTermsConditions && (
                <Typography
                  mr="5px"
                  fontWeight="500"
                  variant="h5"
                  onClick={() => {
                    setPageType("register");
                    resetForm();
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
                  Back to Register
                </Typography>
              )}
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ClientLandingForm;
