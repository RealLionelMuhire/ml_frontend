import {
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { CountryDropdown } from "react-country-region-selector";
import { useCreateClientMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";

const ClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading, isError, data }] = useCreateClientMutation();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      const response = await createUser(values);
      navigate("/clients");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="REGISTER A CLIENT"
          subtitle="Register a new client and Company information"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/clients">Back to Client List</Link>
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
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clientEmail}
                name="clientEmail"
                error={!!touched.clientEmail && !!errors.clientEmail}
                helperText={touched.clientEmail && errors.clientEmail}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clientContact}
                name="clientContact"
                error={!!touched.clientContact && !!errors.clientContact}
                helperText={touched.clientContact && errors.clientContact}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Citizenship"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.citizenship}
                name="citizenship"
                error={!!touched.citizenship && !!errors.citizenship}
                helperText={touched.citizenship && errors.citizenship}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tax Residency"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.taxResidency}
                name="taxResidency"
                error={!!touched.taxResidency && !!errors.taxResidency}
                helperText={touched.taxResidency && errors.taxResidency}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="TIN Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tinNumber}
                name="tinNumber"
                error={!!touched.tinNumber && !!errors.tinNumber}
                helperText={touched.tinNumber && errors.tinNumber}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country of Residence"
                onBlur={handleBlur}
                onChange={handleChange}
                name="countryOfResidence"
                error={
                  !!touched.countryOfResidence && !!errors.countryOfResidence
                }
                helperText={
                  touched.countryOfResidence && errors.countryOfResidence
                }
                sx={{ gridColumn: "span 1" }}
              >
                <CountryDropdown
                  value={values.countryOfResidence}
                  onChange={(val) =>
                    handleChange({
                      target: { name: "countryOfResidence", value: val },
                    })
                  }
                  classes="form-control"
                />
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Current Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currentAddress}
                name="currentAddress"
                error={!!touched.currentAddress && !!errors.currentAddress}
                helperText={touched.currentAddress && errors.currentAddress}
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="National ID or Passport"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passportIdNumber}
                name="passportIdNumber"
                error={!!touched.passportIdNumber && !!errors.passportIdNumber}
                helperText={touched.passportIdNumber && errors.passportIdNumber}
                sx={{ gridColumn: "span 1" }}
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
                error={
                  !!touched.passportExpiryDate && !!errors.passportExpiryDate
                }
                helperText={
                  touched.passportExpiryDate && errors.passportExpiryDate
                }
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Preferred Language"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.preferredLanguage}
                name="preferredLanguage"
                error={
                  !!touched.preferredLanguage && !!errors.preferredLanguage
                }
                helperText={
                  touched.preferredLanguage && errors.preferredLanguage
                }
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Designation in Company"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                name="designation"
                error={!!touched.designation && !!errors.designation}
                helperText={touched.designation && errors.designation}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value="english">Ultimate Beneficiary Owner</MenuItem>
                <MenuItem value="french">Shareholder</MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Percentage Shareholding (%)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sharePercent}
                name="sharePercent"
                error={!!touched.sharePercent && !!errors.sharePercent}
                helperText={touched.sharePercent && errors.sharePercent}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Introduer Name(If any)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.introducerName}
                name="introducerName"
                error={!!touched.introducerName && !!errors.introducerName}
                helperText={touched.introducerName && errors.introducerName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Introducer Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.introducerEmail}
                name="introducerEmail"
                error={!!touched.introducerEmail && !!errors.introducerEmail}
                helperText={touched.introducerEmail && errors.introducerEmail}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Person Name(If any)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactPersonName}
                name="contactPersonName"
                error={
                  !!touched.contactPersonName && !!errors.contactPersonName
                }
                helperText={
                  touched.contactPersonName && errors.contactPersonName
                }
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Person Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactPersonEmail}
                name="contactPersonEmail"
                error={
                  !!touched.contactPersonEmail && !!errors.contactPersonEmail
                }
                helperText={
                  touched.contactPersonEmail && errors.contactPersonEmail
                }
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Person Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactPersonPhone}
                name="contactPersonPhone"
                error={
                  !!touched.contactPersonPhone && !!errors.contactPersonPhone
                }
                helperText={
                  touched.contactPersonPhone && errors.contactPersonPhone
                }
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register a New Client"
                )}
              </Button>
            </Box>

            {isError && (
              <Box mt="20px" color="error.main">
                Error regstering client. Please try again.
              </Box>
            )}

            {data && (
              <Box mt="20px" color="success.main">
                Client registered successfully!
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
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  clientEmail: yup.string().email("Invalid email").required("required"),
  clientContact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  passportIdNumber: yup.string().required("required"),
  birthDate: yup.date().required("required"),
  citizenship: yup.string().required("required"),
  countryOfResidence: yup.string(),
  passportExpiryDate: yup.date(),
  countryOfIssue: yup.string(),
  preferredLanguage: yup.string().required("required"),
  companyName: yup.string(),
  sharePercent: yup.string(),
  currentAddress: yup.string().required("required"),
  taxResidency: yup.string().required("required"),
  tinNumber: yup.string().required("required"),
  designation: yup.string(),
  introducerName: yup.string(),
  introducerEmail: yup.string().email("Invalid email"),
  contactPersonName: yup.string(),
  contactPersonEmail: yup.string().email("Invalid email"),
  contactPersonPhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  clientEmail: "",
  clientContact: "",
  passportIdNumberNumber: "",
  birthDate: "",
  citizenship: "",
  countryOfResidence: "",
  passportExpiryDate: "",
  countryOfIssue: "",
  preferredLanguage: "",
  companyName: "",
  sharePercent: "",
  currentAddress: "",
  taxResidency: "",
  tinNumber: "",
  designation: "",
  introducerName: "",
  introducerEmail: "",
  contactPersonName: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
};

export default ClientForm;
