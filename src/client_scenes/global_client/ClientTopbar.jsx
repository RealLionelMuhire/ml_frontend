import React from "react";
import { useEffect, useCallback, useRef } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MessageIcon from "@mui/icons-material/EmailOutlined";
import { useState } from "react";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "../../state/api";
import { toast } from "react-toastify";
import TokenRetrieval from "../../utils/TokenRetrieval";
import { useNavigate } from "react-router-dom";
// import Search from "./Search";

const ClientTopbar = () => {
  const theme = useTheme();
  const { data: userProfile } = useGetUserProfileQuery();
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const [clickedClientId, setClickedClientId] = useState(null);
  const searchBoxRef = useRef(null);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, seChangePasswordDialogOpen] =
    useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const choices = ["Profile", "Logout", "Change Password"];
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSettingClick = async (choice) => {
    handleCloseUserMenu();

    if (choice === "Logout") {
      // Open the confirmation dialog
      setLogoutDialogOpen(true);
    } else if (choice === "Profile") {
      // Navigate to the "user-profile" page
      navigate("/user-profile");
    } else if (choice === "Change Password") {
      seChangePasswordDialogOpen(true);
    }
  };
  const handleLogoutConfirm = async (confirmed) => {
    setLogoutDialogOpen(false);

    if (confirmed) {
      try {
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

          setTimeout(() => {
            navigate("/login");
            window.location.href = "/login";
          }, 2000);
        } else {
          localStorage.clear("token");
          dispatch(
            setLogout({
              user: "null",
              token: "null",
            })
          );
          toast.error(loggedOut.message);
          navigate("/login");
        }
      } catch (error) {
        toast.error("Error in logging out. Please try again.");
      }
    }
  };

  const handleChangePasswordConfirm = async (confirmed) => {
    seChangePasswordDialogOpen(false);

    if (confirmed) {
      try {
        const changePassordResponse = await fetch(
          `${baseUrl}forgot-password/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userProfile.email }),
          }
        );
        if (!changePassordResponse.ok) {
          const errorData = await changePassordResponse.json();
          toast.error(errorData.message);
          return;
        }
        toast.success(
          "Check your email, Password reset instructions sent successfully."
        );
        navigate("/login");
      } catch (error) {
        toast.error("Error resetting password. Please try again.");
      }
    }
  };

  const debouncedNavigate = useCallback(
    (clientId) => {
      navigate("/clients-id/", { state: { selectedClientIds: [clientId] } });
    },
    [navigate]
  );

  useEffect(() => {
    if (clickedClientId !== null) {
      const timeoutId = setTimeout(() => {
        debouncedNavigate(clickedClientId);
        setClickedClientId(null);
        searchBoxRef.current?.focus();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [clickedClientId, debouncedNavigate]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      ml="-12px"
      mt="-22px"
    >
      <Dialog
        open={isLogoutDialogOpen}
        onClose={() => handleLogoutConfirm(false)}
      >
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
          >
            Yes
          </Button>
        </Box>
      </Dialog>

      <Dialog
        open={isChangePasswordDialogOpen}
        onClose={() => handleChangePasswordConfirm(false)}
      >
        <DialogContent>
          <Typography>
            Are you sure you want to change your password?
          </Typography>
        </DialogContent>
        <Box display="flex" justifyContent="center" p={2} gap="20px">
          <Button
            onClick={() => handleChangePasswordConfirm(false)}
            color="secondary"
            variant="contained"
          >
            No
          </Button>
          <Button
            onClick={() => handleChangePasswordConfirm(true)}
            color="secondary"
            variant="contained"
          >
            Yes
          </Button>
        </Box>
      </Dialog>

      {/* ICONS */}
      <Box display="flex" mt="15px">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => navigate("/reservations-display")}>
          <MessageIcon />
        </IconButton>
        <IconButton onClick={() => navigate("/alerts-page")}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleOpenUserMenu}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {choices.map((choice) => (
            <MenuItem key={choice} onClick={() => handleSettingClick(choice)}>
              <Typography textAlign="center">{choice}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default ClientTopbar;
