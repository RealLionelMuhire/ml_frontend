import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import FileUploadField from "../../utils/FileUploadField";

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
      {values.RelationshipWithApplicant === "individual" && (
        <>
          <FileUploadField
            label="Current Valid Passport or National Identity Card"
            name="passport_file"
            value={Array.isArray(values.passport_file) ? values.passport_file : []}
            error={errors.passport_file}
            touched={touched.passport_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Utility bill dated less than 3 months confirming the permanent residential address"
            name="utility_file"
            value={Array.isArray(values.utility_file) ? values.utility_file : []}
            error={errors.utility_file}
            touched={touched.utility_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Bank reference on the client from a reputable Bank/professional reference in case the person is a Politically Exposed Person (PEP)"
            name="bank_file"
            value={Array.isArray(values.bank_file) ? values.bank_file : []}
            error={errors.bank_file}
            touched={touched.bank_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Proof of source of funds (please refer to Part B below)"
            name="funds_file"
            value={Array.isArray(values.funds_file) ? values.funds_file : []}
            error={errors.funds_file}
            touched={touched.funds_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Proof of source of wealth (if applicable in case of high risk clients, high net worth clients, PEP, hit found on the concerned persons)"
            name="wealth_file"
            value={Array.isArray(values.wealth_file) ? values.wealth_file : []}
            error={errors.wealth_file}
            touched={touched.wealth_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          <FileUploadField
            label="Recent professional reference in case the person is a Politically Exposed Person (PEP) (as a measure of EDD)"
            name="professionalReference_file"
            value={Array.isArray(values.professionalReference_file) ? values.professionalReference_file : []}
            error={errors.professionalReference_file}
            touched={touched.professionalReference_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
          {/* Recent professional reference in case the person is a Politically Exposed Person (PEP) (as a measure of EDD) */}
          
          <FileUploadField
            label="Latest audited financial accounts"
            name="financialAccounts_file"
            value={Array.isArray(values.financialAccounts_file) ? values.financialAccounts_file : []}
            error={errors.financialAccounts_file}
            touched={touched.financialAccounts_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
        </>
      )}

      {values.RelationshipWithApplicant === "legal entity" && (
        <>
          <FileUploadField
            label="Certificate of incorporation"
            name="incorporation_file"
            value={Array.isArray(values.incorporation_file) ? values.incorporation_file : []}
            error={errors.incorporation_file}
            touched={touched.incorporation_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
          />
            <FileUploadField
            label="Certificate of good standing or incumbency (if hit has been recorded on the legal entity)"
            name="goodStanding_file"
            value={Array.isArray(values.goodStanding_file) ? values.goodStanding_file : []}
            error={errors.goodStanding_file}
            touched={touched.goodStanding_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Constitution or memorandum and articles of association"
            name="constitution_file"
            value={Array.isArray(values.constitution_file) ? values.constitution_file : []}
            error={errors.constitution_file}
            touched={touched.constitution_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Business plan with details of the group structure, the nature of business and countries of operation"
            name="businessPlan_file"
            value={Array.isArray(values.businessPlan_file) ? values.businessPlan_file : []}
            error={errors.businessPlan_file}
            touched={touched.businessPlan_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Details of registered office and place of business"
            name="registeredOffice_file"
            value={Array.isArray(values.registeredOffice_file) ? values.registeredOffice_file : []}
            error={errors.registeredOffice_file}
            touched={touched.registeredOffice_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Register of shareholders and directors"
            name="shareholders_file"
            value={Array.isArray(values.shareholders_file) ? values.shareholders_file : []}
            error={errors.shareholders_file}
            touched={touched.shareholders_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Latest audited financial accounts"
            name="financialStatements_file"
            value={Array.isArray(values.financialStatements_file) ? values.financialStatements_file : []}
            error={errors.financialStatements_file}
            touched={touched.financialStatements_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Identification documents of the principals of the company (shareholders, ultimate beneficial owners, promoters, officers and at least 2 directors)"
            name="principals_identification_file"
            value={Array.isArray(values.principals_identification_file) ? values.principals_identification_file : []}
            error={errors.principals_identification_file}
            touched={touched.principals_identification_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Proof of source of funds (please refer to Part B below)"
            name="source_of_funds_file"
            value={Array.isArray(values.source_of_funds_file) ? values.source_of_funds_file : []}
            error={errors.source_of_funds_file}
            touched={touched.source_of_funds_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
            <FileUploadField
            label="Proof of source of wealth (if applicable in case of high risk clients, high net worth clients, PEP, hit found on the concerned persons)"
            name="source_of_wealth_file"
            value={Array.isArray(values.source_of_wealth_file) ? values.source_of_wealth_file : []}
            error={errors.source_of_wealth_file}
            touched={touched.source_of_wealth_file}
            setFieldValue={setFieldValue}
            accept=".pdf"
            />
        </>
      )}
      {values.RelationshipWithApplicant === "Trust" && (
        <>
          <FileUploadField
          label="Declaration of Trust or Trust Deed"
          name="declaration_of_trust_file"
          value={Array.isArray(values.declaration_of_trust_file) ? values.declaration_of_trust_file : []}
          error={errors.declaration_of_trust_file}
          touched={touched.declaration_of_trust_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Deed of Retirement and Appointment of Trustee, beneficiary, etc (if applicable)"
          name="deed_of_retirement_file"
          value={Array.isArray(values.deed_of_retirement_file) ? values.deed_of_retirement_file : []}
          error={errors.deed_of_retirement_file}
          touched={touched.deed_of_retirement_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Certificate of Registration (if available)"
          name="certificate_of_registration_file"
          value={Array.isArray(values.certificate_of_registration_file) ? values.certificate_of_registration_file : []}
          error={errors.certificate_of_registration_file}
          touched={touched.certificate_of_registration_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Business plan with details of the group structure, the nature of business and countries of operation"
          name="business_plan_file"
          value={Array.isArray(values.business_plan_file) ? values.business_plan_file : []}
          error={errors.business_plan_file}
          touched={touched.business_plan_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Details of registered office and place of business"
          name="registered_office_file"
          value={Array.isArray(values.registered_office_file) ? values.registered_office_file : []}
          error={errors.registered_office_file}
          touched={touched.registered_office_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Register of trustee, settlor, protector, enforcer, beneficiaries, ultimate beneficial owner"
          name="register_of_trustee_file"
          value={Array.isArray(values.register_of_trustee_file) ? values.register_of_trustee_file : []}
          error={errors.register_of_trustee_file}
          touched={touched.register_of_trustee_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Proof of source of funds (please refer to Part B below)"
          name="proof_of_source_of_funds_file"
          value={Array.isArray(values.proof_of_source_of_funds_file) ? values.proof_of_source_of_funds_file : []}
          error={errors.proof_of_source_of_funds_file}
          touched={touched.proof_of_source_of_funds_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Proof of source of wealth (if applicable)"
          name="proof_of_source_of_wealth_file"
          value={Array.isArray(values.proof_of_source_of_wealth_file) ? values.proof_of_source_of_wealth_file : []}
          error={errors.proof_of_source_of_wealth_file}
          touched={touched.proof_of_source_of_wealth_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
          <FileUploadField
          label="Latest accounts or bank statements"
          name="latest_accounts_or_bank_statements_file"
          value={Array.isArray(values.latest_accounts_or_bank_statements_file) ? values.latest_accounts_or_bank_statements_file : []}
          error={errors.latest_accounts_or_bank_statements_file}
          touched={touched.latest_accounts_or_bank_statements_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
          />
        </>
      )}

      {values.RelationshipWithApplicant === "Foundation" && (
        <>
        <FileUploadField
          label="Certificate of Registration"
          name="certificate_of_registration_file"
          value={Array.isArray(values.certificate_of_registration_file) ? values.certificate_of_registration_file : []}
          error={errors.certificate_of_registration_file}
          touched={touched.certificate_of_registration_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Licence (if any)"
          name="licence_file"
          value={Array.isArray(values.licence_file) ? values.licence_file : []}
          error={errors.licence_file}
          touched={touched.licence_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Certificate of incumbency (if hit has been recorded on the Foundation)"
          name="certificate_of_incumbency_file"
          value={Array.isArray(values.certificate_of_incumbency_file) ? values.certificate_of_incumbency_file : []}
          error={errors.certificate_of_incumbency_file}
          touched={touched.certificate_of_incumbency_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Charter"
          name="charter_file"
          value={Array.isArray(values.charter_file) ? values.charter_file : []}
          error={errors.charter_file}
          touched={touched.charter_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Business plan with details of the group structure, the nature of business and countries of operation"
          name="business_plan_file"
          value={Array.isArray(values.business_plan_file) ? values.business_plan_file : []}
          error={errors.business_plan_file}
          touched={touched.business_plan_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Details of registered office and place of business"
          name="registered_office_and_place_of_business_file"
          value={Array.isArray(values.registered_office_and_place_of_business_file) ? values.registered_office_and_place_of_business_file : []}
          error={errors.registered_office_and_place_of_business_file}
          touched={touched.registered_office_and_place_of_business_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Register of Council members"
          name="register_of_council_members_file"
          value={Array.isArray(values.register_of_council_members_file) ? values.register_of_council_members_file : []}
          error={errors.register_of_council_members_file}
          touched={touched.register_of_council_members_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Latest accounts Bank statements"
          name="latest_accounts_file"
          value={Array.isArray(values.latest_accounts_file) ? values.latest_accounts_file : []}
          error={errors.latest_accounts_file}
          touched={touched.latest_accounts_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Identification documents of the principals of the Foundation (Founder, Beneficiary / Ultimate Beneficial Owner and Council Members)"
          name="identification_documents_of_the_principals_of_the_foundation_file"
          value={Array.isArray(values.identification_documents_of_the_principals_of_the_foundation_file) ? values.identification_documents_of_the_principals_of_the_foundation_file : []}
          error={errors.identification_documents_of_the_principals_of_the_foundation_file}
          touched={touched.identification_documents_of_the_principals_of_the_foundation_file}
          setFieldValue={setFieldValue}
          accept=".pdf"
        />
        <FileUploadField
          label="Proof of source of funds"
          name="proof_of_source_of_funds_file"
          value={Array.isArray(values.proof_of_source_of_funds_file) ? values.proof_of_source_of_funds_file : []}
          error={errors.proof_of_source_of_funds_file}
          touched={touched.proof_of_source_of_funds_file}
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
