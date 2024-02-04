import {
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { CountryDropdown } from "react-country-region-selector";
import { useCreateClientMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { SHA256 } from 'crypto-js';
import CryptoJS from 'crypto-js';

const ClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading, isError, data }] = useCreateClientMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          subtitle="Register a new client and Company information (Ultimate Beneficiary Owner / Shareholder)"
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
          setFieldValue
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
                select
                label="Designation"
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
                fullWidthvalue={values.preferredLanguage}
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
              <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 4", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                  Legal Person (Complete this section if the Shareholder is a legal entity)
                </Typography>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name of Entity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.NameOfEntity}
                name="NameOfEntity"
                error={!!touched.NameOfEntity && !!errors.NameOfEntity}
                helperText={touched.NameOfEntity && errors.NameOfEntity}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Any Name of Entity(If any)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.PrevNameOfEntity}
                name="PrevNameOfEntity"
                error={!!touched.PrevNameOfEntity && !!errors.PrevNameOfEntity}
                helperText={touched.PrevNameOfEntity && errors.PrevNameOfEntity}
                sx={{ gridColumn: "span 1" }}
              />
              <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 4", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                  Authorised Person to deal on behalf of the Legal Person
                </Typography>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Authorised Person Names"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.authorisedName}
                name="authorisedName"
                error={!!touched.authorisedName && !!errors.authorisedName}
                helperText={touched.authorisedName && errors.authorisedName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Authorised Person Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.authorisedEmail}
                name="authorisedEmail"
                error={!!touched.authorisedEmail && !!errors.authorisedEmail}
                helperText={touched.authorisedEmail && errors.authorisedEmail}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Authorised Person Contact Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.authorisedPersonContact}
                name="authorisedPersonContact"
                error={!!touched.authorisedPersonContact && !!errors.authorisedPersonContact}
                helperText={touched.authorisedPersonContact && errors.authorisedPersonContact}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Authorised Person Current Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.authorisedCurrentAddress}
                name="authorisedCurrentAddress"
                error={!!touched.authorisedCurrentAddress && !!errors.authorisedCurrentAddress}
                helperText={touched.authorisedCurrentAddress && errors.authorisedCurrentAddress}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Relationship of Authorised Person with Client"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.authorisedRelationship}
                name="authorisedRelationship"
                error={!!touched.authorisedRelationship && !!errors.authorisedRelationship}
                helperText={touched.authorisedRelationship && errors.authorisedRelationship}
                sx={{ gridColumn: "span 1" }}
              />
              <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h6">
                  {values.signature_file ? values.signature_file.name : <label htmlFor="signature_file">Upload Authorising signatory specimen signature</label>}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="signature_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("signature_file", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.signature_file && errors.signature_file && (
                  <div>{errors.signature_file}</div>
                )}
              </Box>
              <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 4", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                  PEP Status (For the Ultimate Beneficial Owner/Shareholder)
                </Typography>
              </Box>
              {/* PEP Status */}
              <TextField
                fullWidth
                variant="filled"
                select
                label="PEP Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.isPep}
                name="isPep"
                error={
                  !!touched.isPep && !!errors.isPep
                }
                helperText={
                  touched.isPep && errors.isPep
                }
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>

              {/* Conditional rendering for certificate upload */}
              {values.isPep === "yes" && (
                <>
                  <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                    <Typography variant="h6">
                      {values.bankStatement_file ? values.bankStatement_file.name : <label htmlFor="signature_file">Upload last six months bank statements</label>}
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf"
                      name="bankStatement_file"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("bankStatement_file", e.currentTarget.files[0]);
                      }}
                      sx={{ gridColumn: "span 2" }}
                    />
                    {touched.bankStatement_file && errors.bankStatement_file && (
                      <div>{errors.bankStatement_file}</div>
                    )}
                  </Box>

                  <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                    <Typography variant="h6">
                      {values.professionalReference_file ? values.professionalReference_file.name : <label htmlFor="signature_file">Upload professional reference</label>}
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf"
                      name="professionalReference_file"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("professionalReference_file", e.currentTarget.files[0]);
                      }}
                      sx={{ gridColumn: "span 2" }}
                    />
                    {touched.professionalReference_file && errors.professionalReference_file && (
                      <div>{errors.professionalReference_file}</div>
                    )}
                  </Box>
                </>
              )}

              
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
  NameOfEntity: yup.string(),
  PrevNameOfEntity: yup.string(),
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
  authorisedName: yup.string(),
  authorisedEmail: yup.string().email("Invalid email"),
  authorisedPersonContact: yup
  .string()
  .matches(phoneRegExp, "Phone number is not valid"),
  authorisedCurrentAddress: yup.string(),
  authorisedRelationship: yup.string(),
  signature_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
  isPep: yup.string().required("required"),
  bankStatement_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
  professionalReference_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
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
  NameOfEntity: "",
  PrevNameOfEntity: "",
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
  authorisedName: "",
  authorisedEmail: "",
  authorisedPersonContact: "",
  authorisedCurrentAddress: "",
  authorisedRelationship: "",
  signature_file: null,
  isPep: "",
  bankStatement_file: null,
  professionalReference_file: null,
};

export default ClientForm;
