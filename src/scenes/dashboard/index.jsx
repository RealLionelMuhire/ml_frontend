import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import MessageIcon from "@mui/icons-material/Traffic"
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useGetDashboardQuery } from "../../state/api";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: userDashboard, isLoading } = useGetDashboardQuery();

  // Check if userProfile is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if userProfile is undefined
  if (!userDashboard) {
    return <div>User dashboard data available</div>;
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOME" subtitle="Welcome to ML Corporate Services" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userDashboard.total_services}
            subtitle="Services provided"
            progress={userDashboard.increase_rate_services}
            increase={`${userDashboard.increase_rate_services_percentage}%`}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userDashboard.total_clients}
            subtitle="New Clients"
            progress={userDashboard.increase_rate_clients}
            increase={`${userDashboard.increase_rate_clients_percentage}%`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="0"
            subtitle="Website Traffic"
            progress="#"
            increase="#"
            icon={
              <MessageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userDashboard.total_reservations}
            subtitle="Reservations"
            progress={userDashboard.increase_rate_reservations}
            increase={`${userDashboard.increase_rate_reservations_percentage}%`}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>
        
{/* recent services */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
              Recent Services
            </Typography>
          </Box>
          {userDashboard.recent_services.map((transaction, i) => (
          <Box
            flex="1"
            paddingRight="15px"
            borderRight={`4px solid ${colors.primary[500]}`}
          >
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box
                flex="1"
                paddingRight="15px"
                borderRight={`4px solid ${colors.primary[500]}`}
              >
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.client_name}
                </Typography>
                <Typography color={colors.grey[100]} variant="h5">
                  {transaction.user}
                </Typography>
              </Box>
              <Box
                color={colors.grey[100]}
                flex="1"
                paddingLeft="15px"
                borderRight={`4px solid ${colors.primary[500]}`}
              >
                <Typography color={colors.grey[100]} variant="h5">
                  {transaction.date}
                </Typography>
              </Box>
              <Box
                flex="1"
                paddingLeft="15px"
              >
                <Typography variant="h5">
                  {transaction.currency}
                  {" "}{transaction.total_cost}
                </Typography>
              </Box>
            </Box>
            </Box>
          ))}
        </Box>

        {/* recent bookings */}

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
              Next Bookings
            </Typography>
          </Box>
          {userDashboard.oldest_reservations.map((booking, i) => (
            <Box
              key={`${booking.txId}-${i}`}
              display="flex"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box
                flex="2.3"
                paddingRight="15px"
                borderRight={`4px solid ${colors.primary[500]}`} // Add this line
              >
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {booking.name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {booking.user}
                </Typography>
              </Box>
              <Box
                flex="4.5"
                paddingLeft="15px"
                borderRight={`4px solid ${colors.primary[500]}`}
              >
                <Typography variant="h6">
                  {booking.reserved_period}
                </Typography>
              </Box>
              <Box
                flex="3"
                paddingLeft="15px"
              >
                <Typography variant="h5">
                  {booking.service_to_discuss}
                  {" "}{booking.other_services}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
