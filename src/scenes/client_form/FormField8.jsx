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
import FileUploadField from "../../utils/FileUploadField";

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
        <FileUploadField
          label="Upload Bank Statement for the past 3 months"
          name="bank_statement_file"
          value={Array.isArray(values.bank_statement_file) ? values.bank_statement_file : []}
          error={errors.bank_statement_file}
          touched={touched.bank_statement_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Custody accounts file for the past 3 months"
          name="custody_accounts_file"
          value={Array.isArray(values.custody_accounts_file) ? values.custody_accounts_file : []}
          error={errors.custody_accounts_file}
          touched={touched.custody_accounts_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Source of funds for the past 3 months"
          name="source_of_funds_file"
          value={Array.isArray(values.source_of_funds_file) ? values.source_of_funds_file : []}
          error={errors.source_of_funds_file}
          touched={touched.source_of_funds_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        </>
      )}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Salary Earnings") && (
          <>
          <FileUploadField
            label="Letter of confirmation from employer of income detailing the amount of monthly salary"
            name="confirmationLetter_file"
            value={Array.isArray(values.confirmationLetter_file) ? values.confirmationLetter_file : []}
            error={errors.confirmationLetter_file}
            touched={touched.confirmationLetter_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload 3 months' recent payslips"
            name="payslips_file"
            value={Array.isArray(values.payslips_file) ? values.payslips_file : []}
            error={errors.payslips_file}
            touched={touched.payslips_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Bank Statement for the past 3 months"
            name="bank_statement_file"
            value={Array.isArray(values.bank_statement_file) ? values.bank_statement_file : []}
            error={errors.bank_statement_file}
            touched={touched.bank_statement_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          </>
        )}
      {/* Dividend Income */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Dividend Income") && (
          <>
          <FileUploadField
            label="Upload Due diligence documents on the entity from which the client is obtaining the dividend income"
            name="due_diligence_file"
            value={Array.isArray(values.due_diligence_file) ? values.due_diligence_file : []}
            error={errors.due_diligence_file}
            touched={touched.due_diligence_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Annual financial statements of the business that declared the dividend or any such proof of dividend pay-outs."
            name="financial_statements_file"
            value={Array.isArray(values.financial_statements_file) ? values.financial_statements_file : []}
            error={errors.financial_statements_file}
            touched={touched.financial_statements_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
            
          </>
        )}
      {/* Rental Income */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Rental Income") && (
          <>
          <FileUploadField
            label="Upload Proof of ownership of the asset being rented / leased"
            name="proof_of_ownership_file"
            value={Array.isArray(values.proof_of_ownership_file) ? values.proof_of_ownership_file : []}
            error={errors.proof_of_ownership_file}
            touched={touched.proof_of_ownership_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Lease agreement"
            name="lease_agreement_file"
            value={Array.isArray(values.lease_agreement_file) ? values.lease_agreement_file : []}
            error={errors.lease_agreement_file}
            touched={touched.lease_agreement_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Bank statements (over the recent 3 months) showing receipt of funds from the lessee"
            name="bank_statements_file"
            value={Array.isArray(values.bank_statements_file) ? values.bank_statements_file : []}
            error={errors.bank_statements_file}
            touched={touched.bank_statements_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          </>
        )}
      {/* Business Income */}

      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Business Income") && (
          <>
          <FileUploadField
            label="Upload CDD Documents on the legal entity from which profit is being derived"
            name="cdd_documents_file"
            value={Array.isArray(values.cdd_documents_file) ? values.cdd_documents_file : []}
            error={errors.cdd_documents_file}
            touched={touched.cdd_documents_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Documentary evidence of link between legal entity and the client"
            name="documentary_evidence_file"
            value={Array.isArray(values.documentary_evidence_file) ? values.documentary_evidence_file : []}
            error={errors.documentary_evidence_file}
            touched={touched.documentary_evidence_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Bank statement showing receipt of funds provided from business income (to the extent possible over the recent 3 months)"
            name="bank_statement_file"
            value={Array.isArray(values.bank_statement_file) ? values.bank_statement_file : []}
            error={errors.bank_statement_file}
            touched={touched.bank_statement_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Latest Audited financial statements of the entity"
            name="financial_statements_file"
            value={Array.isArray(values.financial_statements_file) ? values.financial_statements_file : []}
            error={errors.financial_statements_file}
            touched={touched.financial_statements_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
            
          </>
        )}
      {/* Proceeds from sale of property */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Proceeds from sale of property") && (
          <>
          <FileUploadField
            label="Upload Notarised documents proving sale of property"
            name="notarised_documents_file"
            value={Array.isArray(values.notarised_documents_file) ? values.notarised_documents_file : []}
            error={errors.notarised_documents_file}
            touched={touched.notarised_documents_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Bank statement showing receipt of funds following proceeds of sale"
            name="bank_statement_proceeds_file"
            value={Array.isArray(values.bank_statement_proceeds_file) ? values.bank_statement_proceeds_file : []}
            error={errors.bank_statement_proceeds_file}
            touched={touched.bank_statement_proceeds_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
            
          </>
        )}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Donation") && (
        <>
          <FileUploadField
            label="Letter from donor confirming details of gift"
            name="donor_confirmation_file"
            value={Array.isArray(values.donor_confirmation_file) ? values.donor_confirmation_file : []}
            error={errors.donor_confirmation_file}
            touched={touched.donor_confirmation_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Details and documentary evidence of the donor’s source of wealth"
            name="donor_wealth_file"
            value={Array.isArray(values.donor_wealth_file) ? values.donor_wealth_file : []}
            error={errors.donor_wealth_file}
            touched={touched.donor_wealth_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
        </>
      )}  
      {/* gift */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Gift") && (
        <>
        <FileUploadField
          label="Letter from donor confirming details of gift"
          name="donor_confirmation_file"
          value={Array.isArray(values.donor_confirmation_file) ? values.donor_confirmation_file : []}
          error={errors.donor_confirmation_file}
          touched={touched.donor_confirmation_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Details and documentary evidence of the donor’s source of wealth"
          name="donor_wealth_file"
          value={Array.isArray(values.donor_wealth_file) ? values.donor_wealth_file : []}
          error={errors.donor_wealth_file}
          touched={touched.donor_wealth_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Bank statement showing receipt of funds"
          name="bank_statement_gift_file"
          value={Array.isArray(values.bank_statement_gift_file) ? values.bank_statement_gift_file : []}
          error={errors.bank_statement_gift_file}
          touched={touched.bank_statement_gift_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        </>
      )}
      {/* lottery */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Lottery") && (
        <>
        <FileUploadField
          label="Upload Letter from relevant organisation (Lottery headquarters / betting shop / casino)"
          name="lottery_letter_file"
          value={Array.isArray(values.lottery_letter_file) ? values.lottery_letter_file : []}
          error={errors.lottery_letter_file}
          touched={touched.lottery_letter_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Bank statement showing funds deposited including name of the paying organisation"
          name="bank_statement_lottery_file"
          value={Array.isArray(values.bank_statement_lottery_file) ? values.bank_statement_lottery_file : []}
          error={errors.bank_statement_lottery_file}
          touched={touched.bank_statement_lottery_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
          
        </>
      )}
      {/* creditor */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Creditor") && (
        <>
        <FileUploadField
          label="Agreement with regards to the arrangement in place"
          name="agreement_file"
          value={Array.isArray(values.agreement_file) ? values.agreement_file : []}
          error={errors.agreement_file}
          touched={touched.agreement_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload CDD on creditor (applicable to non-regulated parties)"
          name="cdd_creditor_file"
          value={Array.isArray(values.cdd_creditor_file) ? values.cdd_creditor_file : []}
          error={errors.cdd_creditor_file}
          touched={touched.cdd_creditor_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Bank statement showing receipt of funds"
          name="bank_statement_creditor_file"
          value={Array.isArray(values.bank_statement_creditor_file) ? values.bank_statement_creditor_file : []}
          error={errors.bank_statement_creditor_file}
          touched={touched.bank_statement_creditor_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
          
        </>
      )}
      {/* inheritance */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Inheritance") && (
        <>
        <FileUploadField
          label="Upload Legal document which must include the value of the inheritance"
          name="legal_document_inheritance_file"
          value={Array.isArray(values.legal_document_inheritance_file) ? values.legal_document_inheritance_file : []}
          error={errors.legal_document_inheritance_file}
          touched={touched.legal_document_inheritance_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Notary’s letter confirming inheritance details"
          name="notary_letter_inheritance_file"
          value={Array.isArray(values.notary_letter_inheritance_file) ? values.notary_letter_inheritance_file : []}
          error={errors.notary_letter_inheritance_file}
          touched={touched.notary_letter_inheritance_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Executer’s letter confirming inheritance details"
          name="executer_letter_inheritance_file"
          value={Array.isArray(values.executer_letter_inheritance_file) ? values.executer_letter_inheritance_file : []}
          error={errors.executer_letter_inheritance_file}
          touched={touched.executer_letter_inheritance_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
          
        </>
      )}
      {/* loans from banks or any other financial institutions */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes(
          "Loans from Banks or other Financial Institution"
        ) && (
          <>
          <FileUploadField
            label="Upload Loan / Facility Agreement"
            name="loan_agreement_file"
            value={Array.isArray(values.loan_agreement_file) ? values.loan_agreement_file : []}
            error={errors.loan_agreement_file}
            touched={touched.loan_agreement_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_loan_file"
            value={Array.isArray(values.bank_statement_loan_file) ? values.bank_statement_loan_file : []}
            error={errors.bank_statement_loan_file}
            touched={touched.bank_statement_loan_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          </>
        )}
      {/* Loan from related third parties (e.g., sister companies) */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes(
          "Loan from related third parties (e.g., sister companies)"
        ) && (
          <>
          <FileUploadField
            label="Upload Loan Agreement"
            name="loan_agreement_related_file"
            value={Array.isArray(values.loan_agreement_related_file) ? values.loan_agreement_related_file : []}
            error={errors.loan_agreement_related_file}
            touched={touched.loan_agreement_related_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload CDD on third party"
            name="cdd_third_party_related_file"
            value={Array.isArray(values.cdd_third_party_related_file) ? values.cdd_third_party_related_file : []}
            error={errors.cdd_third_party_related_file}
            touched={touched.cdd_third_party_related_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_loan_related_file"
            value={Array.isArray(values.bank_statement_loan_related_file) ? values.bank_statement_loan_related_file : []}
            error={errors.bank_statement_loan_related_file}
            touched={touched.bank_statement_loan_related_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          </>
        )}
      {/* Loan from unrelated third parties */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Loan from unrelated third parties") && (
          <>
          <FileUploadField
            label="Upload Loan Agreement"
            name="loan_agreement_unrelated_file"
            value={Array.isArray(values.loan_agreement_unrelated_file) ? values.loan_agreement_unrelated_file : []}
            error={errors.loan_agreement_unrelated_file}
            touched={touched.loan_agreement_unrelated_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload CDD on third party"
            name="cdd_third_party_unrelated_file"
            value={Array.isArray(values.cdd_third_party_unrelated_file) ? values.cdd_third_party_unrelated_file : []}
            error={errors.cdd_third_party_unrelated_file}
            touched={touched.cdd_third_party_unrelated_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Upload Bank statement showing receipt of funds"
            name="bank_statement_loan_unrelated_file"
            value={Array.isArray(values.bank_statement_loan_unrelated_file) ? values.bank_statement_loan_unrelated_file : []}
            error={errors.bank_statement_loan_unrelated_file}
            touched={touched.bank_statement_loan_unrelated_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          </>
        )}
      {/* Real Estate */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Real Estate") && (
        <>
        <FileUploadField
          label="Upload Signed letter from Notary"
          name="notary_letter_real_estate_file"
          value={Array.isArray(values.notary_letter_real_estate_file) ? values.notary_letter_real_estate_file : []}
          error={errors.notary_letter_real_estate_file}
          touched={touched.notary_letter_real_estate_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Upload Property Contract or any equivalent document"
          name="property_contract_file"
          value={Array.isArray(values.property_contract_file) ? values.property_contract_file : []}
          error={errors.property_contract_file}
          touched={touched.property_contract_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        </>
      )}
      {/* Insurance */}
      {values.sourceOfFunds &&
        values.sourceOfFunds.includes("Insurance Pay-out") && (
          <>
          <FileUploadField
            label="Upload Proof of remittance from the Insurance Policy pay-out (from an approved licensed insurance company)"
            name="insurance_payout_file"
            value={Array.isArray(values.insurance_payout_file) ? values.insurance_payout_file : []}
            error={errors.insurance_payout_file}
            touched={touched.insurance_payout_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          </>
        )}
      {/* Retirement */}
      {values.sourceOfFunds && values.sourceOfFunds.includes("Retirement") && (
        <>
        <FileUploadField
          label="Upload Retirement Annuity Fund Statement recent valuation (from an approved licensed financial services provider)"
          name="retirement_annuity_file"
          value={Array.isArray(values.retirement_annuity_file) ? values.retirement_annuity_file : []}
          error={errors.retirement_annuity_file}
          touched={touched.retirement_annuity_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
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
        sx={{ gridColumn: "span 2" }}
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
