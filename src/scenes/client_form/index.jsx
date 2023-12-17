import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const ClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="REGISTER A CLIENT" subtitle="Register a new client and Company information" />

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
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
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
                value={values.nationalId}
                name="nationalId"
                error={!!touched.nationalId && !!errors.nationalId}
                helperText={touched.nationalId && errors.nationalId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Birth Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthDate}
                name="birthDate"
                error={!!touched.birthDate && !!errors.birthDate}
                helperText={touched.birthDate && errors.birthDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nationality"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nationality}
                name="nationality"
                error={!!touched.nationality && !!errors.nationality}
                helperText={touched.nationality && errors.nationality}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country of Residence"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.countryOfResidence}
                name="countryOfResidence"
                error={!!touched.countryOfResidence && !!errors.countryOfResidence}
                helperText={touched.countryOfResidence && errors.countryOfResidence}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Passport Expiry Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passportExpiryDate}
                name="passportExpiryDate"
                error={!!touched.passportExpiryDate && !!errors.passportExpiryDate}
                helperText={touched.passportExpiryDate && errors.passportExpiryDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country of Issue"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.countryOfIssue}
                name="countryOfIssue"
                error={!!touched.countryOfIssue && !!errors.countryOfIssue}
                helperText={touched.countryOfIssue && errors.countryOfIssue}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Language Spoken"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.languageSpoken}
                name="languageSpoken"
                error={!!touched.languageSpoken && !!errors.languageSpoken}
                helperText={touched.languageSpoken && errors.languageSpoken}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="kinyarwanda">Kinyarwanda</MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyRole}
                name="companyRole"
                error={!!touched.companyRole && !!errors.companyRole}
                helperText={touched.companyRole && errors.companyRole}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Add Field Button */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  // Handle the logic to add a new field
                }}
                sx={{ gridColumn: "span 2" }}
              >
                Add a More Client Data
              </Button>
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Register a New Client
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

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  nationalId: yup.string().required("required"),
  birthDate: yup.date().required("required"),
  nationality: yup.string().required("required"),
  countryOfResidence: yup.string().required("required"),
  passportExpiryDate: yup.date().required("required"),
  countryOfIssue: yup.string().required("required"),
  languageSpoken: yup.string().required("required"),
  companyName: yup.string().required("required"),
  companyRole: yup.string().required("required"),
  address1: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  nationalId: "",
  birthDate: "",
  nationality: "",
  countryOfResidence: "",
  passportExpiryDate: "",
  countryOfIssue: "",
  languageSpoken: "",
  companyName: "",
  companyRole: "",
  address1: "",
};

export default ClientForm;
