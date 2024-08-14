// WeeklyRepForm.jsx

import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import TestCalendar from "./TestCalendar";

const WeeklyRepForm = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const colors = tokens(palette.mode);

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("Submitting form with values:", values);
    try {
      setIsLoading(true);
      if (!values.startTime || !values.endTime) {
        toast.error("Please choose a time for the appointment.");
        setIsLoading(false);
        return;
      }

      const newReservation = {
        taskDescription: values.taskDescription,
        taskName: values.taskName,
        progress: values.progress,
        servicesToDiscuss: values.servicesToDiscuss,
        otherServices: values.otherServices,
        startTime: values.startTime,
        endTime: values.endTime,
      };
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

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
        onSubmit={formik.handleSubmit}
        initialValues={formik.initialValues}
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
                // fullWidth
                variant="filled"
                type="text"
                label="Task Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.taskName}
                name="taskName"
                error={Boolean(touched.taskName) && Boolean(errors.taskName)}
                helperText={touched.taskName && errors.taskName}
                sx={{ gridColumn: "span 3" }}
              />
              
              <TextField
                // fullWidth
                variant="filled"
                type="text"
                label="Task Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.taskDescription}
                name="taskDescription"
                error={Boolean(touched.taskDescription) && Boolean(errors.taskDescription)}
                helperText={touched.taskDescription && errors.taskDescription}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                // fullWidth
                variant="filled"
                type="text"
                label="Progress"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.progress}
                name="progress"
                error={
                  Boolean(touched.progress) && Boolean(errors.progress)
                }
                helperText={touched.progress && errors.progress}
                sx={{ gridColumn: "span 3" }}
              />
              {/* challenges */}
              <TextField
                // fullWidth
                variant="filled"
                type="text"
                label="Challenges"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.challenges}
                name="challenges"
                error={
                  Boolean(touched.challenges) && Boolean(errors.challenges)
                }
                helperText={touched.challenges && errors.challenges}
                sx={{ gridColumn: "span 3" }}
              />

              <Box
                variant="outlined"
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 3",
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
                      Task Period:
                    </Typography>
                    <Typography variant="body1">
                      Start time: {format(new Date(startTime), "EEE d MMM yyyy")} at: {format(new Date(startTime), "h:mm a")} 
                    </Typography>
                    <Typography variant="body1">
                      End time: {format(new Date(endTime), "EEE d MMM yyyy")} at: {format(new Date(endTime), "h:mm a")}
                    </Typography>
                  </div>
                ) : (
                  <Typography variant="h5" fontWeight="500">
                    Choose Task Period
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
                <>
                <Box
                variant="outlined"
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 2",
                  margin: "1px 0px 1px",
                  borderRadius: "20px",
                  padding: "13px 5px",
                }}
                >

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
                </Box>
                </>
              )}
            </Box>

            <Box>
              <Button
                // fullWidth
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

const appointmentSchema = yup.object().shape({
  taskDescription: yup.string().required("Required"),
  taskName: yup.string().required("Required"),
  progress: yup.string().required("Required"),
  challenges: yup.string().required("Required"),
  startTime: yup.date().required("Required"),
  endTime: yup.date().required("Required"),
});

const initialValuesAppointment = {
  taskDescription: "",
  taskName: "",
  progress: "",
  challenges: "",
  startTime: null,
  endTime: null,
};

export default WeeklyRepForm;
