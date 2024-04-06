import { Box, useTheme, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useGetUserProfileQuery } from "../../state/api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const UserProfileDisplay = () => {
  const { data: userProfile, isLoading, isError } = useGetUserProfileQuery();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  if (isLoading) {
    return <div><CircularProgress size={60} color="inherit"/></div>;
  }

  if (isError) {
    return <div>Error loading user profile. Please try again.</div>;
  }

  return (
    <Box m="20px">
      <Header title="Update Profile" subtitle="Profile data" />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Box>
            <Box>
              <Typography color={colors.greenAccent[500]} variant="h5">
                {userProfile["First Name"]} {userProfile["Last Name"]}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {Object.entries(userProfile).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "16px" }}
        onClick={() => navigate("/update-user")}
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default UserProfileDisplay;
