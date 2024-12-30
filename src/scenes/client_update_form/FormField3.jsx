import React from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import DocumentUploadField from "../../utils/DocumentUploadField";

const FormFields3 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  client,
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
          Authorised Persons to deal on behalf of the Legal Person
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Authorised Person Name: ${client.authorisedName || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorisedName}
        name="authorisedName"
        error={!!touched.authorisedName && !!errors.authorisedName}
        helperText={touched.authorisedName && errors.authorisedName}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Authorised Person Email: ${client.authorisedEmail || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorisedEmail}
        name="authorisedEmail"
        error={!!touched.authorisedEmail && !!errors.authorisedEmail}
        helperText={touched.authorisedEmail && errors.authorisedEmail}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Authorised Person Contact Phone: ${
          client.authorisedPersonContact || ""
        }`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorisedPersonContact}
        name="authorisedPersonContact"
        error={
          !!touched.authorisedPersonContact && !!errors.authorisedPersonContact
        }
        helperText={
          touched.authorisedPersonContact && errors.authorisedPersonContact
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Authorised Person Current Address: ${
          client.authorisedCurrentAddress || ""
        }`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorisedCurrentAddress}
        name="authorisedCurrentAddress"
        error={
          !!touched.authorisedCurrentAddress &&
          !!errors.authorisedCurrentAddress
        }
        helperText={
          touched.authorisedCurrentAddress && errors.authorisedCurrentAddress
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label={`Relationship of Authorised Person with Client: ${
          client.authorisedRelationship || ""
        }`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.authorisedRelationship}
        name="authorisedRelationship"
        error={
          !!touched.authorisedRelationship && !!errors.authorisedRelationship
        }
        helperText={
          touched.authorisedRelationship && errors.authorisedRelationship
        }
        sx={{ gridColumn: "span 1" }}
      />
      <DocumentUploadField
        label="Upload Signature File"
        name="signature_file"
        value={values.signature_file}
        error={errors.signature_file}
        touched={touched.signature_file}
        setFieldValue={setFieldValue}
        client={client}
        accept=".pdf"
      />
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
          variant="h5"
          color={colors.greenAccent[500]}
          fontWeight="500"
        >
          PEP Status (For the Ultimate Beneficial Owner/Shareholder)
        </Typography>
      </Box>
      {/* PEP Status */}
      <TextField
        fullWidth
        variant="filled"
        select
        label={`PEP Status: ${client.isPep || ""}`}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.isPep}
        name="isPep"
        error={!!touched.isPep && !!errors.isPep}
        helperText={touched.isPep && errors.isPep}
        sx={{ gridColumn: "span 1" }}
      >
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>
      {(values.isPep === "yes" || (!values.isPep && client.isPep === "yes")) && (
        <>
          <DocumentUploadField
            label="Upload last six months bank statements"
            name="bankStatement_file"
            value={values.bankStatement_file}
            error={errors.bankStatement_file}
            touched={touched.bankStatement_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
            sx={{ gridColumn: "span 2" }}
          />
          {touched.bankStatement_file && errors.bankStatement_file && (
            <div>{errors.bankStatement_file}</div>
          )}

          <DocumentUploadField
            label="Upload professional reference"
            name="professionalReference_file"
            value={values.professionalReference_file}
            error={errors.professionalReference_file}
            touched={touched.professionalReference_file}
            setFieldValue={setFieldValue}
            client={client}
            accept=".pdf"
            sx={{ gridColumn: "span 2" }}
          />
          {touched.professionalReference_file && errors.professionalReference_file && (
            <div>{errors.professionalReference_file}</div>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default FormFields3;
