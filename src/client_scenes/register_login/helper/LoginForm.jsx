import React from "react";
import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";

const LoginForm = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
          {/* Email field */}
          <TextField
            label="Email"
            type="email"
            onBlur={handleBlur("email")}
            onChange={handleChange("email")}
            value={values.email}
            name="email"
            error={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          {/* Password field */}
          <TextField
            label="Password"
            type="password"
            onBlur={handleBlur("password")}
            onChange={handleChange("password")}
            value={values.password}
            name="password"
            error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

// Define initial values and validation schema
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Example usage:
// <LoginForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} />

export default LoginForm;
