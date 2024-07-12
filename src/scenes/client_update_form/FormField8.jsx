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
import PdfViewerDialog from "../../utils/PdfViewerDialog";

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
  client,
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
            Part A - Source of funds (Please select all that apply)
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
                      values.sourceOfFunds
                        ? values.sourceOfFunds.includes(option)
                        : client.sourceOfFunds?.includes(option) || false
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
      {(Array.isArray(values.sourceOfFunds) &&
        values.sourceOfFunds.length > 0) ||
      (client.sourceOfFunds && client.sourceOfFunds.length > 0) ||
      (values.sourceOfFunds && values.sourceOfFunds.length > 0) ? (
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            // label="Selected Source(s)"
            label={`Selected Source(s) - ${
              values.sourceOfFunds || client.sourceOfFunds || ""
            }`}
            value={
              Array.isArray(values.sourceOfFunds) &&
              values.sourceOfFunds.length > 0
                ? values.sourceOfFunds.join(", ")
                : client.sourceOfFunds
            }
            disabled
          />
        </Box>
      ) : null}
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Others") && ( */}
      {(values.sourceOfFunds?.includes("Others") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Others"))) && (
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
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Savings") && ( */}
      {(values.sourceOfFunds?.includes("Savings") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Savings"))) && (
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
              {client?.bank_statement_file ? (
                <PdfViewerDialog file={client.bank_statement_file} />
              ) : (
                <label htmlFor="bank_statement_file">
                  Upload Bank Statement for the past 3 months
                </label>
              )}
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
              {client?.custody_accounts_file ? (
                <PdfViewerDialog file={client.custody_accounts_file} />
              ) : (
                <label htmlFor="custody_accounts_file">
                  Upload Custody accounts file for the past 3 months
                </label>
              )}
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
              {client?.source_of_funds_file ? (
                <PdfViewerDialog file={client.source_of_funds_file} />
              ) : (
                <label htmlFor="source_of_funds_file">
                  Upload Source of funds for the past 3 months
                </label>
              )}
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
      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes("Salary Earnings") && ( */}
      {(values.sourceOfFunds?.includes("Salary Earnings") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Salary Earnings"))) && (
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
              {client?.confirmationLetter_file ? (
                <PdfViewerDialog file={client.confirmationLetter_file} />
              ) : (
                <label htmlFor="confirmationLetter_file">
                  Letter of confirmation from employer of income detailing the
                  amount of monthly salary
                </label>
              )}
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
              {client.payslips_file ? (
                <PdfViewerDialog file={client.payslips_file} />
              ) : (
                <label htmlFor="payslips_file">
                  Upload 3 months' recent payslips
                </label>
              )}
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
              {client.bank_statement_file ? (
                <PdfViewerDialog file={client.bank_statement_file} />
              ) : (
                <label htmlFor="bank_statement_file">
                  Upload Bank Statement for the past 3 months
                </label>
              )}
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
        </>
      )}
      {/* Dividend Income */}
      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes("Dividend Income") && ( */}
      {(values.sourceOfFunds?.includes("Dividend Income") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Dividend Income"))) && (
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
              {client?.due_diligence_file ? (
                <PdfViewerDialog file={client.due_diligence_file} />
              ) : (
                <label htmlFor="due_diligence_file">
                  Upload Due diligence documents on the entity from which the
                  client is obtaining the dividend income
                </label>
              )}
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
              {client?.financial_statements_file ? (
                <PdfViewerDialog file={client.financial_statements_file} />
              ) : (
                <label htmlFor="financial_statements_file">
                  Upload Annual financial statements of the business that
                  declared the dividend or any such proof of dividend pay-outs.
                </label>
              )}
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
      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes("Rental Income") && ( */}
      {(values.sourceOfFunds?.includes("Rental Income") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Rental Income"))) && (
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
              {client?.proof_of_ownership_file ? (
                <PdfViewerDialog file={client.proof_of_ownership_file} />
              ) : (
                <label htmlFor="proof_of_ownership_file">
                  Upload Proof of ownership of the asset being rented / leased;
                </label>
              )}
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
              {client?.lease_agreement_file ? (
                <PdfViewerDialog file={client.lease_agreement_file} />
              ) : (
                <label htmlFor="lease_agreement_file">
                  Upload Lease agreement;
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="lease_agreement_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("lease_agreement_file", e.currentTarget.files[0]);
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
              {client?.bank_statements_file ? (
                <PdfViewerDialog file={client.bank_statement_file} />
              ) : (
                <label htmlFor="bank_statements_file">
                  Upload Bank statements (over the recent 3 months) showing
                  receipt of funds from the lessee.
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bank_statements_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("bank_statements_file", e.currentTarget.files[0]);
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

      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes("Business Income") && ( */}
      {(values.sourceOfFunds?.includes("Business Income") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Business Income"))) && (
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
              {client?.cdd_documents_file ? (
                <PdfViewerDialog file={client.cdd_documents_file} />
              ) : (
                <label htmlFor="cdd_documents_file">
                  Upload CDD Documents on the legal entity from which profit is
                  being derived;
                </label>
              )}
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
              {client?.documentary_evidence_file ? (
                <PdfViewerDialog file={client.documentary_evidence_file} />
              ) : (
                <label htmlFor="documentary_evidence_file">
                  Upload Documentary evidence of link between legal entity and
                  the client;
                </label>
              )}
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
              {client?.bank_statement_file ? (
                <PdfViewerDialog file={client.bank_statement_file} />
              ) : (
                <label htmlFor="bank_statement_file">
                  Upload Bank statement showing receipt of funds provided from
                  business income (to the extent possible over the recent 3
                  months);
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bank_statement_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("bank_statement_file", e.currentTarget.files[0]);
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
              {client?.financial_statements_file ? (
                <PdfViewerDialog file={client.financial_statements_file} />
              ) : (
                <label htmlFor="financial_statements_file">
                  Upload Latest Audited financial statements of the entity.
                </label>
              )}
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
      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes("Proceeds from sale of property") && ( */}
      {(values.sourceOfFunds?.includes("Proceeds from sale of property") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes(
            "Proceeds from sale of property"
          ))) && (
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
              {client?.notarised_documents_file ? (
                <PdfViewerDialog file={client.notarised_documents_file} />
              ) : (
                <label htmlFor="notarised_documents_file">
                  Upload Notarised documents proving sale of property
                </label>
              )}
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
              {client?.bank_statement_proceeds_file ? (
                <PdfViewerDialog file={client.bank_statement_proceeds_file} />
              ) : (
                <label htmlFor="bank_statement_proceeds_file">
                  Upload Bank statement showing receipt of funds following
                  proceeds of sale
                </label>
              )}
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
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Donation") && ( */}
      {(values.sourceOfFunds?.includes("Donation") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Donation"))) && (
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
              {client?.donor_confirmation_file ? (
                <PdfViewerDialog file={client.donor_confirmation_file} />
              ) : (
                <label htmlFor="donor_confirmation_file">
                  Letter from donor confirming details of gift
                </label>
              )}
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
              {client?.donor_wealth_file ? (
                <PdfViewerDialog file={client.donor_wealth_file} />
              ) : (
                <label htmlFor="donor_wealth_file">
                  Upload Details and documentary evidence of the donor’s source
                  of wealth
                </label>
              )}
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
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Gift") && ( */}
      {(values.sourceOfFunds?.includes("Gift") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Gift"))) && (
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
              {client?.donor_confirmation_file ? (
                <PdfViewerDialog file={client.donor_confirmation_file} />
              ) : (
                <label htmlFor="donor_confirmation_file">
                  Letter from donor confirming details of gift
                </label>
              )}
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
              {client?.donor_wealth_file ? (
                <PdfViewerDialog file={client.donor_wealth_file} />
              ) : (
                <label htmlFor="donor_wealth_file">
                  Upload Details and documentary evidence of the donor’s source
                  of wealth
                </label>
              )}
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
              {client?.bank_statement_gift_file ? (
                <PdfViewerDialog file={client.bank_statement_gift_file} />
              ) : (
                <label htmlFor="bank_statement_gift_file">
                  Upload Bank statement showing receipt of funds
                </label>
              )}
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
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Lottery") && ( */}
      {(values.sourceOfFunds?.includes("Lottery") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Lottery"))) && (
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
              {client?.lottery_letter_file ? (
                <PdfViewerDialog file={client.lottery_letter_file} />
              ) : (
                <label htmlFor="lottery_letter_file">
                  Upload Letter from relevant organisation (Lottery headquarters
                  / betting shop / casino)
                </label>
              )}
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
              {client?.bank_statement_lottery_file ? (
                <PdfViewerDialog file={client.bank_statement_lottery_file} />
              ) : (
                <label htmlFor="bank_statement_lottery_file">
                  Upload Bank statement showing funds deposited including name
                  of the paying organisation
                </label>
              )}
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
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Creditor") && ( */}
      {(values.sourceOfFunds?.includes("Creditor") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Creditor"))) && (
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
              {client?.agreement_file ? (
                <PdfViewerDialog file={client.agreement_file} />
              ) : (
                <label htmlFor="agreement_file">
                  Agreement with regards to the arrangement in place
                </label>
              )}
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
              {client?.cdd_creditor_file ? (
                <PdfViewerDialog file={client.cdd_creditor_file} />
              ) : (
                <label htmlFor="cdd_creditor_file">
                  Upload CDD on creditor (applicable to non-regulated parties)
                </label>
              )}
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
              {client?.bank_statement_creditor_file ? (
                <PdfViewerDialog file={client.bank_statement_creditor_file} />
              ) : (
                <label htmlFor="bank_statement_creditor_file">
                  Upload Bank statement showing receipt of funds
                </label>
              )}
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
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Inheritance") && ( */}
      {(values.sourceOfFunds?.includes("Inheritance") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Inheritance"))) && (
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
              {client?.legal_document_inheritance_file ? (
                <PdfViewerDialog
                  file={client.legal_document_inheritance_file}
                />
              ) : (
                <label htmlFor="legal_document_inheritance_file">
                  Upload Legal document which must include the value of the
                  inheritance
                </label>
              )}
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
              {client?.notary_letter_inheritance_file ? (
                <PdfViewerDialog file={client.notary_letter_inheritance_file} />
              ) : (
                <label htmlFor="notary_letter_inheritance_file">
                  Upload Notary’s letter confirming inheritance details
                </label>
              )}
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
              {client?.executer_letter_inheritance_file ? (
                <PdfViewerDialog
                  file={client.executer_letter_inheritance_file}
                />
              ) : (
                <label htmlFor="executer_letter_inheritance_file">
                  Upload Executer’s letter confirming inheritance details
                </label>
              )}
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
      {client.sourceOfFunds &&
        client.sourceOfFunds.includes(
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
                {client?.loan_agreement_file ? (
                  <PdfViewerDialog file={client.loan_agreement_file} />
                ) : (
                  <label htmlFor="loan_agreement_file">
                    Upload Loan / Facility Agreement
                  </label>
                )}
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
                {client?.bank_statement_loan_file ? (
                  <PdfViewerDialog file={client.bank_statement_loan_file} />
                ) : (
                  <label htmlFor="bank_statement_loan_file">
                    Upload Bank statement showing receipt of funds
                  </label>
                )}
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
      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes(
          "Loan from related third parties (e.g., sister companies)"
        ) && ( */}
      {(values.sourceOfFunds?.includes(
        "Loan from related third parties (e.g., sister companies)"
      ) ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes(
            "Loan from related third parties (e.g., sister companies)"
          ))) && (
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
              {client?.loan_agreement_related_file ? (
                <PdfViewerDialog file={client.loan_agreement_related_file} />
              ) : (
                <label htmlFor="loan_agreement_related_file">
                  Upload Loan Agreement
                </label>
              )}
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
              {client?.cdd_third_party_related_file ? (
                <PdfViewerDialog file={client.cdd_third_party_related_file} />
              ) : (
                <label htmlFor="cdd_third_party_related_file">
                  Upload CDD on third party
                </label>
              )}
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
              {client?.bank_statement_loan_related_file ? (
                <PdfViewerDialog
                  file={client.bank_statement_loan_related_file}
                />
              ) : (
                <label htmlFor="bank_statement_loan_related_file">
                  Upload Bank statement showing receipt of funds
                </label>
              )}
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
      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes("Loan from unrelated third parties") && ( */}
      {(values.sourceOfFunds?.includes("Loan from unrelated third parties") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes(
            "Loan from unrelated third parties"
          ))) && (
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
              {client?.loan_agreement_unrelated_file ? (
                <PdfViewerDialog file={client.loan_agreement_unrelated_file} />
              ) : (
                <label htmlFor="loan_agreement_unrelated_file">
                  Upload Loan Agreement
                </label>
              )}
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
              {client?.cdd_third_party_unrelated_file ? (
                <PdfViewerDialog file={client.cdd_third_party_unrelated_file} />
              ) : (
                <label htmlFor="cdd_third_party_unrelated_file">
                  Upload CDD on third party
                </label>
              )}
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
              {client?.bank_statement_loan_unrelated_file ? (
                <PdfViewerDialog
                  file={client.bank_statement_loan_unrelated_file}
                />
              ) : (
                <label htmlFor="bank_statement_loan_unrelated_file">
                  Upload Bank statement showing receipt of funds
                </label>
              )}
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
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Real Estate") && ( */}
      {(values.sourceOfFunds?.includes("Real Estate") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Real Estate"))) && (
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
              {client?.notary_letter_real_estate_file ? (
                <PdfViewerDialog file={client.notary_letter_real_estate_file} />
              ) : (
                <label htmlFor="notary_letter_real_estate_file">
                  Upload Signed letter from Notary
                </label>
              )}
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
              {client?.sample_file ? (
                <PdfViewerDialog file={client.sample_file} />
              ) : (
                <label htmlFor="sample_file">
                  Upload Property Contract or any equivalent document
                </label>
              )}
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
      {/* {client.sourceOfFunds &&
        client.sourceOfFunds.includes("Insurance Pay-out") && ( */}
      {(values.sourceOfFunds?.includes("Insurance Pay-out") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Insurance Pay-out"))) && (
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
              {client?.insurance_payout_file ? (
                <PdfViewerDialog file={client.insurance_payout_file} />
              ) : (
                <label htmlFor="insurance_payout_file">
                  Upload Proof of remittance from the Insurance Policy pay-out
                  (from an approved licensed insurance company)
                </label>
              )}
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
            {touched.insurance_payout_file && errors.insurance_payout_file && (
              <div>{errors.insurance_payout_file}</div>
            )}
          </Box>
        </>
      )}
      {/* Retirement */}
      {/* {client.sourceOfFunds && client.sourceOfFunds.includes("Retirement") && ( */}
      {(values.sourceOfFunds?.includes("Retirement") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Retirement"))) && (
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
              {client?.retirement_annuity_file ? (
                <PdfViewerDialog file={client.retirement_annuity_file} />
              ) : (
                <label htmlFor="retirement_annuity_file">
                  Upload Retirement Annuity Fund Statement recent valuation
                  (from an approved licensed financial services provider)
                </label>
              )}
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
        // label="From which country does the source of funds come from?"
        label={`From which country does the source of funds come from?: ${
          client.countrySourceFunds || ""
        }`}
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
        // label="What is the net annual income?"
        label={`What is the net annual income?: ${
          client.netAnnualIncome || ""
        }`}
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
        // label="What is the estimated Net Worth?"
        label={`What is the estimated Net Worth?: ${
          client.estimatedNetWorth || ""
        }`}
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
