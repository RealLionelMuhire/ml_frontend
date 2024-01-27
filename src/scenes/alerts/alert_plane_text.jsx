import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useGetAlertQuery } from "../../state/api";

const AlertPage = () => {
  const { data, isLoading, isError } = useGetAlertQuery();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading alerts. Please try again.</div>;
  }

  // if (!data || data.length === 0) {
  //   console.log("No alerts found. Data:", data);
  //   return <div>No alerts found.</div>;
  // }

  return (
    <Box m="20px">
      <Header title="Alert List" subtitle="All Alerts Page" />

      {data.map((alert) => (
        <Accordion key={alert.id} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            <Box>
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5">
                  {alert.title}
                </Typography>
              </Box>
              <Box>
                <Typography style={{ display: 'flex', justifyContent: 'left', margin: '5px 0' }}>
                  {alert.is_active ? (
                    <span>
                      {/* Display <still active> once is_active=True */}
                      <strong>Still active</strong>
                    </span>
                  ) : alert.action_taken ? (
                    <span>
                      {/* If is_active=False and action_taken=True, display <done by alert.action_taker_name> */}
                      <strong>Done by {alert.action_taker_name}</strong>
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>
                      {/* If is_active=False and action_taken=False, display <expired> in red color */}
                      <strong>Expired</strong>
                    </span>
                  )}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{alert.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AlertPage;
