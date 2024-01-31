import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const ReusableFileUploadField = ({
  label,
  fieldName,
  values,
  handleChange,
  setFieldValue,
  touched,
  errors,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
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
      <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
        {values[fieldName] ? values[fieldName].name : label}
      </Typography>
      <input
        type="file"
        accept=".pdf"
        name={fieldName}
        onChange={(e) => {
          handleChange(e);
          setFieldValue(fieldName, e.currentTarget.files[0]);
        }}
        onBlur={() => setFieldValue(fieldName, values[fieldName])}
      />
      {touched[fieldName] && errors[fieldName] && (
        <div>{errors[fieldName]}</div>
      )}
    </Box>
  );
};

export default ReusableFileUploadField;
