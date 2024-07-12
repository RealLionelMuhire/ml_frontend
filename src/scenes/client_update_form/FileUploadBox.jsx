import React from "react";
import { Box, Typography } from "@mui/material";
import { useField } from "formik";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FileUploadBox = ({
  label,
  fieldName,
  accept,
  handleChange,
  touched,
  errors,
  setFieldValue,
  values,
}) => {
  const [field, , helpers] = useField(fieldName);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFileChange = (e) => {
    handleChange(e);
    setFieldValue(fieldName, e.currentTarget.files[0]);
  };

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
      <Typography variant="h6">
        {values[fieldName] ? (
          values[fieldName].name
        ) : (
          <label htmlFor={fieldName}>{label}</label>
        )}
      </Typography>
      <input
        type="file"
        accept={accept}
        name={fieldName}
        id={fieldName}
        onChange={handleFileChange}
        sx={{ gridColumn: "span 2" }}
      />
      {touched[fieldName] && errors[fieldName] && (
        <div>{errors[fieldName]}</div>
      )}
    </Box>
  );
};

export default FileUploadBox;
