import React, { useState } from "react";
import { Dialog, DialogContent, Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { toast } from "react-toastify";
import TokenRetrieval from "../../utils/TokenRetrieval";
import { useNavigate } from "react-router-dom";

const Logout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleLogoutConfirm = async (confirmed) => {
    onClose();

    if (confirmed) {
      try {
        setLoading(true);
        const loggedOutResponse = await fetch(`${baseUrl}logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json,",
            Authorization: `token ${TokenRetrieval.getToken()}`,
          },
        });
        const loggedOut = await loggedOutResponse.json();
        if (loggedOut) {
          localStorage.clear("token");
          dispatch(
            setLogout({
              user: "null",
              token: "null",
            })
          );
        }
        if (loggedOutResponse.ok) {
          toast.success(loggedOut.message);
          navigate("/login");
        } else {
          toast.error(loggedOut.message)
          navigate("/")
        }
      } catch (error) {
        toast.error("Error in logging out. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleLogoutConfirm(false)}>
      <DialogContent>
        <Typography>Are you sure you want to logout?</Typography>
      </DialogContent>
      <Box display="flex" justifyContent="center" p={2} gap="20px">
        <Button
          onClick={() => handleLogoutConfirm(false)}
          color="secondary"
          variant="contained"
        >
          No
        </Button>
        <Button
          onClick={() => handleLogoutConfirm(true)}
          color="secondary"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Logging out..." : "Yes"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default Logout;