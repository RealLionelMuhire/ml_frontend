import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields9 = ({
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
        <Typography variant="h5" fontWeight="700">
          H. Bank Account
        </Typography>
      </Box>
      {/* Bank
Currency */}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Bank Name"
        value={values.bankName || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="bankName"
        error={touched.bankName && errors.bankName}
        helperText={touched.bankName && errors.bankName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Currency"
        value={values.currency || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="currency"
        error={touched.currency && errors.currency}
        helperText={touched.currency && errors.currency}
        sx={{ gridColumn: "span 2" }}
      />
      {/* <Box sx={{ marginBottom: 2, gridColumn: "span 2" }}> */}
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
        <Typography variant="h5" gutterBottom fontWeight="700">
          Authorised Signatories on the account
        </Typography>
        <Typography
          variant="h6"
          fontWeight="500"
          fontStyle="italic"
          gutterBottom
        >
          Please note that ML Corporate services shall be co-signatory on the
          bank account from a control perspective, as it deems appropriate.
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
        <Typography variant="h6" gutterBottom fontWeight="500">
          Group A
        </Typography>
      </Box>
      {/* 
        group A 1st signatory
        group A 2nd signatory
        group A 3rd signatory
        group A 4th signatory
         */}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group A 1st Signatory"
        value={values.groupASignatory1 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupASignatory1"
        error={touched.groupASignatory1 && errors.groupASignatory1}
        helperText={touched.groupASignatory1 && errors.groupASignatory1}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group A 2nd Signatory"
        value={values.groupASignatory2 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupASignatory2"
        error={touched.groupASignatory2 && errors.groupASignatory2}
        helperText={touched.groupASignatory2 && errors.groupASignatory2}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group A 3rd Signatory"
        value={values.groupASignatory3 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupASignatory3"
        error={touched.groupASignatory3 && errors.groupASignatory3}
        helperText={touched.groupASignatory3 && errors.groupASignatory3}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group A 4th Signatory"
        value={values.groupASignatory4 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupASignatory4"
        error={touched.groupASignatory4 && errors.groupASignatory4}
        helperText={touched.groupASignatory4 && errors.groupASignatory4}
        sx={{ gridColumn: "span 1" }}
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
        <Typography variant="h6" gutterBottom fontWeight="500">
          Group B
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group B 1st Signatory"
        value={values.groupBSignatory1 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupBSignatory1"
        error={touched.groupBSignatory1 && errors.groupBSignatory1}
        helperText={touched.groupBSignatory1 && errors.groupBSignatory1}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group B 2nd Signatory"
        value={values.groupBSignatory2 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupBSignatory2"
        error={touched.groupBSignatory2 && errors.groupBSignatory2}
        helperText={touched.groupBSignatory2 && errors.groupBSignatory2}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group B 3rd Signatory"
        value={values.groupBSignatory3 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupBSignatory3"
        error={touched.groupBSignatory3 && errors.groupBSignatory3}
        helperText={touched.groupBSignatory3 && errors.groupBSignatory3}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Group B 4th Signatory"
        value={values.groupBSignatory4 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="groupBSignatory4"
        error={touched.groupBSignatory4 && errors.groupBSignatory4}
        helperText={touched.groupBSignatory4 && errors.groupBSignatory4}
        sx={{ gridColumn: "span 1" }}
      />
      {/* Mode of Operation */}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Mode of Operation"
        value={values.modeOfOperation || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="modeOfOperation"
        error={touched.modeOfOperation && errors.modeOfOperation}
        helperText={touched.modeOfOperation && errors.modeOfOperation}
        sx={{ gridColumn: "span 2" }}
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
        <Typography variant="h6" gutterBottom fontWeight="500">
          Users & Access Rights (Signatory User, View Access)
        </Typography>
      </Box>
      {/* 
      authorized user 1
      authorized user 2
      authorized user 3
      authorized user 4
       */}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Authorized User 1"
        value={values.authorizedUser1 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="authorizedUser1"
        error={touched.authorizedUser1 && errors.authorizedUser1}
        helperText={touched.authorizedUser1 && errors.authorizedUser1}
        sx={{ gridColumn: "span 1" }}
      />
      {/* Access Rights for user 1 if he is available */}
      {values.authorizedUser1 && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Access Rights for user 1 if he is available"
          value={values.authorizedUser1AccessRights || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          name="authorizedUser1AccessRights"
          error={
            touched.authorizedUser1AccessRights &&
            errors.authorizedUser1AccessRights
          }
          helperText={
            touched.authorizedUser1AccessRights &&
            errors.authorizedUser1AccessRights
          }
          sx={{ gridColumn: "span 1" }}
        />
      )}

      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Authorized User 2"
        value={values.authorizedUser2 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="authorizedUser2"
        error={touched.authorizedUser2 && errors.authorizedUser2}
        helperText={touched.authorizedUser2 && errors.authorizedUser2}
        sx={{ gridColumn: "span 1" }}
      />
      {/* Access Rights for user 2 if he is available */}
      {values.authorizedUser2 && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Access Rights for user 2 if he is available"
          value={values.authorizedUser2AccessRights || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          name="authorizedUser2AccessRights"
          error={
            touched.authorizedUser2AccessRights &&
            errors.authorizedUser2AccessRights
          }
          helperText={
            touched.authorizedUser2AccessRights &&
            errors.authorizedUser2AccessRights
          }
          sx={{ gridColumn: "span 1" }}
        />
      )}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Authorized User 3"
        value={values.authorizedUser3 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="authorizedUser3"
        error={touched.authorizedUser3 && errors.authorizedUser3}
        helperText={touched.authorizedUser3 && errors.authorizedUser3}
        sx={{ gridColumn: "span 1" }}
      />
      {/* Access Rights for user 3 if he is available */}
      {values.authorizedUser3 && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Access Rights for user 3 if he is available"
          value={values.authorizedUser3AccessRights || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          name="authorizedUser3AccessRights"
          error={
            touched.authorizedUser3AccessRights &&
            errors.authorizedUser3AccessRights
          }
          helperText={
            touched.authorizedUser3AccessRights &&
            errors.authorizedUser3AccessRights
          }
          sx={{ gridColumn: "span 1" }}
        />
      )}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Authorized User 4"
        value={values.authorizedUser4 || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="authorizedUser4"
        error={touched.authorizedUser4 && errors.authorizedUser4}
        helperText={touched.authorizedUser4 && errors.authorizedUser4}
        sx={{ gridColumn: "span 1" }}
      />
      {/* Access Rights for user 4 if he is available */}
      {values.authorizedUser4 && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Access Rights for user 4 if he is available"
          value={values.authorizedUser4AccessRights || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          name="authorizedUser4AccessRights"
          error={
            touched.authorizedUser4AccessRights &&
            errors.authorizedUser4AccessRights
          }
          helperText={
            touched.authorizedUser4AccessRights &&
            errors.authorizedUser4AccessRights
          }
          sx={{ gridColumn: "span 1" }}
        />
      )}
      {/* Call back Process Contact:
      Name of proposed officer/s, if any
       */}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Call back Process Contact"
        value={values.callBackProcessContact || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="callBackProcessContact"
        error={touched.callBackProcessContact && errors.callBackProcessContact}
        helperText={
          touched.callBackProcessContact && errors.callBackProcessContact
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Name of proposed officer/s, if any"
        value={values.nameOfProposedOfficer || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="nameOfProposedOfficer"
        error={touched.nameOfProposedOfficer && errors.nameOfProposedOfficer}
        helperText={
          touched.nameOfProposedOfficer && errors.nameOfProposedOfficer
        }
        sx={{ gridColumn: "span 2" }}
      />
    </React.Fragment>
  );
};

export default FormFields9;
