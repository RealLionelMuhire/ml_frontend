import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields2 = ({
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
          Legal Person (Complete this section if the Shareholder is a legal
          entity)
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Name of Entity: ${client.NameOfEntity || ""}`}
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
        label={`Previous Name of Entity(If any): ${
          client.PrevNameOfEntity || ""
        }`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.PrevNameOfEntity}
        name="PrevNameOfEntity"
        error={!!touched.PrevNameOfEntity && !!errors.PrevNameOfEntity}
        helperText={touched.PrevNameOfEntity && errors.PrevNameOfEntity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Type of Entity: ${client.TypeOfEntity || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.TypeOfEntity}
        name="TypeOfEntity"
        error={!!touched.TypeOfEntity && !!errors.TypeOfEntity}
        helperText={touched.TypeOfEntity && errors.TypeOfEntity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Type of licence (if any): ${client.TypeOfLicense}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.TypeOfLicense}
        name="TypeOfLicense"
        error={!!touched.TypeOfLicense && !!errors.TypeOfLicense}
        helperText={touched.TypeOfLicense && errors.TypeOfLicense}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Tax Residency (ies): ${client.taxResidency}`}
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
        type="date"
        label={`Date of Incorporation/registration: ${client.incorporationDate}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.incorporationDate}
        name="incorporationDate"
        error={!!touched.incorporationDate && !!errors.incorporationDate}
        helperText={touched.incorporationDate && errors.incorporationDate}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Country of Iconporation: ${client.countryOfIncorporation}`}
        onBlur={handleBlur}
        onChange={handleChange}
        name="countryOfIncorporation"
        error={
          !!touched.countryOfIncorporation && !!errors.countryOfIncorporation
        }
        helperText={
          touched.countryOfIncorporation && errors.countryOfIncorporation
        }
        sx={{ gridColumn: "span 1" }}
      >
        <CountryDropdown
          value={values.countryOfIncorporation}
          onChange={(val) =>
            handleChange({
              target: { name: "countryOfIncorporation", value: val },
            })
          }
          classes="form-control"
        />
      </TextField>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Registered office address: ${client.registeredOfficeAddress}`}
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
        label={`Business activity: ${client.businessActivity}`}
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
        label={`Country of Operation: ${client.countryOfOperation}`}
        onBlur={handleBlur}
        onChange={handleChange}
        name="countryOfOperation"
        error={!!touched.countryOfOperation && !!errors.countryOfOperation}
        helperText={touched.countryOfOperation && errors.countryOfOperation}
        sx={{ gridColumn: "span 1" }}
      >
        <CountryDropdown
          value={values.countryOfOperation}
          onChange={(val) =>
            handleChange({
              target: { name: "countryOfIncorporation", value: val },
            })
          }
          classes="form-control"
        />
      </TextField>
    </React.Fragment>
  );
};

export default FormFields2;
