// SuccessBox.jsx
import React from "react";
import { Box } from "@mui/material";

const SuccessBox = ({ data }) => {
  return (
    data && (
      <Box mt="20px" color="success.main">
        User created successfully!
      </Box>
    )
  );
};

export default SuccessBox;
