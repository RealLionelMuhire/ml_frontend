import React from "react";
import { Fragment } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/EmailOutlined";
import { useState } from "react";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "../../state/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const { data: userProfile, isLoading } = useGetUserProfileQuery();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const choices = ["Profile", "Logout", "Change Password"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSettingClick = async (choice) => {
    handleCloseUserMenu();

    if (choice === "Logout") {
      try {
        const loggedOutResponse = await fetch(
          "http://localhost:8000/api/logout/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json,",
              Authorization: `token ${localStorage.getItem("token")}`,
            },
          }
        );
        const loggedOut = await loggedOutResponse.json();
        if (loggedOut) {
          localStorage.clear("token");
          dispatch(
            setLogout({
              user: "null",
              token: "null",
            })
          );
          window.location.href = "/";
        }
      } catch (error) {}
    } else if (choice === "Profile") {
      setProfileDialogOpen(true);
    } else if (choice === "Change src/scenes/faq/index.jsxPassword") {
      try {
        const changePassordResponse = await fetch(
          "http://localhost:8000/api/forgot-password/",
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
      } catch (error) {
        toast.error("Error resetting password. Please try again.");
      }
    }
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <Link to="/alerts-page"><NotificationsOutlinedIcon /></Link>
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

      {/* PROFILE DIALOG */}
      <Dialog
        open={isProfileDialogOpen}
        onClose={handleProfileDialogClose}
        // maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="h3" style={{ paddingBottom: "15px" }}>
          My Profile
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Box>
              <Grid container spacing={1}>
                {Object.entries(userProfile).map(([key, value]) => (
                  <Fragment key={key}>
                    <Grid item xs={6}>
                      <Typography variant="h6">{key}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{value}</Typography>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>

              <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: "16px" }}
              >
                <Link to="/update-user">Update Profile</Link>
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Topbar;
