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
import FileViewer from "../../utils/FileViewer";

const ProfileUpdateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [updatedProfile, { isError, data }] = useUpdateUserProfileMutation();
  const navigate = useNavigate();
  const { data: userProfile, isLoading } = useGetUserSelfDataQuery();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // console.log("user profile data", userProfile);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size={60} color="inherit" />
      </div>
    );
  }

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updatedProfile(values);

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
                  Passport or National ID File: -
                  {userProfile?.national_id_link ? (
                    <FileViewer url={userProfile.national_id_link} />
                  ) : values.national_id_file ? (
                    values.national_id_file.name
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
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("national_id_file", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.national_id_file && errors.national_id_file && (
                  <div>{errors.national_id_file}</div>
                )}
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
                }}
              >
                <Typography variant="h5" fontWeight="500">
                  CV File: -
                  {userProfile?.cv_link ? (
                    <FileViewer url={userProfile.cv_link} />
                  ) : values.cv_file ? (
                    values.cv_file.name
                  ) : (
                    <label htmlFor="cv_file">Upload CV</label>
                  )}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="cv_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("cv_file", e.currentTarget.files[0]);
                  }}
                />
                {touched.cv_file && errors.cv_file && (
                  <div>{errors.cv_file}</div>
                )}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Change Your Profile"
                  )}
                </Button>
              </Box>
            </Box>

            {isError && (
              <Box mt="20px" color="error.main">
                Error. Please try again.
              </Box>
            )}

            {data && (
              <Box mt="20px" color="success.main">
                Updated successfully!
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  FirstName: yup.string(),
  LastName: yup.string(),
  email: yup.string().email("invalid email"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  NationalID: yup.string(),
  BirthDate: yup.date(),
  Address: yup.string(),
  national_id_file: createFileSchema(),
  cv_file: createFileSchema(),
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

function createFileSchema() {
  return yup
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
    );
}

export default ProfileUpdateForm;
