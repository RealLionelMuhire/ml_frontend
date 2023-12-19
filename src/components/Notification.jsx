import React, { useState, useEffect } from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

const Notification = ({ message, severity, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <SnackbarContent
        sx={{ backgroundColor: severity === 'error' ? 'red' : 'green' }}
        message={message}
      />
    </Snackbar>
  );
};

export default Notification;
