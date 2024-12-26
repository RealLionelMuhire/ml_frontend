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
import DocumentUploadField from "../../utils/DocumentUploadField";

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
          <DocumentUploadField
            label="Letter of confirmation from employer of income detailing the amount of monthly salary"
            name="confirmationLetter_file"
            value={values.confirmationLetter_file}
            error={errors.confirmationLetter_file}
            touched={touched.confirmationLetter_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload 3 months' recent payslips"
            name="payslips_file"
            value={values.payslips_file}
            error={errors.payslips_file}
            touched={touched.payslips_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank Statement for the past 3 months"
            name="bank_statement_file"
            value={values.bank_statement_file}
            error={errors.bank_statement_file}
            touched={touched.bank_statement_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Salary Earnings") ||
        (!values.sourceOfFunds &&
          client.sourceOfFunds?.includes("Salary Earnings"))) && (
        <>
        <DocumentUploadField
          label="Letter of confirmation from employer of income detailing the amount of monthly salary"
          name="confirmationLetter_file"
          value={values.confirmationLetter_file}
          error={errors.confirmationLetter_file}
          touched={touched.confirmationLetter_file}
          setFieldValue={setFieldValue}
          client={client}
          accept=".pdf"
        />
        <DocumentUploadField
          label="Upload 3 months' recent payslips"
          name="payslips_file"
          value={values.payslips_file}
          error={errors.payslips_file}
          touched={touched.payslips_file}
          setFieldValue={setFieldValue}
          client={client}
          accept=".pdf"
        />
        <DocumentUploadField
          label="Upload Bank Statement for the past 3 months"
          name="bank_statement_file"
          value={values.bank_statement_file}
          error={errors.bank_statement_file}
          touched={touched.bank_statement_file}
          setFieldValue={setFieldValue}
          client={client}

          accept=".pdf"
        />
        </>
      )}
      {(values.sourceOfFunds?.includes("Dividend Income") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Dividend Income"))) && (
        <>
          <DocumentUploadField
            label="Upload Due diligence documents on the entity from which the client is obtaining the dividend income"
            name="due_diligence_file"
            value={values.due_diligence_file}
            error={errors.due_diligence_file}
            touched={touched.due_diligence_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Annual financial statements of the business that declared the dividend or any such proof of dividend pay-outs."
            name="financial_statements_file"
            value={values.financial_statements_file}
            error={errors.financial_statements_file}
            touched={touched.financial_statements_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Rental Income") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Rental Income"))) && (
        <>
          <DocumentUploadField
            label="Upload Proof of ownership of the asset being rented / leased"
            name="proof_of_ownership_file"
            value={values.proof_of_ownership_file}
            error={errors.proof_of_ownership_file}
            touched={touched.proof_of_ownership_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Lease agreement"
            name="lease_agreement_file"
            value={values.lease_agreement_file}
            error={errors.lease_agreement_file}
            touched={touched.lease_agreement_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statements (over the recent 3 months) showing receipt of funds from the lessee"
            name="bank_statements_file"
            value={values.bank_statements_file}
            error={errors.bank_statements_file}
            touched={touched.bank_statements_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Business Income") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Business Income"))) && (
        <>
          <DocumentUploadField
            label="Upload CDD Documents on the legal entity from which profit is being derived"
            name="cdd_documents_file"
            value={values.cdd_documents_file}
            error={errors.cdd_documents_file}
            touched={touched.cdd_documents_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Documentary evidence of link between legal entity and the client"
            name="documentary_evidence_file"
            value={values.documentary_evidence_file}
            error={errors.documentary_evidence_file}
            touched={touched.documentary_evidence_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing receipt of funds provided from business income (to the extent possible over the recent 3 months)"
            name="bank_statement_file"
            value={values.bank_statement_file}
            error={errors.bank_statement_file}
            touched={touched.bank_statement_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Latest Audited financial statements of the entity"
            name="financial_statements_file"
            value={values.financial_statements_file}
            error={errors.financial_statements_file}
            touched={touched.financial_statements_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Proceeds from sale of property") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Proceeds from sale of property"))) && (
        <>
          <DocumentUploadField
            label="Upload Notarised documents proving sale of property"
            name="notarised_documents_file"
            value={values.notarised_documents_file}
            error={errors.notarised_documents_file}
            touched={touched.notarised_documents_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing receipt of funds following proceeds of sale"
            name="bank_statement_proceeds_file"
            value={values.bank_statement_proceeds_file}
            error={errors.bank_statement_proceeds_file}
            touched={touched.bank_statement_proceeds_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Donation") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Donation"))) && (
        <>
          <DocumentUploadField
            label="Letter from donor confirming details of gift"
            name="donor_confirmation_file"
            value={values.donor_confirmation_file}
            error={errors.donor_confirmation_file}
            touched={touched.donor_confirmation_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Details and documentary evidence of the donor’s source of wealth"
            name="donor_wealth_file"
            value={values.donor_wealth_file}
            error={errors.donor_wealth_file}
            touched={touched.donor_wealth_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Gift") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Gift"))) && (
        <>
          <DocumentUploadField
            label="Letter from donor confirming details of gift"
            name="donor_confirmation_file"
            value={values.donor_confirmation_file}
            error={errors.donor_confirmation_file}
            touched={touched.donor_confirmation_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Details and documentary evidence of the donor’s source of wealth"
            name="donor_wealth_file"
            value={values.donor_wealth_file}
            error={errors.donor_wealth_file}
            touched={touched.donor_wealth_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_gift_file"
            value={values.bank_statement_gift_file}
            error={errors.bank_statement_gift_file}
            touched={touched.bank_statement_gift_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Lottery") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Lottery"))) && (
        <>
          <DocumentUploadField
            label="Upload Letter from relevant organisation (Lottery headquarters / betting shop / casino)"
            name="lottery_letter_file"
            value={values.lottery_letter_file}
            error={errors.lottery_letter_file}
            touched={touched.lottery_letter_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing funds deposited including name of the paying organisation"
            name="bank_statement_lottery_file"
            value={values.bank_statement_lottery_file}
            error={errors.bank_statement_lottery_file}
            touched={touched.bank_statement_lottery_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Creditor") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Creditor"))) && (
        <>
          <DocumentUploadField
            label="Agreement with regards to the arrangement in place"
            name="agreement_file"
            value={values.agreement_file}
            error={errors.agreement_file}
            touched={touched.agreement_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload CDD on creditor (applicable to non-regulated parties)"
            name="cdd_creditor_file"
            value={values.cdd_creditor_file}
            error={errors.cdd_creditor_file}
            touched={touched.cdd_creditor_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_creditor_file"
            value={values.bank_statement_creditor_file}
            error={errors.bank_statement_creditor_file}
            touched={touched.bank_statement_creditor_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Inheritance") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Inheritance"))) && (
        <>
          <DocumentUploadField
            label="Upload Legal document which must include the value of the inheritance"
            name="legal_document_inheritance_file"
            value={values.legal_document_inheritance_file}
            error={errors.legal_document_inheritance_file}
            touched={touched.legal_document_inheritance_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Notary’s letter confirming inheritance details"
            name="notary_letter_inheritance_file"
            value={values.notary_letter_inheritance_file}
            error={errors.notary_letter_inheritance_file}
            touched={touched.notary_letter_inheritance_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Executer’s letter confirming inheritance details"
            name="executer_letter_inheritance_file"
            value={values.executer_letter_inheritance_file}
            error={errors.executer_letter_inheritance_file}
            touched={touched.executer_letter_inheritance_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Loans from Banks or other Financial Institution") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Loans from Banks or other Financial Institution"))) && (
        <>
          <DocumentUploadField
            label="Upload Loan / Facility Agreement"
            name="loan_agreement_file"
            value={values.loan_agreement_file}
            error={errors.loan_agreement_file}
            touched={touched.loan_agreement_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_loan_file"
            value={values.bank_statement_loan_file}
            error={errors.bank_statement_loan_file}
            touched={touched.bank_statement_loan_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Loan from related third parties (e.g., sister companies)") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Loan from related third parties (e.g., sister companies)"))) && (
        <>
          <DocumentUploadField
            label="Upload Loan Agreement"
            name="loan_agreement_related_file"
            value={values.loan_agreement_related_file}
            error={errors.loan_agreement_related_file}
            touched={touched.loan_agreement_related_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload CDD on third party"
            name="cdd_third_party_related_file"
            value={values.cdd_third_party_related_file}
            error={errors.cdd_third_party_related_file}
            touched={touched.cdd_third_party_related_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_loan_related_file"
            value={values.bank_statement_loan_related_file}
            error={errors.bank_statement_loan_related_file}
            touched={touched.bank_statement_loan_related_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Loan from unrelated third parties") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Loan from unrelated third parties"))) && (
        <>
          <DocumentUploadField
            label="Upload Loan Agreement"
            name="loan_agreement_unrelated_file"
            value={values.loan_agreement_unrelated_file}
            error={errors.loan_agreement_unrelated_file}
            touched={touched.loan_agreement_unrelated_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload CDD on third party"
            name="cdd_third_party_unrelated_file"
            value={values.cdd_third_party_unrelated_file}
            error={errors.cdd_third_party_unrelated_file}
            touched={touched.cdd_third_party_unrelated_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_loan_unrelated_file"
            value={values.bank_statement_loan_unrelated_file}
            error={errors.bank_statement_loan_unrelated_file}
            touched={touched.bank_statement_loan_unrelated_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Real Estate") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Real Estate"))) && (
        <>
          <DocumentUploadField
            label="Upload Signed letter from Notary"
            name="notary_letter_real_estate_file"
            value={values.notary_letter_real_estate_file}
            error={errors.notary_letter_real_estate_file}
            touched={touched.notary_letter_real_estate_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
          <DocumentUploadField
            label="Upload Property Contract or any equivalent document"
            name="property_contract_file"
            value={values.property_contract_file}
            error={errors.property_contract_file}
            touched={touched.property_contract_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
          />
        </>
      )}
      {(values.sourceOfFunds?.includes("Insurance Pay-out") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Insurance Pay-out"))) && (
        <DocumentUploadField
          label="Upload Proof of remittance from the Insurance Policy pay-out (from an approved licensed insurance company)"
          name="insurance_payout_file"
          value={values.insurance_payout_file}
          error={errors.insurance_payout_file}
          touched={touched.insurance_payout_file}
          setFieldValue={setFieldValue}
          client={client}
          accept=".pdf"
        />
      )}
      {(values.sourceOfFunds?.includes("Retirement") ||
        (!values.sourceOfFunds && client.sourceOfFunds?.includes("Retirement"))) && (
        <DocumentUploadField
          label="Upload Retirement Annuity Fund Statement recent valuation (from an approved licensed financial services provider)"
          name="retirement_annuity_file"
          value={values.retirement_annuity_file}
          error={errors.retirement_annuity_file}
          touched={touched.retirement_annuity_file}
          setFieldValue={setFieldValue}
          client={client}
          accept=".pdf"
        />
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
        sx={{ gridColumn: "span 2" }}
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
