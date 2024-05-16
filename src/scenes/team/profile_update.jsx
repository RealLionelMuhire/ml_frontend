import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  useUpdateUserProfileMutation,
  useGetUserSelfDataQuery,
} from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tokens } from "../../theme";
import PdfViewerDialog from "../../utils/PdfViewerDialog";

const ProfileUpdateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [updatedProfile, { isError, data }] = useUpdateUserProfileMutation();
  const navigate = useNavigate();
  const { data: userProfile, isLoading } = useGetUserSelfDataQuery();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log("user profile data", userProfile);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size={60} color="inherit" />
      </div>
    );
  }

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (
            key === "financialForecast" ||
            key === "expectedAccountActivity"
          ) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });

      const response = await updatedProfile(formData);

      if (response.error) {
        toast.error(
          response.error.message || "Error updating profile. Please try again."
        );
      } else if (response.data) {
        toast.success(response.data.message || "Updated successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="UPDATE PROFILE"
          subtitle="View and Change your Profile Where is necessary"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/dashboard">Back to Dashboard</Link>
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
          isSubmitting,
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={`First Name: ${userProfile?.FirstName || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.FirstName}
                name="FirstName"
                error={!!touched.FirstName && !!errors.FirstName}
                helperText={touched.FirstName && errors.FirstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={`Last Name: ${userProfile?.LastName || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.LastName}
                name="LastName"
                error={!!touched.LastName && !!errors.LastName}
                helperText={touched.LastName && errors.LastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={`Email: ${userProfile?.email || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={`Contact: ${userProfile?.contact || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={`National ID: ${userProfile?.NationalID || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.NationalID}
                name="NationalID"
                error={!!touched.NationalID && !!errors.NationalID}
                helperText={touched.NationalID && errors.NationalID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label={`Birth Date: ${userProfile?.BirthDate || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.BirthDate}
                name="BirthDate"
                error={!!touched.BirthDate && !!errors.BirthDate}
                helperText={touched.BirthDate && errors.BirthDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={`Address: ${userProfile?.Address || ""}`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Address}
                name="Address"
                error={!!touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
                sx={{ gridColumn: "span 2" }}
              />
              <Box
                variant="outlined"
                display="inline-flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 2",
                  margin: "1px 0px 1px",
                  borderRadius: "4px",
                  padding: "13px 5px",
                  flex: "4",
                }}
              >
                <Typography variant="h5" fontWeight="500">
                  {userProfile?.national_id_file ? (
                    <PdfViewerDialog file={userProfile.national_id_file} />
                  ) : (
                    <label htmlFor="national_id_file">
                      National Id or Passport
                    </label>
                  )}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="national_id_file"
                  onChange={(e) =>
                    setFieldValue("national_id_file", e.target.files[0])
                  }
                />
              </Box>
              <Box
                variant="outlined"
                display="inline-flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 2",
                  margin: "1px 0px 1px",
                  borderRadius: "4px",
                  padding: "13px 5px",
                  flex: "4",
                }}
              >
                <Typography variant="h5" fontWeight="500">
                  {userProfile?.cv_file ? (
                    <PdfViewerDialog file={userProfile.cv_file} />
                  ) : (
                    <label htmlFor="cv_file">Upload CV</label>
                  )}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="cv_file"
                  onChange={(e) => setFieldValue("cv_file", e.target.files[0])}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update Profile"
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
  FirstName: yup.string(),
  LastName: yup.string(),
  email: yup.string().email("invalid email"),
  contact: yup.string(),
  NationalID: yup.string(),
  BirthDate: yup.date().nullable(),
  Address: yup.string(),
  national_id_file: yup.mixed().nullable(),
  cv_file: yup.mixed().nullable(),
});

const initialValues = {
  FirstName: "",
  LastName: "",
  email: "",
  contact: "",
  NationalID: "",
  BirthDate: "",
  Address: "",
  national_id_file: null,
  cv_file: null,
};

export default ProfileUpdateForm;
