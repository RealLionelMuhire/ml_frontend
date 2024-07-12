// ErrorBox.jsx
import React from "react";
import { Box } from "@mui/material";

const ErrorBox = ({ isError }) => {
  return (
    isError && (
      <Box mt="20px" color="error.main">
        Error creating user. Please try again.
      </Box>
    )
  );
};

export default ErrorBox;
