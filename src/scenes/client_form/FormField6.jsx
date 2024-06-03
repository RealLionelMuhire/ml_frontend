import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
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
      {values.RelationshipWithApplicant === "individual" && (
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
            <Typography variant="h6">
              {values.passport_file ? (
                values.passport_file.name
              ) : (
                <label htmlFor="passport_file">
                  Current Valid Passport or National Identity Card
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="passport_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("passport_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.passport_file && errors.passport_file && (
              <div>{errors.passport_file}</div>
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
            <Typography variant="h6">
              {values.utility_file ? (
                values.utility_file.name
              ) : (
                <label htmlFor="utility_file">
                  Utility bill dated less than 3 months confirming the permanent
                  residential address
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="utility_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("utility_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.utility_file && errors.utility_file && (
              <div>{errors.utility_file}</div>
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
            <Typography variant="h6">
              {values.bank_file ? (
                values.bank_file.name
              ) : (
                <label htmlFor="bank_file">
                  Bank reference on the client from a reputable
                  Bank/professional reference in case the person is a
                  Politically Exposed Person (PEP)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bank_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("bank_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.bank_file && errors.bank_file && (
              <div>{errors.bank_file}</div>
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
            <Typography variant="h6">
              {values.cv_file ? (
                values.cv_file.name
              ) : (
                <label htmlFor="cv_file">Updated Curriculum Vitae</label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="cv_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("cv_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.cv_file && errors.cv_file && <div>{errors.cv_file}</div>}
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
            <Typography variant="h6">
              {values.funds_file ? (
                values.funds_file.name
              ) : (
                <label htmlFor="funds_file">
                  Proof of source of funds (please refer to Part B below)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="funds_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("funds_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.funds_file && errors.funds_file && (
              <div>{errors.funds_file}</div>
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
            <Typography variant="h6">
              {values.wealth_file ? (
                values.wealth_file.name
              ) : (
                <label htmlFor="wealth_file">
                  Proof of source of wealth (if applicable in case of high risk
                  clients, high net worth clients, PEP, hit found on the
                  concerned persons)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="wealth_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("wealth_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.wealth_file && errors.wealth_file && (
              <div>{errors.wealth_file}</div>
            )}
          </Box>
          {/* Recent professional reference in case the person is a Politically Exposed Person (PEP) (as a measure of EDD) */}
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
            <Typography variant="h6">
              {values.professionalReference_file ? (
                values.professionalReference_file.name
              ) : (
                <label htmlFor="professionalReference_file">
                  Recent professional reference in case the person is a
                  Politically Exposed Person (PEP) (as a measure of EDD)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="professionalReference_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "professionalReference_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.professionalReference_file &&
              errors.professionalReference_file && (
                <div>{errors.professionalReference_file}</div>
              )}
          </Box>
        </>
      )}

      {values.RelationshipWithApplicant === "legal entity" && (
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
            <Typography variant="h6">
              {values.incorporation_file ? (
                values.incorporation_file.name
              ) : (
                <label htmlFor="incorporation_file">
                  Certificate of incorporation
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="incorporation_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("incorporation_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.incorporation_file && errors.incorporation_file && (
              <div>{errors.incorporation_file}</div>
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
            <Typography variant="h6">
              {values.goodStanding_file ? (
                values.goodStanding_file.name
              ) : (
                <label htmlFor="goodStanding_file">
                  Certificate of good standing or incumbency (if hit has been
                  recorded on the legal entity)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="goodStanding_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("goodStanding_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.goodStanding_file && errors.goodStanding_file && (
              <div>{errors.goodStanding_file}</div>
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
            <Typography variant="h6">
              {values.constitution_file ? (
                values.constitution_file.name
              ) : (
                <label htmlFor="constitution_file">
                  Constitution or memorandum and articles of association
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="constitution_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("constitution_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.constitution_file && errors.constitution_file && (
              <div>{errors.constitution_file}</div>
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
            <Typography variant="h6">
              {values.businessPlan_file ? (
                values.businessPlan_file.name
              ) : (
                <label htmlFor="businessPlan_file">
                  Business plan with details of the group structure, the nature
                  of business and countries of operation
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="businessPlan_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("businessPlan_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.businessPlan_file && errors.businessPlan_file && (
              <div>{errors.businessPlan_file}</div>
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
            <Typography variant="h6">
              {values.registeredOffice_file ? (
                values.registeredOffice_file.name
              ) : (
                <label htmlFor="registeredOffice_file">
                  Details of registered office and place of business
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="registeredOffice_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "registeredOffice_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.registeredOffice_file && errors.registeredOffice_file && (
              <div>{errors.registeredOffice_file}</div>
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
            <Typography variant="h6">
              {values.shareholders_file ? (
                values.shareholders_file.name
              ) : (
                <label htmlFor="shareholders_file">
                  Register of shareholders and directors
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="shareholders_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("shareholders_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.shareholders_file && errors.shareholders_file && (
              <div>{errors.shareholders_file}</div>
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
            <Typography variant="h6">
              {values.financialStatements_file ? (
                values.financialStatements_file.name
              ) : (
                <label htmlFor="financialStatements_file">
                  Latest audited financial accounts
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="financialStatements_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "financialStatements_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.financialStatements_file &&
              errors.financialStatements_file && (
                <div>{errors.financialStatements_file}</div>
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
            <Typography variant="h6">
              {values.principals_identification_file ? (
                values.principals_identification_file.name
              ) : (
                <label htmlFor="principals_identification_file">
                  Identification documents of the principals of the company
                  (shareholders, ultimate beneficial owners, promoters, officers
                  and at least 2 directors)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="principals_identification_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "principals_identification_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.principals_identification_file &&
              errors.principals_identification_file && (
                <div>{errors.principals_identification_file}</div>
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
            <Typography variant="h6">
              {values.source_of_funds_file ? (
                values.source_of_funds_file.name
              ) : (
                <label htmlFor="source_of_funds_file">
                  Proof of source of funds (please refer to Part B below)
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
            <Typography variant="h6">
              {values.source_of_wealth_file ? (
                values.source_of_wealth_file.name
              ) : (
                <label htmlFor="source_of_wealth_file">
                  Proof of source of wealth (if applicable in case of high risk
                  clients, high net worth clients, PEP, hit found on the
                  concerned persons)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="source_of_wealth_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "source_of_wealth_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.source_of_wealth_file && errors.source_of_wealth_file && (
              <div>{errors.source_of_wealth_file}</div>
            )}
          </Box>
        </>
      )}
      {values.RelationshipWithApplicant === "Trust" && (
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
            <Typography variant="h6">
              {values.declaration_of_trust_file ? (
                values.declaration_of_trust_file.name
              ) : (
                <label htmlFor="declaration_of_trust_file">
                  Declaration of Trust or Trust Deed
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="declaration_of_trust_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "declaration_of_trust_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.declaration_of_trust_file &&
              errors.declaration_of_trust_file && (
                <div>{errors.declaration_of_trust_file}</div>
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
            <Typography variant="h6">
              {values.deed_of_retirement_file ? (
                values.deed_of_retirement_file.name
              ) : (
                <label htmlFor="deed_of_retirement_file">
                  Deed of Retirement and Appointment of Trustee, beneficiary,
                  etc (if applicable)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="deed_of_retirement_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "deed_of_retirement_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.deed_of_retirement_file &&
              errors.deed_of_retirement_file && (
                <div>{errors.deed_of_retirement_file}</div>
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
            <Typography variant="h6">
              {values.certificate_of_registration_file ? (
                values.certificate_of_registration_file.name
              ) : (
                <label htmlFor="certificate_of_registration_file">
                  Certificate of Registration (if available)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="certificate_of_registration_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "certificate_of_registration_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.certificate_of_registration_file &&
              errors.certificate_of_registration_file && (
                <div>{errors.certificate_of_registration_file}</div>
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
            <Typography variant="h6">
              {values.business_plan_file ? (
                values.business_plan_file.name
              ) : (
                <label htmlFor="business_plan_file">
                  Business plan with details of the group structure, the nature
                  of business and countries of operation
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="business_plan_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("business_plan_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.business_plan_file && errors.business_plan_file && (
              <div>{errors.business_plan_file}</div>
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
            <Typography variant="h6">
              {values.registered_office_file ? (
                values.registered_office_file.name
              ) : (
                <label htmlFor="registered_office_file">
                  Details of registered office and place of business
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="registered_office_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "registered_office_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.registered_office_file &&
              errors.registered_office_file && (
                <div>{errors.registered_office_file}</div>
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
            <Typography variant="h6">
              {values.register_of_trustee_file ? (
                values.register_of_trustee_file.name
              ) : (
                <label htmlFor="register_of_trustee_file">
                  Register of trustee, settlor, protector, enforcer,
                  beneficiaries, ultimate beneficial owner
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="register_of_trustee_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "register_of_trustee_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.register_of_trustee_file &&
              errors.register_of_trustee_file && (
                <div>{errors.register_of_trustee_file}</div>
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
            <Typography variant="h6">
              {values.proof_of_source_of_funds_file ? (
                values.proof_of_source_of_funds_file.name
              ) : (
                <label htmlFor="proof_of_source_of_funds_file">
                  Proof of source of funds (please refer to Part B below)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="proof_of_source_of_funds_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "proof_of_source_of_funds_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.proof_of_source_of_funds_file &&
              errors.proof_of_source_of_funds_file && (
                <div>{errors.proof_of_source_of_funds_file}</div>
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
            <Typography variant="h6">
              {values.proof_of_source_of_wealth_file ? (
                values.proof_of_source_of_wealth_file.name
              ) : (
                <label htmlFor="proof_of_source_of_wealth_file">
                  Proof of source of wealth (if applicable)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="proof_of_source_of_wealth_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "proof_of_source_of_wealth_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.proof_of_source_of_wealth_file &&
              errors.proof_of_source_of_wealth_file && (
                <div>{errors.proof_of_source_of_wealth_file}</div>
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
            <Typography variant="h6">
              {values.latest_accounts_or_bank_statements_file ? (
                values.latest_accounts_or_bank_statements_file.name
              ) : (
                <label htmlFor="latest_accounts_or_bank_statements_file">
                  Latest accounts or bank statements
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="latest_accounts_or_bank_statements_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "latest_accounts_or_bank_statements_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.latest_accounts_or_bank_statements_file &&
              errors.latest_accounts_or_bank_statements_file && (
                <div>{errors.latest_accounts_or_bank_statements_file}</div>
              )}
          </Box>
        </>
      )}

      {values.RelationshipWithApplicant === "Foundation" && (
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
            <Typography variant="h6">
              {values.certificate_of_registration_file ? (
                values.certificate_of_registration_file.name
              ) : (
                <label htmlFor="certificate_of_registration_file">
                  Certificate of Registration
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="certificate_of_registration_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "certificate_of_registration_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.certificate_of_registration_file &&
              errors.certificate_of_registration_file && (
                <div>{errors.certificate_of_registration_file}</div>
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
            <Typography variant="h6">
              {values.licence_file ? (
                values.licence_file.name
              ) : (
                <label htmlFor="licence_file">Licence (if any)</label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="licence_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("licence_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.licence_file && errors.licence_file && (
              <div>{errors.licence_file}</div>
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
            <Typography variant="h6">
              {values.certificate_of_incumbency_file ? (
                values.certificate_of_incumbency_file.name
              ) : (
                <label htmlFor="certificate_of_incumbency_file">
                  Certificate of incumbency (if hit has been recorded on the
                  Foundation)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="certificate_of_incumbency_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "certificate_of_incumbency_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.certificate_of_incumbency_file &&
              errors.certificate_of_incumbency_file && (
                <div>{errors.certificate_of_incumbency_file}</div>
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
            <Typography variant="h6">
              {values.charter_file ? (
                values.charter_file.name
              ) : (
                <label htmlFor="charter_file">Charter</label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="charter_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("charter_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.charter_file && errors.charter_file && (
              <div>{errors.charter_file}</div>
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
            <Typography variant="h6">
              {values.business_plan_file ? (
                values.business_plan_file.name
              ) : (
                <label htmlFor="business_plan_file">
                  Business plan with details of the group structure, the nature
                  of business and countries of operation
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="business_plan_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("business_plan_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.business_plan_file && errors.business_plan_file && (
              <div>{errors.business_plan_file}</div>
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
            <Typography variant="h6">
              {values.registered_office_and_place_of_business_file ? (
                values.registered_office_and_place_of_business_file.name
              ) : (
                <label htmlFor="registered_office_and_place_of_business_file">
                  Details of registered office and place of business
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="registered_office_and_place_of_business_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "registered_office_and_place_of_business_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.registered_office_and_place_of_business_file &&
              errors.registered_office_and_place_of_business_file && (
                <div>{errors.registered_office_and_place_of_business_file}</div>
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
            <Typography variant="h6">
              {values.register_of_council_members_file ? (
                values.register_of_council_members_file.name
              ) : (
                <label htmlFor="register_of_council_members_file">
                  Register of Council members
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="register_of_council_members_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "register_of_council_members_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.register_of_council_members_file &&
              errors.register_of_council_members_file && (
                <div>{errors.register_of_council_members_file}</div>
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
            <Typography variant="h6">
              {values.latest_accounts_file ? (
                values.latest_accounts_file.name
              ) : (
                <label htmlFor="latest_accounts_file">
                  Latest accounts Bank statements
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="latest_accounts_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("latest_accounts_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.latest_accounts_file && errors.latest_accounts_file && (
              <div>{errors.latest_accounts_file}</div>
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
            <Typography variant="h6">
              {values.identification_documents_of_the_principals_of_the_foundation_file ? (
                values
                  .identification_documents_of_the_principals_of_the_foundation_file
                  .name
              ) : (
                <label htmlFor="identification_documents_of_the_principals_of_the_foundation_file">
                  Identification documents of the principals of the Foundation
                  (Founder, Beneficiary / Ultimate Beneficial Owner and Council
                  Members)
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="identification_documents_of_the_principals_of_the_foundation_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "identification_documents_of_the_principals_of_the_foundation_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.identification_documents_of_the_principals_of_the_foundation_file &&
              errors.identification_documents_of_the_principals_of_the_foundation_file && (
                <div>
                  {
                    errors.identification_documents_of_the_principals_of_the_foundation_file
                  }
                </div>
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
            <Typography variant="h6">
              {values.proof_of_source_of_funds_file ? (
                values.proof_of_source_of_funds_file.name
              ) : (
                <label htmlFor="proof_of_source_of_funds_file">
                  Proof of source of funds
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="proof_of_source_of_funds_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "proof_of_source_of_funds_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.proof_of_source_of_funds_file &&
              errors.proof_of_source_of_funds_file && (
                <div>{errors.proof_of_source_of_funds_file}</div>
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
