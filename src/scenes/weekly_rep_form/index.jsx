import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useGetClientsQuery, useCreateReportMutation } from "../../state/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import TestCalendar from "./TestCalendar";


const WeeklyRepForm = () => {
  const validate = async (values) => {
    console.log("Validating values:", values);
    try {
      await appointmentSchema.validate(values, { abortEarly: false });
      return {};
    } catch (error) {
      console.log("Validation errors:", error);
      return error.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("Submitting form with values:", values);
    try {
      setIsLoading(true);
      if (!values.startTime || !values.endTime) {
        toast.error("Please choose a time for the appointment.");
        setIsLoading(false);
        return;
      }

      // Build the newReservation object based on the API structure

      // Build the newReservation object based on the API structure
      const newReservation = {
        email: values.email,
        fullName: values.fullName,
        clientContact: values.clientContact,
        servicesToDiscuss: values.servicesToDiscuss,
        otherServices: values.otherServices,
        startTime: values.startTime,
        endTime: values.endTime,
      };
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      // Call the createReservation mutation with the newReservation object

      // Call the createReservation mutation with the newReservation object
      const response = await fetch(`${baseUrl}register-reservation/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Failed to register reservation: ${errorMessage}`);
        toast.error(`Failed to register reservation: ${errorMessage}`);
        setIsLoading(false);
        return;
      }

      toast.success("Appointment booked successfully.");
      onSubmitProps.resetForm();
      setTimeout(() => {
        window.location.href = "http://mlcorporateservices.com/";
      }, 6000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeSelect = (selectInfo) => {
    console.log("Time selected:", selectInfo);
    if (!selectInfo.start || !selectInfo.end) {
      console.error("Invalid time selection. Please try again.");
      return;
    }

    const startTime = selectInfo.start.toISOString();
    const endTime = selectInfo.end.toISOString();

    formik.setValues((prevValues) => ({
      ...prevValues,
      startTime,
      endTime,
    }));

    setShowCalendar(false);
  };

  const formik = useFormik({
    initialValues: initialValuesAppointment,
    validationSchema: appointmentSchema,
    onSubmit: handleFormSubmit,
    validate: validate,
  });

  console.log("Formik initialized with values:", formik.values);

  const { startTime, endTime } = formik.values || {};

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CREATE A REPORT"
          subtitle="Schedule a report for a meeting or an event"
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/reports">Back to Reports</Link>
          </Button>
        </Box>
      </Box>

      <Formik
      onSubmit={handleFormSubmit}
      validate={validate}
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
              error={
                Boolean(touched.servicesToDiscuss) &&
                Boolean(errors.servicesToDiscuss)
              }
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
                error={
                  Boolean(touched.otherServices) &&
                  Boolean(errors.otherServices)
                }
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
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    fontWeight="500"
                  >
                    Booked period:
                  </Typography>
                  <Typography variant="body1">
                    Start time: {format(new Date(startTime), "h:mm a")}
                  </Typography>
                  <Typography variant="body1">
                    End time: {format(new Date(endTime), "h:mm a")}
                  </Typography>
                  <Typography variant="body1">
                    Date: {format(new Date(startTime), "EEE d MMM yyyy")}
                  </Typography>
                </div>
              ) : (
                <Typography variant="h5" fontWeight="500">
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
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "BOOK APPOINTMENT"
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const appointmentSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  fullName: yup.string().required("Required"),
  clientContact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  servicesToDiscuss: yup
    .string()
    .required("Required")
    .notOneOf(["Choose a service"], "Required"),
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

export default WeeklyRepForm;
