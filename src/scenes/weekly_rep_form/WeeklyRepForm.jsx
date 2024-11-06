import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import TestCalendar from "./TestCalendar";

const WeeklyRepForm = ({ onSubmit, isLoading, handleCancel, initialValues }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showCalendar, setShowCalendar] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values, { resetForm }) => {
    const dateTime = `${format(new Date(values.startTime), "EEE d MMM yyyy h:mm a")} - ${format(new Date(values.endTime), "EEE d MMM yyyy h:mm a")}`;
    onSubmit({ ...values, dateTime });
    resetForm();
  };

  return (
    <Box m="20px">
      <Formik
        initialValues={initialValues || {
          taskName: "",
          taskDescription: "",
          progress: "",
          challenges: "",
          startTime: null,
          endTime: null,
        }}
        validationSchema={yup.object().shape({
          taskDescription: yup.string().required("Required"),
          taskName: yup.string().required("Required"),
          progress: yup.string().required("Required"),
          challenges: yup.string().required("Required"),
          startTime: yup.date().required("Required"),
          endTime: yup.date().required("Required"),
        })}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
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
                variant="filled"
                type="text"
                label="Task Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.taskDescription}
                name="taskDescription"
                error={
                  Boolean(touched.taskDescription) &&
                  Boolean(errors.taskDescription)
                }
                helperText={touched.taskDescription && errors.taskDescription}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Progress"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.progress}
                name="progress"
                error={Boolean(touched.progress) && Boolean(errors.progress)}
                helperText={touched.progress && errors.progress}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Challenges"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.challenges}
                name="challenges"
                error={Boolean(touched.challenges) && Boolean(errors.challenges)}
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
                {values.startTime && values.endTime ? (
                  <div>
                    <Typography
                      variant="h5"
                      color={colors.greenAccent[500]}
                      fontWeight="500"
                    >
                      Task Period:
                    </Typography>
                    <Typography variant="body1">
                      Start time: {format(new Date(values.startTime), "EEE d MMM yyyy")} at:{" "}
                      {format(new Date(values.startTime), "h:mm a")}
                    </Typography>
                    <Typography variant="body1">
                      End time: {format(new Date(values.endTime), "EEE d MMM yyyy")} at:{" "}
                      {format(new Date(values.endTime), "h:mm a")}
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
                      setValues((prevValues) => ({
                        ...prevValues,
                        startTime: selectInfo.start.toISOString(),
                        endTime: selectInfo.end.toISOString(),
                      }));
                      setShowCalendar(false);
                    }}
                  />
                </Box>
              )}
              <Box
                justifyContent="space-between"
                display="flex"
                variant="outlined"
                sx={{
                  gridColumn: "span 3",
                }}
              >
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    margin: "2rem 0",
                    p: "1rem",
                    borderRadius: "10px",
                    width: "50%",
                    fontSize: "0.8rem",
                    backgroundColor: colors.greenAccent[400],
                    "&:hover": {
                      backgroundColor: colors.greenAccent[300],
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add Task"
                  )}
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    margin: "2rem 0",
                    p: "1rem",
                    borderRadius: "10px",
                    width: "50%",
                    fontSize: "0.8rem",
                    backgroundColor: colors.primary[400],
                    "&:hover": {
                      backgroundColor: colors.primary[300],
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default WeeklyRepForm;
