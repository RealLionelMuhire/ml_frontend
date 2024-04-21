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

// Savings

// - Bank Statements for the past 3 months;
// - Custody accounts for the past 3 months; or
// - Portfolio Statements for the past 3 months from regulated financialservices providers.

// Additional document may be required upon review of the above documents to ascertain the
// source of the funds available in the bank account.

// Salary Earnings

// - 3 months’ recent payslips;
// - Letter of confirmation from employer of income detailing the amount of monthly salary; and
// - Bank statements clearly showing receipt of the 3 recent months’ regular salary payments from named employer.

// Dividend Income

// - Due diligence documents on the entity from which the client is obtaining the dividend income
// - Annual financial statements of the business that declared the dividend or any such proof of dividend pay-outs.

//  Rental Income

// - Proof of ownership of the asset being rented / leased;
// - Lease agreement; and
// - Bank statements (over the recent 3 months) showing receipt of funds from the lessee.

// Business Income

// - CDD Documents on the legal entity from which profit is being derived;
// - Documentary evidence of link between legal entity and the client;
// - Bank statement showing receipt of funds provided from business income (to the extent possible over the recent 3 months);
// - Latest Audited financial statements of the entity.

// Proceeds from sale of property

// - Notarised documents proving sale of property; and
// - Bank statement showing receipt of funds following proceeds of sale.

// Donation

// - Letter from donor confirming details of gift; and
// - Details and documentary evidence of the donor’s source of wealth.

// Gift

// - Letter from donor confirming details of gift;
// - Details and documentary evidence of the donor’s source of wealth; and
// - Bank statement showing receipt of funds.

// Lottery

// - Letter from relevant organisation (Lottery headquarters / betting shop /
// casino); and
// - Bank statement showing funds deposited including name of the paying
// organisation.

// Creditor

// - Agreement with regards to the arrangement in place;
// - CDD on creditor (applicable to non-regulated parties); and
// - Bank statement showing receipt of funds.

// Inheritance

// - Legal document which must include the value of the inheritance, or
// - Notary’s letter confirming inheritance details; or
// - Executer’s letter confirming inheritance details.

// Loans from Banks or any other
// Financial Institution

// - Loan / Facility Agreement; and
// - Bank statement showing receipt of funds.

// Loan from related third parties
// (e.g., sister companies)

// - Loan Agreement;
// - CDD on third party; and
// - Bank statement showing receipt of funds.

// Loan from unrelated third parties

// - Loan Agreement;
// - CDD on third party; and
// - Bank statement showing receipt of funds.

// Real Estate

// - Signed letter from Notary, and
// - Property Contract or any equivalent document.

// Insurance Pay-out

// - Proof of remittance from the Insurance Policy pay-out (from an approved licensed insurance company).

// Retirement

// - Retirement Annuity Fund Statement recent valuation (from an approved licensed financial services provider).

// Others

// - Will depend on a case-to-case basis (other source of funds could refer, but not limited to, trading in stocks or any recognised type of securities, commissioning or introducer fees, brokerage fees received)
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

  const handleSourceOfFundsChange = (e) => {
    handleChange(e);
    if (e.target.value === "Salary Earnings") {
      setFieldValue("salaryEvidence_file", e.currentTarget.files[0]);
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
          Part A - Source of funds (Please provide information as appropriate)
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
            Part A – Source of funds (Please select all that apply)
          </Typography>
        </Box>
        <Box
          variant="outlined"
          //   display="flex"
          justifyContent="space-between"
          sx={{
            backgroundColor: colors.primary[400],
            gridColumn: "span 4",
            margin: "1px 0px 1px",
            borderRadius: "4px",
            padding: "13px 5px",
          }}
        >
          {sourceOfFundsOptions.map((option, index) => (
            <React.Fragment key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      values.sourceOfFunds &&
                      values.sourceOfFunds.includes(option)
                    }
                    color="secondary"
                    onChange={handleSourceOfFundsChange}
                    name="sourceOfFunds"
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
      {values.sourceOfFunds && values.sourceOfFunds.includes("Savings") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 1",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="h5">
              Upload Bank Statement for the past 3 months
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bank_statement_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("bank_statement_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.bank_statement_file && errors.bank_statement_file && (
              <div>{errors.bank_statement_file}</div>
            )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 1",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="h5">
              Custody accounts for the past 3 months
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="custody_accounts_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "custody_accounts_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.custody_accounts_file && errors.custody_accounts_file && (
              <div>{errors.custody_accounts_file}</div>
            )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 1",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="h5">
              Source of funds for the past 3 months
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="source_of_funds_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("source_of_funds_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.source_of_funds_file && errors.source_of_funds_file && (
              <div>{errors.source_of_funds_file}</div>
            )}
          </Box>
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
