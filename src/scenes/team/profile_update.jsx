import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useUpdateUserProfileMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileUpdateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [updatedProfile, { isError, data }] = useUpdateUserProfileMutation();
  const navigate = useNavigate();

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
        <Header title="UPDATE PROFILE" subtitle="Change your Profile" />
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
                label="First Name"
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
                label="Last Name"
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
                label="Email"
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
                label="Contact Number"
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
                label="National ID or Passport"
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
                label="Birth Date"
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
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Address}
                name="Address"
                error={!!touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
                sx={{ gridColumn: "span 2" }}
              />
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
});
const initialValues = {
  FirstName: "",
  LastName: "",
  email: "",
  contact: "",
  NationalID: "",
  BirthDate: "",
  Address: "",
};

export default ProfileUpdateForm;
