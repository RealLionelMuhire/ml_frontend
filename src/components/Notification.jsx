import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useNotify = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(3000);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const showNotification = (newMessage, newDuration = 3000) => {
    setMessage(newMessage);
    setDuration(newDuration);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage(""); // Clear the message when the notification is closed
  };

  const Notification = () => (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );

  return [Notification, showNotification];
};

export default useNotify;
