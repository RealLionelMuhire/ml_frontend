// SubmitButton.jsx
import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

const SubmitButton = ({ isLoading }) => {
  return (
    <Box display="flex" justifyContent="end" mt="20px">
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Create New User"
        )}
      </Button>
    </Box>
  );
};

export default SubmitButton;
