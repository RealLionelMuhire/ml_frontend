import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields6 = ({
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
          MODE OF PAYMENT
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
          If payment is being made by third party, then ensure to obtain KYC on
          the remitting party
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Remitting Party"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.RemittingParty}
        name="RemittingParty"
        error={!!touched.RemittingParty && !!errors.RemittingParty}
        helperText={touched.RemittingParty && errors.RemittingParty}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Mode of Payment"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.ModeOfPayment}
        name="ModeOfPayment"
        error={!!touched.ModeOfPayment && !!errors.ModeOfPayment}
        helperText={touched.ModeOfPayment && errors.ModeOfPayment}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        select
        label="Relationship with the applicant"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.RelationshipWithApplicant}
        name="RelationshipWithApplicant"
        error={
          !!touched.RelationshipWithApplicant &&
          !!errors.RelationshipWithApplicant
        }
        helperText={
          touched.RelationshipWithApplicant && errors.RelationshipWithApplicant
        }
        sx={{ gridColumn: "span 1" }}
      >
        <MenuItem value="individual">Individual</MenuItem>
        <MenuItem value="legal entity">Legal entity</MenuItem>
        <MenuItem value="Trust">Trust</MenuItem>
        <MenuItem value="Foundation">Foundation</MenuItem>
      </TextField>
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
          A. Proposed name
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Option 1"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.ProposedNameOption1}
        name="ProposedNameOption1"
        error={!!touched.ProposedNameOption1 && !!errors.ProposedNameOption1}
        helperText={touched.ProposedNameOption1 && errors.ProposedNameOption1}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Option 2"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.ProposedNameOption2}
        name="ProposedNameOption2"
        error={!!touched.ProposedNameOption2 && !!errors.ProposedNameOption2}
        helperText={touched.ProposedNameOption2 && errors.ProposedNameOption2}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Option 3"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.ProposedNameOption3}
        name="ProposedNameOption3"
        error={!!touched.ProposedNameOption3 && !!errors.ProposedNameOption3}
        helperText={touched.ProposedNameOption3 && errors.ProposedNameOption3}
        sx={{ gridColumn: "span 1" }}
      />
    </React.Fragment>
  );
};

export default FormFields6;
