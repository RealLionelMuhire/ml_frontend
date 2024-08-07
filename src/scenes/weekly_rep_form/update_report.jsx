import React, { useMemo} from "react";
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
import { useGetClientsQuery, useUpdateReprtMutation, useGetReportByIdQuery } from "../../state/api";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import PdfViewerDialog from "../../utils/PdfViewerDialog";

const WeeklyRepUpdateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createReport, { isLoading }] = useUpdateReprtMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();
  const selectedReportIds = useMemo(
    () => location.state?.selectedReportIds || [],
    [location.state?.selectedReportIds]
  );

  

  const { data: OldReportsData, isLoading: isReportLoading } = useGetReportByIdQuery(selectedReportIds);
  // const OldReportsData = reports ? reports[0] : {};

  const { data: clientData } = useGetClientsQuery();

  if (isReportLoading) {
    return (
    <div>
      <CircularProgress size={60} color="inherit"/>
    </div>
    )
  }
  

  const handleFormSubmit = async (values) => {
    try {
      const selectedClient = clientData?.find(
        (client) => client.firstName === values.clientName
      );

      const reportData = new FormData();
      reportData.append("title", values.title);
      reportData.append("description", values.description);
      reportData.append("report_file", values.report_file);
      if (selectedClient) {
        reportData.append("client_id", selectedClient.id);
      }
      for (const reportId of selectedReportIds) {
        const result = await createReport({ reportId, updatedReport: reportData}).unwrap();
        if (result?.error) {
          toast.error(result.error?.data?.message);
        }
        if (result?.data) {
          toast.success(result.data?.message);
          navigate("/reports");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="MODIFY A REPORT"
          subtitle="Modify a report for a meeting or an event"
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
                // label="Report Title"
                label={`Report Title: ${OldReportsData.title || ""}`}
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
                label={`Report Description: ${OldReportsData.description || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 3" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 3" }}
              >
                <InputLabel id="clientNameLabel">
                  Select Related Client Name (Optional), Previous client name: {OldReportsData.client_reportee_name || ""}
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
              </FormControl>

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
                  {OldReportsData.report_file ? (
                    <PdfViewerDialog file={OldReportsData.report_file} />
                  ) : (
                    <label htmlFor="report_file">Upload Report file (Optional)</label>
                  )}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="report_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("report_file", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.report_file && errors.report_file && (
                  <div>{errors.report_file}</div>)}
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Modify Report"
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
  title: yup.string(),
  description: yup.string(),
  clientName: yup.string(),
  report_file: yup.mixed().nullable(),
});

const initialValues = {
  title: "",
  description: "",
  clientName: "",
  report_file: null,
};

export default WeeklyRepUpdateForm;
