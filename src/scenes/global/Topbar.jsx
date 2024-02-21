import React from "react";
import { Fragment, useEffect, useCallback, useRef } from "react";
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
  Autocomplete,
  Grid,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/EmailOutlined";
import { useState } from "react";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery, useGetClientsQuery } from "../../state/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const { data: userProfile, isLoading } = useGetUserProfileQuery();
  const { data: clients, isLoading: clientsLoading } = useGetClientsQuery();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedClientId, setClickedClientId] = useState(null);
  const searchBoxRef = useRef(null);
  
  // const [selectedClient, setSelectedClient] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const filteredClients = clients?.filter((client) => {
    const searchTerm = typeof searchQuery === 'string' ? searchQuery.trim().toLowerCase() : null;
  
    // If there's no search query, include all clients
    if (!searchTerm || searchTerm === "") {
      return true;
    }
  
    // Check if any property contains the search term
    return Object.values(client).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm)
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
          // window.location.href = "/";
          navigate("/login");
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

  const handleClientClick = (selectedClient) => {
    console.log('Clicked on user:', selectedClient);
    if (selectedClient) {
      setClickedClientId(selectedClient.id);
      setSearchQuery("");
      console.log('Updated clickedClientId:', selectedClient.id);
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
        setClickedClientId(null); // Reset clickedClientId after navigation
        searchBoxRef.current?.focus(); // Set focus on the search box
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [clickedClientId, debouncedNavigate]);



  const selectedClient = filteredClients
    ? filteredClients.find((client) => client.id === clickedClientId)
    : null;


  return (
    <Box display="flex" justifyContent="space-between" p={2} ml="-12px" mt="-22px">
      {/* SEARCH BAR */}
      <Box
        mt="-5px"
        p={2}
        width={300}
        maxHeight={100}
      >
        <Autocomplete
          options={filteredClients || []}
          getOptionLabel={(client) => `${client.id}. ${client.firstName} ${client.lastName}`}
          style={{ width: 250, height: 10}}
          value={selectedClient || null}
          onChange={(event, newValue) => handleClientClick(newValue)}
          disablePortal
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Client"
              sx={{
                backgroundColor: colors.primary[400],
                borderRadius: "5px",
                width: "100%"
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <IconButton type="button">
                      <SearchIcon />
                    </IconButton>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              inputRef={searchBoxRef}
            />
          )}
        />
      </Box>

      {/* Display dropdown with search results */}
      {searchQuery && (
        <Box mt={2} p={2} position="absolute" zIndex={1000}>
          {filteredClients && filteredClients.length ? (
            // Render the filtered clients if there are results
            filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => handleClientClick(client)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
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
        <IconButton>
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
