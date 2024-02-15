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
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { tokens } from "../../theme";
import TestCalendar from "./TestCalendar";
import { format } from "date-fns";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const appointmentSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  fullName: yup.string().required("Required"),
  clientContact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  servicesToDiscuss: yup.string().required("Required").notOneOf(["Choose a service"], "Required"),
  otherServices: yup.string().when("servicesToDiscuss", {
    is: "Other",
    then: yup.string().required("Please specify other services."),
    otherwise: yup.string().notRequired(),
  }),
  startTime: yup.mixed().required("Required"),
  endTime: yup.mixed().required("Required"),
});

const initialValuesAppointment = {
  email: "",
  fullName: "",
  clientContact: "",
  servicesToDiscuss: "Choose a service",
  otherServices: "",
  startTime: null,
  endTime: null,
};

const servicesOptions = [
  "Choose a service",
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
  const formik = useFormik({
    // ... other Formik configuration
  });

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showCalendar, setShowCalendar] = useState(false);

  const handleTimeSelect = (selectInfo) => {
    console.log("Selected Time Info:", selectInfo);
  
    if (!selectInfo.start || !selectInfo.end) {
      console.error("Invalid time selection. Please try again.");
      return;
    }
  
    const startTime = selectInfo.start.toISOString();
    const endTime = selectInfo.end.toISOString();
  
    console.log("Start Time (before setting values):", startTime);
    console.log("End Time (before setting values):", endTime);
  
    formik.setValues((prevValues) => ({
      ...prevValues,
      startTime,
      endTime,
    }));
  
    setShowCalendar(false);
  };


  const { startTime, endTime } = formik.values || {};

  console.log("Formik Values:", formik.values);
  console.log("Start Time (after setting values):", startTime, typeof startTime);
  console.log("End Time (after setting values):", endTime, typeof endTime);
  

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      // Check if startTime and endTime are empty
      if (!values.startTime || !values.endTime) {
        toast.error("Please choose a time for the appointment.");
        return;
      }

      // Rest of the code (unchanged)
      console.log({ ...values });

      const bookingResponse = await fetch(
        "http://localhost:8000/api/book-appointment/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values }),
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
        setValues,
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

            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 4",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
                cursor: "pointer",
              }}
              onClick={() => setShowCalendar(true)}
            >
              {startTime && endTime ? (
                <div>
                  <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                    Booked period:
                  </Typography>
                  <Typography variant="body1">
                    Start time: {format(startTime, "h:mm a")}
                  </Typography>
                  <Typography variant="body1">
                    End time: {format(endTime, "h:mm a")}
                  </Typography>
                  <Typography variant="body1">
                    Date: {format(new Date(), "EEE d MMM yyyy")}
                  </Typography>
                </div>
              ) : (
                <Typography variant="h5"  fontWeight="500">
                  Choose the time and date for the appointment
                </Typography>
              )}
              {touched.startTime && errors.startTime && (
                <Typography color="error" variant="body2">
                  {errors.startTime}
                </Typography>
              )}
              {touched.endTime && errors.endTime && (
                <Typography color="error" variant="body2">
                  {errors.endTime}
                </Typography>
              )}
            </Box>


            {showCalendar && (
            <TestCalendar
              onTimeSelect={(selectInfo) => {
                handleTimeSelect(selectInfo);
                setValues((prevValues) => ({
                  ...prevValues,
                  startTime: selectInfo.start.toISOString(),
                  endTime: selectInfo.end.toISOString(),
                }));
              }}
              style={{ maxWidth: "10%" }}
            />
          )}

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
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
