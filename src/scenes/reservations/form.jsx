// Form.js

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { tokens } from "../../theme";
import TestCalendar from "./TestCalendar";


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const appointmentSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  fullName: yup.string().required("Required"),
  clientContact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),

  otherServices: yup.string().when("servicesToDiscuss", {
    is: (servicesToDiscuss) => servicesToDiscuss.includes("Other"),
    then: yup.string().required("Please specify other services."),
    otherwise: yup.string().notRequired(),
  
  servicesToDiscuss: yup.string().when("otherServices", {
    is: "Other",
    then: yup.string().required("Please specify other services."),
    otherwise: yup.string().notRequired(), }),
  }),
});


const initialValuesAppointment = {
  email: "",
  fullName: "",
  clientContact: "",
  servicesToDiscuss: "",
  otherServices: "",
};

const servicesOptions = [
  "Setting up and incorporation of companies and structures",
  "Corporate Governance",
  "Legal and Compliance Assistance",
  "Private Notary Services",
  "Taxation Services",
  "Accounting Services",
  "Fund Services",
  "Intellectual Property Services",
  "Training",
  "Other",
];

const Form = () => {
  const [pageType] = useState("appointment");
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      // ... (same as before)

      const bookingResponse = await fetch(
        "http://localhost:8000/api/book-appointment/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        toast.error(errorData.message);
        return;
      }

      toast.success("Appointment booked successfully.");
      onSubmitProps.resetForm();
    } catch (error) {
      toast.error("Error booking appointment. Please try again.");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesAppointment}
      validationSchema={appointmentSchema}
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
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Full Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.fullName}
              name="fullName"
              error={Boolean(touched.fullName) && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
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
              fullWidth
              variant="filled"
              type="text"
              label="Phone Contact"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.clientContact}
              name="clientContact"
              error={
                Boolean(touched.clientContact) && Boolean(errors.clientContact)
              }
              helperText={touched.clientContact && errors.clientContact}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              select
              label="Specify Services To Discuss"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.servicesToDiscuss}
              name="servicesToDiscuss"
              error={Boolean(touched.servicesToDiscuss) && Boolean(errors.servicesToDiscuss)}
              helperText={touched.servicesToDiscuss && errors.servicesToDiscuss}
              sx={{ gridColumn: "span 4" }}
            >
              {servicesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            {values.servicesToDiscuss === "Other" && (
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Specify Other Services"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.otherServices}
                name="otherServices"
                error={Boolean(touched.otherServices) && Boolean(errors.otherServices)}
                helperText={touched.otherServices && errors.otherServices}
                sx={{ gridColumn: "span 4" }}
              />
            )}

            <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 4", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
              <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                Choose the time and date For the appointment
              </Typography>
            </Box>
          
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
              BOOK APPOINTMENT
            </Button>
            <Typography
              color="secondary"
              fontWeight="500"
              variant="h5"
              onClick={() => {
                // handle switching to login if needed
                resetForm();
              }}
              sx={{
                mb: "1.5rem",
                textDecoration: "underline",
                color: palette.secondary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {/* Text to navigate to login if needed */}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
