import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const OtherInfoForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {/* ... (previous fields) */}

      {/* Name Change */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Indicate, whether the Client has changed his name?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.nameChange}
        name="nameChange"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.nameChange === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Former Names and Dates of Change"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.formerNames}
          name="formerNames"
          sx={{ gridColumn: "span 2" }}
        />
      )}

      {/* Financial Services Business */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Indicate, whether the Client conducts or carries out financial services business from any jurisdiction other than Rwanda?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.financialServicesBusiness}
        name="financialServices_Business"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.financialServicesBusiness === "Yes" && (
        <>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name of Jurisdiction"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.jurisdictionName}
            name="jurisdictionName"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address of Financial Services Business"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.businessAddress}
            name="businessAddress"
            sx={{ gridColumn: "span 2" }}
          />
        </>
      )}

      <TextField
        fullWidth
        variant="filled"
        select
        label="Has the Applicant/Beneficial Owner/Partner made a similar application in another jurisdiction?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.applicationInOtherJurisdiction}
        name="applicationInOtherJurisdiction"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.applicationInOtherJurisdiction === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Details of Application in Another Jurisdiction"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.applicationDetails}
          name="applicationDetails"
          sx={{ gridColumn: "span 2" }}
        />
      )}

      {/* Criticised, Censured, Disciplined */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Has the Applicant/Beneficial Owner/Partner at any time in the previous 7 years been criticised, censured, disciplined, suspended, or fined by any regulatory body in Rwanda or by any regulatory body in any other jurisdiction?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.criticisedCensuredDisciplined}
        name="criticisedCensuredDisciplined"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.criticisedCensuredDisciplined === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Details of Criticism, Censure, Discipline, Suspension, or Fine"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.criticismDetails}
          name="criticismDetails"
          sx={{ gridColumn: "span 2" }}
        />
      )}
      <TextField
        fullWidth
        variant="filled"
        select
        label="At any time in the previous 7 years, has an application been made for the bankruptcy or compulsory winding up of the Applicant/Beneficial Owner/Partner or has the Applicant’s property been seized or forfeited or relinquished by any other similar means?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.bankruptcyOrWindingUp}
        name="bankruptcyOrWindingUp"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.bankruptcyOrWindingUp === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Details"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.bankruptcyDetails}
          name="bankruptcyDetails"
          sx={{ gridColumn: "span 2" }}
        />
      )}

      {/* Receiver or Administrator Appointed */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Has the Applicant/Beneficial Owner/Partner at any time in the previous 7 years had a Receiver or an Administrator appointed or failed to satisfy a debt adjudged due, or come to a compromise or similar arrangement with any of its creditors?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.receiverOrAdministrator}
        name="receiverOrAdministrator"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.receiverOrAdministrator === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Details"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.receiverDetails}
          name="receiverDetails"
          sx={{ gridColumn: "span 2" }}
        />
      )}

      {/* Civil Proceedings or Arbitration */}
      {/* Repeat similar structure for the remaining questions... */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Has the Applicant/Beneficial Owner/Partner been engaged in any civil proceedings or arbitration at any time in the previous 7 years in which a debt was adjudged due from, or judgement given against, the Applicant in relation to any financial service?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.civilProceedings}
        name="civilProceedings"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.civilProceedings === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Details"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.civilProceedingsDetails}
          name="civilProceedingsDetails"
          sx={{ gridColumn: "span 2" }}
        />
      )}
      {/* Offence Involving Fraud or Dishonesty */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Has the Applicant/Beneficial Owner/Partner at any time been convicted of any offence involving fraud, or other dishonesty, or any other offence such as an economic offence or money laundering or been subject to penalties for tax evasion (whether or not in Rwanda) relating to companies carrying out financial services business?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.convictionOffence}
        name="convictionOffence"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.convictionOffence === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Details"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.convictionDetails}
          name="convictionDetails"
          sx={{ gridColumn: "span 2" }}
        />
      )}

      {/* Director/Officer/Partner Conviction */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Has any Director, Officer or Partner of the Applicant been convicted in any Court of Law for a criminal offence or penalised or sanctioned, or is currently or has ever been under investigation for professional negligence or malpractice by any Regulatory Authority in any country?"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.directorConviction}
        name="directorConviction"
        sx={{ gridColumn: "span 4" }}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </TextField>

      {values.directorConviction === "Yes" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Details"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.directorConvictionDetails}
          name="directorConvictionDetails"
          sx={{ gridColumn: "span 2" }}
        />
      )}
    </Box>
  );
};

export default OtherInfoForm;
