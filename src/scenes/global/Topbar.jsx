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
  CircularProgress,
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
import { useGetUserProfileQuery, useGetClientsQuery } from "../../state/api";
import { toast } from "react-toastify";
import TokenStorage from "../../utils/TokenStorage";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

const Topbar = () => {
  const theme = useTheme();
  const { data: userProfile } = useGetUserProfileQuery();
  const { data: clients } = useGetClientsQuery();
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedClientId, setClickedClientId] = useState(null);
  const searchBoxRef = useRef(null);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isChangePasswordDialogOpen, seChangePasswordDialogOpen] =
    useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const filteredClients = clients?.filter((client) => {
    const searchTerm =
      typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : null;

    // If there's no search query, include all clients
    if (!searchTerm || searchTerm === "") {
      return true;
    }

    // Check if any property contains the search term
    return Object.values(client).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchTerm)
    );
  });

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
      setLoading(true);
      try {
        const refreshToken = TokenStorage.getRefreshToken();
        const accessToken = TokenStorage.getAccessToken();
  
        const loggedOutResponse = await fetch(`${baseUrl}logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
  
        const loggedOut = await loggedOutResponse.json();
        setLoading(false);
  
        if (loggedOutResponse.ok) {
          TokenStorage.clearTokens();
          dispatch(setLogout({ user: "null", token: "null" }));
          toast.success("Logged out successfully.");
          setTimeout(() => {
            navigate("/login");
            window.location.href = "/login";
          }, 2000);
        } else {
          toast.error(loggedOut.message);
          navigate("/login");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error logging out. Please try again.");
      }
    }
  };
  
  
  

  const handleChangePasswordConfirm = async (confirmed) => {
    seChangePasswordDialogOpen(false);

    if (confirmed) {
      setLoading(true);
      try {

        const refreshToken = TokenStorage.getRefreshToken();
        const accessToken = TokenStorage.getAccessToken();

        const changePassordResponse = await fetch(`${baseUrl}logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
        if (changePassordResponse.ok) {
          TokenStorage.clearTokens();
          dispatch(setLogout({ user: "null", token: "null" }));
          window.location.href = `${baseUrl}reset_password/`;
        } else {
          toast.error("Error changing password. Please try again.");
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleClientClick = (selectedClient) => {
    console.log("Clicked on user:", selectedClient);
    if (selectedClient) {
      setClickedClientId(selectedClient.id);
      setSearchQuery("");
      console.log("Updated clickedClientId:", selectedClient.id);
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
      {/* SEARCH BAR */}
      <Box mt="-5px" p={2} width={300} maxHeight={100}>
        <Search
          filteredClients={filteredClients}
          handleClientClick={handleClientClick}
          searchBoxRef={searchBoxRef}
        />
      </Box>
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

      <Dialog open={isLoading}>
        <DialogContent>
          <CircularProgress size={60} />
        </DialogContent>
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

      {/* Display dropdown with search results */}
      {searchQuery && (
        <Box mt={2} p={2} position="absolute" zIndex={1000}>
          {filteredClients && filteredClients.length ? (
            // Render the filtered clients if there are results
            filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => handleClientClick(client)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {client.firstName} {client.lastName}
              </div>
            ))
          ) : (
            // Display a message if no results are found
            <Typography>No clients found.</Typography>
          )}
        </Box>
      )}

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

export default Topbar;
