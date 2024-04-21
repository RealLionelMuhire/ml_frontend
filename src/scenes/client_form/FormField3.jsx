import React from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields3 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
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
          Authorised Persons to deal on behalf of the Legal Person
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Authorised Person Names"
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
        label="Authorised Person Email"
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
        label="Authorised Person Contact Phone"
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
        label="Authorised Person Current Address"
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
        label="Relationship of Authorised Person with Client"
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
          {values.sample_file ? (
            values.sample_file.name
          ) : (
            <label htmlFor="sample_file">
              Sample File Lebel
            </label>
          )}
        </Typography>
        <input
          type="file"
          accept=".pdf"
          name="sample_file"
          onChange={(e) => {
            handleChange(e);
            setFieldValue("sample_file", e.currentTarget.files[0]);
          }}
          sx={{ gridColumn: "span 2" }}
        />
        {touched.sample_file && errors.sample_file && (
          <div>{errors.sample_file}</div>
        )}
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
        label="PEP Status"
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

      {/* Conditional rendering for certificate upload */}
      {values.isPep === "yes" && (
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
              {values.bankStatement_file ? (
                values.bankStatement_file.name
              ) : (
                <label htmlFor="sample_file">
                  Upload last six months bank statements
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="bankStatement_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("bankStatement_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.bankStatement_file && errors.bankStatement_file && (
              <div>{errors.bankStatement_file}</div>
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
              {values.professionalReference_file ? (
                values.professionalReference_file.name
              ) : (
                <label htmlFor="sample_file">
                  Upload professional reference
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
    </React.Fragment>
  );
};

export default FormFields3;
