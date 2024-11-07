import React from "react";
import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material";

const FeedbackDialog = ({ open, message, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {message}
        </Typography>
      </DialogContent>
      <Box display="flex" justifyContent="center" p={2} gap="20px">
        <Button
          onClick={onClose}
          color="secondary"
          variant="contained"
          sx={{ width: "100px" }}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default FeedbackDialog;
