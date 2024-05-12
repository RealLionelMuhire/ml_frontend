import React from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useGetClientsQuery, useCreateReportMutation } from "../../state/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const ReportsForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createReport, { isLoading }] = useCreateReportMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: clientData } = useGetClientsQuery();

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      // if (values.clientName) {
      //   const selectedClient = clientData.find(
      //     (client) => client.firstName === values.clientName
      //   );
      //   formData.append("client_id", selectedClient.id);
      // }
      formData.append("report_file", values.report_file);

      console.log("Form Data:", formData); // Log formData before calling createReport

      const result = await createReport({ reportData: formData });
      if (result?.error) {
        toast.error(result.error?.data?.message);
      }
      if (result?.data) {
        toast.success(result.data?.message);
        navigate("/reports");
      }
    } catch (error) {
      toast.error(error);
    }
  };

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
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Report Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 3" }}
              />

              <TextField
                fullWidth
                multiline
                minRows={4}
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 3" }}
              />
              {/* <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 3" }}
              >
                <InputLabel id="clientNameLabel">
                  Select Related Client Name (Optional)
                </InputLabel>
                <Select
                  labelId="clientNameLabel"
                  id="clientName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.clientName || ""}
                  name="clientName"
                  error={!!touched.clientName && !!errors.clientName}
                >
                  {clientData &&
                    clientData.map((client) => (
                      <MenuItem key={client.id} value={client.firstName}>
                        {client.firstName} {client.lastName} with Passport or
                        ID: {client.passportIdNumber}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl> */}
              <TextField
                fullWidth
                multiline
                minRows={4}
                variant="filled"
                type="text"
                label="Client Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clientName}
                name="clientName"
                error={!!touched.clientName && !!errors.clientName}
                helperText={touched.clientName && errors.clientName}
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
                }}
              >
                <Typography variant="h6">
                  {values.report_file ? (
                    values.report_file.name
                  ) : (
                    <label htmlFor="report_file">Upload Report file</label>
                  )}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  id="report_file"
                  name="report_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("report_file", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.report_file && errors.report_file && (
                  <div>{errors.report_file}</div>
                )}
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Report"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string(),
  report_file: yup.mixed().required("Report file is required"),
});

const initialValues = {
  title: "",
  description: "",
  clientName: "",
  report_file: null,
};

export default ReportsForm;
