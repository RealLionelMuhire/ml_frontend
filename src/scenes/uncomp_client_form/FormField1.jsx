import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields1 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  client,
  isNonMobile,
  setFieldValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // console.log(client);

  return (
    <React.Fragment>
      <Box
        variant="outlined"
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "13px 5px",
        }}
      >
        <Typography variant="h5" fontWeight="800">
          Ultimate Beneficiary Owner / Shareholder (Client)
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`First Name: ${client.firstName || ""}`}
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
        label={`Last Name: ${client.lastName || ""}`}
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
        label={`Email: ${client.clientEmail || ""}`}
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
        label={`Contact Phone: ${client.clientContact || ""}`}
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
        label={`Citizenship: ${client.citizenship || ""}`}
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
        label={`TIN Number: ${client.tinNumber || ""}`}
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
        label={`Country of Residence: ${client.countryOfResidence || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        name="countryOfResidence"
        error={!!touched.countryOfResidence && !!errors.countryOfResidence}
        helperText={touched.countryOfResidence && errors.countryOfResidence}
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
        label={`Current Address: ${client.currentAddress || ""}`}
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
        label={`Birth Date: ${client.birthDate || ""}`}
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
        label={`National ID or Passport: ${client.passportIdNumber || ""}`}
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
        label={`Passport Expiry Date: ${client.passportExpiryDate || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.passportExpiryDate}
        name="passportExpiryDate"
        error={!!touched.passportExpiryDate && !!errors.passportExpiryDate}
        helperText={touched.passportExpiryDate && errors.passportExpiryDate}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Country of Issue: ${client.countryOfIssue || ""}`}
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
        label={`Preferred Language: ${client.preferredLanguage || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.preferredLanguage}
        name="preferredLanguage"
        error={!!touched.preferredLanguage && !!errors.preferredLanguage}
        helperText={touched.preferredLanguage && errors.preferredLanguage}
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
        label={`Designation: ${client.designation || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.designation}
        name="designation"
        error={!!touched.designation && !!errors.designation}
        helperText={touched.designation && errors.designation}
        sx={{ gridColumn: "span 1" }}
      >
        <MenuItem value="Ultimate Beneficiary Owner">
          Ultimate Beneficiary Owner
        </MenuItem>
        <MenuItem value="Shareholder">Shareholder</MenuItem>
      </TextField>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Percentage Shareholding (%): ${client.sharePercent || ""}`}
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
        label={`Introducer Name(If any): ${client.introducerName || ""}`}
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
        label={`Introducer Email: ${client.introducerEmail || ""}`}
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
        label={`Contact Person Name(If any): ${client.contactPersonName || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contactPersonName}
        name="contactPersonName"
        error={!!touched.contactPersonName && !!errors.contactPersonName}
        helperText={touched.contactPersonName && errors.contactPersonName}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Contact Person Email: ${client.contactPersonEmail || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contactPersonEmail}
        name="contactPersonEmail"
        error={!!touched.contactPersonEmail && !!errors.contactPersonEmail}
        helperText={touched.contactPersonEmail && errors.contactPersonEmail}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Contact Person Phone: ${client.contactPersonPhone || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contactPersonPhone}
        name="contactPersonPhone"
        error={!!touched.contactPersonPhone && !!errors.contactPersonPhone}
        helperText={touched.contactPersonPhone && errors.contactPersonPhone}
        sx={{ gridColumn: "span 1" }}
      />
    </React.Fragment>
  );
};

export default FormFields1;
