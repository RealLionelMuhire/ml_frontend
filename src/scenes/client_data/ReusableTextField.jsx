import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const ReusableTextField = ({
  label,
  fieldName,
  values,
  handleChange,
  touched,
  errors,
}) => {
  return (
    <Box gridColumn="span 2">
      <TextField
        fullWidth
        variant="filled"
        label={label}
        onBlur={handleChange}
        onChange={handleChange}
        value={values[fieldName]}
        name={fieldName}
        error={!!touched[fieldName] && !!errors[fieldName]}
        helperText={touched[fieldName] && errors[fieldName]}
      />
    </Box>
  );
};

export default ReusableTextField;
