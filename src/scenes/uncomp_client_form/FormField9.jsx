import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  TextField,
  Box,
  Typography,
  MenuItem,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { useGetUncompleteClientByIdQuery } from "../../state/api";

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

const FormFields9 = ({
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
  const location = useLocation();
  const selectedClientIds = useMemo(
    () => location.state?.selectedClientIds || [],
    [location.state?.selectedClientIds]
  );
  const { data: clientData, isLoading } =
    useGetUncompleteClientByIdQuery(selectedClientIds);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size={60} color="inherit" />
      </div>
    );
  }

  const client = clientData ? clientData[0] : {};

  const handleSourceOfWealthChange = (e) => {
    handleChange(e);

    if (e.target.checked) {
      setFieldValue("sourceOfWealth", [
        ...values.sourceOfWealth,
        e.target.value,
      ]);
      setFieldValue("sourceOfWealthOther", "");
    } else {
      setFieldValue(
        "sourceOfWealth",
        values.sourceOfWealth.filter((item) => item !== e.target.value)
      );
    }
  };

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
      <Box sx={{ marginBottom: 2, gridColumn: "span 2" }}>
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
          <Typography variant="h5" gutterBottom>
            Part B- Source of wealth (It is a measure of enhanced due diligence)
          </Typography>
        </Box>
        <Box
          variant="outlined"
          justifyContent="space-between"
          sx={{
            backgroundColor: colors.primary[400],
            gridColumn: "span 4",
            margin: "1px 0px 1px",
            borderRadius: "4px",
            padding: "13px 5px",
          }}
        >
          {sourceOfWealthOptions.map((option, index) => (
            <React.Fragment key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      values.sourceOfWealth &&
                      values.sourceOfWealth.includes(option)
                    }
                    color="secondary"
                    onChange={handleSourceOfWealthChange}
                    name="sourceOfWealth"
                    value={option}
                  />
                }
                label={option}
                sx={{ gridColumn: "span 1", color: "secondary" }}
              />
            </React.Fragment>
          ))}
        </Box>
      </Box>
      {values.sourceOfWealth && (
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Selected Source(s)"
            value={values.sourceOfWealth.join(", ")}
            disabled
          />
        </Box>
      )}
      {values.sourceOfWealth && values.sourceOfWealth.includes("Others") && (
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Specify Other Source: ${client.otherSourceOfWealth || ""}`}
            value={values.otherSourceOfWealth || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            name="otherSourceOfWealth"
            error={touched.otherSourceOfWealth && errors.otherSourceOfWealth}
            helperText={
              touched.otherSourceOfWealth && errors.otherSourceOfWealth
            }
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
        label={`From which country does the source of wealth come from?: ${
          client.countrySourceWealth || ""
        }`}
        value={values.countrySourceWealth || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="countrySourceWealth"
        error={touched.countrySourceWealth && errors.countrySourceWealth}
        helperText={touched.countrySourceWealth && errors.countrySourceWealth}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Name of bank involved?: ${client.bankInvolvedWealth || ""}`}
        value={values.bankInvolvedWealth || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="bankInvolvedWealth"
        error={touched.bankInvolvedWealth && errors.bankInvolvedWealth}
        helperText={touched.bankInvolvedWealth && errors.bankInvolvedWealth}
      />
    </React.Fragment>
  );
};

export default FormFields9;
