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
  "Loan from related third parties (e.g., sister companies)",
  "Loan from unrelated third parties",
  "Real Estate",
  "Insurance Pay-out",
  "Retirement",
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

  const handleSourceOfFundsChange = (e) => {
    handleChange(e);

    if (e.target.checked) {
      setFieldValue("sourceOfFunds", [...values.sourceOfFunds, e.target.value]);
      setFieldValue("sourceOfFundsOther", "");
    } else {
      setFieldValue(
        "sourceOfFunds",
        values.sourceOfFunds.filter((item) => item !== e.target.value)
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
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
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
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Custody accounts file for the past 3 months
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
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Source of funds for the past 3 months
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
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Salary Earnings") && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Letter of confirmation from employer of income detailing the
                amount of monthly salary
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="confirmationLetter_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "confirmationLetter_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.confirmationLetter_file &&
                errors.confirmationLetter_file && (
                  <div>{errors.confirmationLetter_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload 3 months' recent payslips
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="payslips_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("payslips_file", e.currentTarget.files[0]);
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.payslips_file && errors.payslips_file && (
                <div>{errors.payslips_file}</div>
              )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Bank Statement for the past 3 months
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="bank_statement_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "bank_statement_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.bank_statement_file && errors.bank_statement_file && (
                <div>{errors.bank_statement_file}</div>
              )}
            </Box>
          </>
        )}
      {/* Dividend Income */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Dividend Income") && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Due diligence documents on the entity from which the
                client is obtaining the dividend income
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="due_diligence_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("due_diligence_file", e.currentTarget.files[0]);
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.due_diligence_file && errors.due_diligence_file && (
                <div>{errors.due_diligence_file}</div>
              )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Annual financial statements of the business that declared
                the dividend or any such proof of dividend pay-outs.
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="financial_statements_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "financial_statements_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.financial_statements_file &&
                errors.financial_statements_file && (
                  <div>{errors.financial_statements_file}</div>
                )}
            </Box>
          </>
        )}
      {/* Rental Income */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Rental Income") && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Proof of ownership of the asset being rented / leased;
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="proof_of_ownership_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "proof_of_ownership_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.proof_of_ownership_file &&
                errors.proof_of_ownership_file && (
                  <div>{errors.proof_of_ownership_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Lease agreement;
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="lease_agreement_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "lease_agreement_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.lease_agreement_file && errors.lease_agreement_file && (
                <div>{errors.lease_agreement_file}</div>
              )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Bank statements (over the recent 3 months) showing
                receipt of funds from the lessee.
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="bank_statements_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "bank_statements_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.bank_statements_file && errors.bank_statements_file && (
                <div>{errors.bank_statements_file}</div>
              )}
            </Box>
          </>
        )}
      {/* Business Income */}

      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Business Income") && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload CDD Documents on the legal entity from which profit is
                being derived;
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="cdd_documents_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("cdd_documents_file", e.currentTarget.files[0]);
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.cdd_documents_file && errors.cdd_documents_file && (
                <div>{errors.cdd_documents_file}</div>
              )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Documentary evidence of link between legal entity and the
                client;
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="documentary_evidence_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "documentary_evidence_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.documentary_evidence_file &&
                errors.documentary_evidence_file && (
                  <div>{errors.documentary_evidence_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Bank statement showing receipt of funds provided from
                business income (to the extent possible over the recent 3
                months);
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="bank_statement_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "bank_statement_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
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
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Latest Audited financial statements of the entity.
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="financial_statements_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "financial_statements_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 1" }}
              />
              {touched.financial_statements_file &&
                errors.financial_statements_file && (
                  <div>{errors.financial_statements_file}</div>
                )}
            </Box>
          </>
        )}
      {/* Proceeds from sale of property */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Proceeds from sale of property") && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Notarised documents proving sale of property
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="notarised_documents_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "notarised_documents_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.notarised_documents_file &&
                errors.notarised_documents_file && (
                  <div>{errors.notarised_documents_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Bank statement showing receipt of funds following
                proceeds of sale
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="bank_statement_proceeds_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "bank_statement_proceeds_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.bank_statement_proceeds_file &&
                errors.bank_statement_proceeds_file && (
                  <div>{errors.bank_statement_proceeds_file}</div>
                )}
            </Box>
          </>
        )}
      {/* donation */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Donation") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Letter from donor confirming details of gift
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="donor_confirmation_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "donor_confirmation_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.donor_confirmation_file &&
              errors.donor_confirmation_file && (
                <div>{errors.donor_confirmation_file}</div>
              )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Details and documentary evidence of the donor’s source of
              wealth
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="donor_wealth_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("donor_wealth_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.donor_wealth_file && errors.donor_wealth_file && (
              <div>{errors.donor_wealth_file}</div>
            )}
          </Box>
        </>
      )}
      {/* gift */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Gift") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Letter from donor confirming details of gift
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="donor_confirmation_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "donor_confirmation_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.donor_confirmation_file &&
              errors.donor_confirmation_file && (
                <div>{errors.donor_confirmation_file}</div>
              )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Details and documentary evidence of the donor’s source of
              wealth
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="donor_wealth_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("donor_wealth_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.donor_wealth_file && errors.donor_wealth_file && (
              <div>{errors.donor_wealth_file}</div>
            )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Bank statement showing receipt of funds
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bank_statement_gift_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "bank_statement_gift_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.bank_statement_gift_file &&
              errors.bank_statement_gift_file && (
                <div>{errors.bank_statement_gift_file}</div>
              )}
          </Box>
        </>
      )}
      {/* lottery */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Lottery") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Letter from relevant organisation (Lottery headquarters /
              betting shop / casino)
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="lottery_letter_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("lottery_letter_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.lottery_letter_file && errors.lottery_letter_file && (
              <div>{errors.lottery_letter_file}</div>
            )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Bank statement showing funds deposited including name of
              the paying organisation
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bank_statement_lottery_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "bank_statement_lottery_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.bank_statement_lottery_file &&
              errors.bank_statement_lottery_file && (
                <div>{errors.bank_statement_lottery_file}</div>
              )}
          </Box>
        </>
      )}
      {/* creditor */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Creditor") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Agreement with regards to the arrangement in place
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="agreement_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("agreement_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.agreement_file && errors.agreement_file && (
              <div>{errors.agreement_file}</div>
            )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload CDD on creditor (applicable to non-regulated parties)
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="cdd_creditor_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("cdd_creditor_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.cdd_creditor_file && errors.cdd_creditor_file && (
              <div>{errors.cdd_creditor_file}</div>
            )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Bank statement showing receipt of funds
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bank_statement_creditor_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "bank_statement_creditor_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.bank_statement_creditor_file &&
              errors.bank_statement_creditor_file && (
                <div>{errors.bank_statement_creditor_file}</div>
              )}
          </Box>
        </>
      )}
      {/* inheritance */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Inheritance") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Legal document which must include the value of the
              inheritance
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="legal_document_inheritance_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "legal_document_inheritance_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.legal_document_inheritance_file &&
              errors.legal_document_inheritance_file && (
                <div>{errors.legal_document_inheritance_file}</div>
              )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Notary’s letter confirming inheritance details
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="notary_letter_inheritance_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "notary_letter_inheritance_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.notary_letter_inheritance_file &&
              errors.notary_letter_inheritance_file && (
                <div>{errors.notary_letter_inheritance_file}</div>
              )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Executer’s letter confirming inheritance details
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="executer_letter_inheritance_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "executer_letter_inheritance_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.executer_letter_inheritance_file &&
              errors.executer_letter_inheritance_file && (
                <div>{errors.executer_letter_inheritance_file}</div>
              )}
          </Box>
        </>
      )}
      {/* loans from banks or any other financial institutions */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes(
          "Loans from Banks or other Financial Institution"
        ) && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Loan / Facility Agreement
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="loan_agreement_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "loan_agreement_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.loan_agreement_file && errors.loan_agreement_file && (
                <div>{errors.loan_agreement_file}</div>
              )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Bank statement showing receipt of funds
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="bank_statement_loan_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "bank_statement_loan_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.bank_statement_loan_file &&
                errors.bank_statement_loan_file && (
                  <div>{errors.bank_statement_loan_file}</div>
                )}
            </Box>
          </>
        )}
      {/* Loan from related third parties (e.g., sister companies) */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes(
          "Loan from related third parties (e.g., sister companies)"
        ) && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Loan Agreement
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="loan_agreement_related_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "loan_agreement_related_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.loan_agreement_related_file &&
                errors.loan_agreement_related_file && (
                  <div>{errors.loan_agreement_related_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload CDD on third party
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="cdd_third_party_related_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "cdd_third_party_related_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.cdd_third_party_related_file &&
                errors.cdd_third_party_related_file && (
                  <div>{errors.cdd_third_party_related_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Bank statement showing receipt of funds
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="bank_statement_loan_related_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "bank_statement_loan_related_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.bank_statement_loan_related_file &&
                errors.bank_statement_loan_related_file && (
                  <div>{errors.bank_statement_loan_related_file}</div>
                )}
            </Box>
          </>
        )}
      {/* Loan from unrelated third parties */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Loan from unrelated third parties") && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Loan Agreement
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="loan_agreement_unrelated_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "loan_agreement_unrelated_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.loan_agreement_unrelated_file &&
                errors.loan_agreement_unrelated_file && (
                  <div>{errors.loan_agreement_unrelated_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload CDD on third party
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="cdd_third_party_unrelated_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "cdd_third_party_unrelated_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.cdd_third_party_unrelated_file &&
                errors.cdd_third_party_unrelated_file && (
                  <div>{errors.cdd_third_party_unrelated_file}</div>
                )}
            </Box>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Bank statement showing receipt of funds
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="bank_statement_loan_unrelated_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "bank_statement_loan_unrelated_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.bank_statement_loan_unrelated_file &&
                errors.bank_statement_loan_unrelated_file && (
                  <div>{errors.bank_statement_loan_unrelated_file}</div>
                )}
            </Box>
          </>
        )}
      {/* Real Estate */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Real Estate") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Signed letter from Notary
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="notary_letter_real_estate_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "notary_letter_real_estate_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.notary_letter_real_estate_file &&
              errors.notary_letter_real_estate_file && (
                <div>{errors.notary_letter_real_estate_file}</div>
              )}
          </Box>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Property Contract or any equivalent document
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="property_contract_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "property_contract_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.property_contract_file &&
              errors.property_contract_file && (
                <div>{errors.property_contract_file}</div>
              )}
          </Box>
        </>
      )}
      {/* Insurance */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Insurance Pay-out") && (
          <>
            <Box
              variant="outlined"
              display="flex"
              justifyContent="space-between"
              sx={{
                backgroundColor: colors.primary[400],
                gridColumn: "span 2",
                margin: "1px 0px 1px",
                borderRadius: "4px",
                padding: "13px 5px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Upload Proof of remittance from the Insurance Policy pay-out
                (from an approved licensed insurance company)
              </Typography>
              <input
                type="file"
                accept=".pdf"
                name="insurance_payout_file"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "insurance_payout_file",
                    e.currentTarget.files[0]
                  );
                }}
                sx={{ gridColumn: "span 2" }}
              />
              {touched.insurance_payout_file &&
                errors.insurance_payout_file && (
                  <div>{errors.insurance_payout_file}</div>
                )}
            </Box>
          </>
        )}
      {/* Retirement */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Retirement") && (
        <>
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Retirement Annuity Fund Statement recent valuation (from an
              approved licensed financial services provider)
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="retirement_annuity_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "retirement_annuity_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.retirement_annuity_file &&
              errors.retirement_annuity_file && (
                <div>{errors.retirement_annuity_file}</div>
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
