import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

// Type of Product(s) / Service(s)
// Secretary
// Business Address

const FormFields7 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
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
          PURPOSE AND INTENDED NATURE OF BUSINESS RELATIONSHIP
        </Typography>
      </Box>
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
        <Typography variant="h6" fontWeight="500" fontStyle="italic">
          B. Company Details
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Proposed activity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.proposedActivity}
        name="proposedActivity"
        error={!!touched.proposedActivity && !!errors.proposedActivity}
        helperText={touched.proposedActivity && errors.proposedActivity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Target sectors"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.targetSectors}
        name="targetSectors"
        error={!!touched.targetSectors && !!errors.targetSectors}
        helperText={touched.targetSectors && errors.targetSectors}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Proposed targeted countries/geographical location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.targetedCountries}
        name="targetedCountries"
        error={!!touched.targetedCountries && !!errors.targetedCountries}
        helperText={touched.targetedCountries && errors.targetedCountries}
        sx={{ gridColumn: "span 1" }}
      />
      <Box
        variant="outlined"
        display="inline-flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          Will the company acquire a special license/permit?
        </Typography>
        <TextField
          select
          value={values.specialLicense}
          onChange={handleChange}
          name="specialLicense"
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      {values.specialLicense === "yes" && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 1",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              - If yes, please state the type of special license/permits to be
              acquired by the company:
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Secretary"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.secretary}
            name="secretary"
            error={!!touched.secretary && !!errors.secretary}
            helperText={touched.secretary && errors.secretary}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Type of Product(s) / Service(s)"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.productService}
            name="productService"
            error={!!touched.productService && !!errors.productService}
            helperText={touched.productService && errors.productService}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Business Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.businessAddress}
            name="businessAddress"
            error={!!touched.businessAddress && !!errors.businessAddress}
            helperText={touched.businessAddress && errors.businessAddress}
            sx={{ gridColumn: "span 1" }}
          />
        </>
      )}
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
        <Typography variant="h6" fontWeight="500" fontStyle="italic">
          C. Shareholding
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Type of shares"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.sharesType}
        name="sharesType"
        error={!!touched.sharesType && !!errors.sharesType}
        helperText={touched.sharesType && errors.sharesType}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="No. of shares incorporation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.sharesNumber}
        name="sharesNumber"
        error={!!touched.sharesNumber && !!errors.sharesNumber}
        helperText={touched.sharesNumber && errors.sharesNumber}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Value of Stated Capital at incorporation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.statedCapital}
        name="statedCapital"
        error={!!touched.statedCapital && !!errors.statedCapital}
        helperText={touched.statedCapital && errors.statedCapital}
        sx={{ gridColumn: "span 1" }}
      />
    </React.Fragment>
  );
};

export default FormFields7;
