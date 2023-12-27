import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useGetDashboardQuery } from "../../state/api";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: userDashboard, isLoading } = useGetDashboardQuery();

  console.log("userDashboard: ", userDashboard);

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
        <Header title="DASHBOARD" subtitle="Welcome to dashboard" />

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
          gridColumn="span 4"
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
          gridColumn="span 4"
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
          gridColumn="span 4"
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
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 12"
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
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Services
            </Typography>
          </Box>
          {userDashboard.recent_services.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.client_name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.currency}
                {transaction.total_cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
