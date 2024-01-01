import React from "react";
import { Box, TextField, Typography, useTheme, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

const LegalPersonForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {/* Legal Person Information */}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Name of Entity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.nameOfEntity}
        name="nameOfEntity"
        error={!!touched.nameOfEntity && !!errors.nameOfEntity}
        helperText={touched.nameOfEntity && errors.nameOfEntity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Any previous name (if any)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.previousName}
        name="previousName"
        error={!!touched.previousName && !!errors.previousName}
        helperText={touched.previousName && errors.previousName}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Type of entity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.typeOfEntity}
        name="typeOfEntity"
        error={!!touched.typeOfEntity && !!errors.typeOfEntity}
        helperText={touched.typeOfEntity && errors.typeOfEntity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Type of licence (if any)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.typeOfLicence}
        name="typeOfLicence"
        error={!!touched.typeOfLicence && !!errors.typeOfLicence}
        helperText={touched.typeOfLicence && errors.typeOfLicence}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="date"
        label="Date of Incorporation/registration"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.dateOfIncorporation}
        name="dateOfIncorporation"
        error={!!touched.dateOfIncorporation && !!errors.dateOfIncorporation}
        helperText={touched.dateOfIncorporation && errors.dateOfIncorporation}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Country of incorporation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.countryOfIncorporation}
        name="countryOfIncorporation"
        error={
          !!touched.countryOfIncorporation && !!errors.countryOfIncorporation
        }
        helperText={
          touched.countryOfIncorporation && errors.countryOfIncorporation
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Tax residency (ies)"
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
        label="Registered office address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.registeredOfficeAddress}
        name="registeredOfficeAddress"
        error={
          !!touched.registeredOfficeAddress && !!errors.registeredOfficeAddress
        }
        helperText={
          touched.registeredOfficeAddress && errors.registeredOfficeAddress
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Business activity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.businessActivity}
        name="businessActivity"
        error={!!touched.businessActivity && !!errors.businessActivity}
        helperText={touched.businessActivity && errors.businessActivity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Country of operation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.countryOfOperation}
        name="countryOfOperation"
        error={!!touched.countryOfOperation && !!errors.countryOfOperation}
        helperText={touched.countryOfOperation && errors.countryOfOperation}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Phone number (includes country code)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name="phoneNumber"
        error={!!touched.phoneNumber && !!errors.phoneNumber}
        helperText={touched.phoneNumber && errors.phoneNumber}
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
        sx={{ gridColumn: "span 4" }}
      >
        <Typography
          color={colors.greenAccent[500]}
          variant="h6"
          fontWeight="600"
        >
          Authorised Persons to deal on behalf of the Legal Person
        </Typography>
      </Box>

      {/* Authorised Person Information */}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Name of the person"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorizedName}
        name="authorizedName"
        error={!!touched.authorizedName && !!errors.authorizedName}
        helperText={touched.authorizedName && errors.authorizedName}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Address of the person"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorizedAddress}
        name="authorizedAddress"
        error={!!touched.authorizedAddress && !!errors.authorizedAddress}
        helperText={touched.authorizedAddress && errors.authorizedAddress}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Email address of the person"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorizedEmail}
        name="authorizedEmail"
        error={!!touched.authorizedEmail && !!errors.authorizedEmail}
        helperText={touched.authorizedEmail && errors.authorizedEmail}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Relationship of Authorised Person with Client"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.relationshipWithClient}
        name="relationshipWithClient"
        error={
          !!touched.relationshipWithClient && !!errors.relationshipWithClient
        }
        helperText={
          touched.relationshipWithClient && errors.relationshipWithClient
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Phone number (includes country code)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorizedPhoneNumber}
        name="authorizedPhoneNumber"
        error={
          !!touched.authorizedPhoneNumber && !!errors.authorizedPhoneNumber
        }
        helperText={
          touched.authorizedPhoneNumber && errors.authorizedPhoneNumber
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Authorising signatory specimen signature"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorizedSignatorySignature}
        name="authorizedSignatorySignature"
        error={
          !!touched.authorizedSignatorySignature &&
          !!errors.authorizedSignatorySignature
        }
        helperText={
          touched.authorizedSignatorySignature &&
          errors.authorizedSignatorySignature
        }
        sx={{ gridColumn: "span 1" }}
      />
    </Box>
  );
};

export default LegalPersonForm;
