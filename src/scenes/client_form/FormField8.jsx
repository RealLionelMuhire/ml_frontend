import React from "react";
import {
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const sourceOfFundsOptions = [
  "Savings",
  "Salary Earnings",
  "Dividend Income",
  "Rental Income",
  "Business Income",
  "Proceeds from sale of property",
  "Donation",
  "Gift",
  "Lottery",
  "Creditor",
  "Inheritance",
  "Loans from Banks or other Financial Institution",
  "Loan from related third parties",
  "Loan from unrelated third parties",
  "Real Estate",
  "Others",
];

const sourceOfWealthOptions = [
  "Savings",
  "Salary Earnings",
  "Dividend Income",
  "Rental Income",
  "Business Income",
  "Proceeds from sale of property",
  "Donation",
  "Gift",
  "Lottery",
  "Creditor",
  "Inheritance",
  "Loans from Banks or other Financial Institution",
  "Loan from related third parties",
  "Loan from unrelated third parties",
  "Real Estate",
  "Others",
];

const FormFields8 = ({
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
        <Typography variant="h6" fontWeight="500" fontStyle="italic">
          D. ORIGIN OF FUNDS / PROPERTY & SOURCE OF WEALTH (if applicable)
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
          Part A – Source of funds (Please provide information as appropriate)
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Source of Funds:
        </Typography>
        {sourceOfFundsOptions.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={
                  values.sourceOfFunds && values.sourceOfFunds.includes(option)
                }
                color="secondary"
                onChange={handleChange}
                name="sourceOfFunds"
                value={option}
              />
            }
            label={option}
            sx={{ gridColumn: "span 1", color: "secondary" }}
          />
        ))}
      </Box>
      {values.sourceOfFunds && (
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Selected Source(s)"
            value={values.sourceOfFunds.join(", ")}
            disabled
          />
        </Box>
      )}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Others") && (
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Specify Other Source"
            value={values.otherSourceOfFunds || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            name="otherSourceOfFunds"
            error={touched.otherSourceOfFunds && errors.otherSourceOfFunds}
            helperText={touched.otherSourceOfFunds && errors.otherSourceOfFunds}
          />
        </Box>
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
        <Typography
          variant="h6"
          fontWeight="500"
          fontStyle="italic"
        ></Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="From which country does the source of funds come from?"
        value={values.countrySourceFunds || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="countrySourceFunds"
        error={touched.countrySourceFunds && errors.countrySourceFunds}
        helperText={touched.countrySourceFunds && errors.countrySourceFunds}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="What is the net annual income?"
        value={values.netAnnualIncome || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="netAnnualIncome"
        error={touched.netAnnualIncome && errors.netAnnualIncome}
        helperText={touched.netAnnualIncome && errors.netAnnualIncome}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="What is the estimated Net Worth?"
        value={values.estimatedNetWorth || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="estimatedNetWorth"
        error={touched.estimatedNetWorth && errors.estimatedNetWorth}
        helperText={touched.estimatedNetWorth && errors.estimatedNetWorth}
      />
    </React.Fragment>
  );
};

export default FormFields8;
