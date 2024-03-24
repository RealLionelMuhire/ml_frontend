import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
// import { ChatBox } from "./ChatBox";
import ChatBox from "./ChatBox";
import Header from "../../components/Header";
import { useGetAlertQuery } from "../../state/api";
import { useCloseAlertMutation } from "../../state/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const UserChats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Alerts" subtitle="List of Alerts" />
        <Box display="flex" justifyContent="left" mt="20px" ml="10px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
          >
            Button1
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
          >
            Button2
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/alerts-form">Generate an Alert</Link>
          </Button>
        </Box>
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        {/* Styling chat box space using Material-UI Paper component */}
        <Paper
          elevation={3}
          style={{
            overflowY: "auto",
            maxHeight: "100%", // Ensure the chat box space takes up full height
          }}
        >
          {/* Place the ChatBox component here */}
          <ChatBox />
        </Paper>
      </Box>
    </Box>
  );
};

export default UserChats;
