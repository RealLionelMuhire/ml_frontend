import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {
  EmailOutlined,
  HandshakeOutlined,
  NotificationsActiveOutlined,
  SummarizeOutlined,
} from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import { useGetUserProfileQuery } from "../../state/api";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { data: userProfile, isLoading } = useGetUserProfileQuery();

  // Check if userProfile is still loading
  if (isLoading) {
    return (
      <div>
        <CircularProgress size={40} color="inherit" />
      </div>
    );
  }

  // Check if userProfile is undefined
  if (!userProfile) {
    return <div>User profile not available</div>;
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                mb="25px"
                display="flex"
                ml="15px"
                justifyContent="normal"
                alignItems="center"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <img
                    alt="logo"
                    src={
                      theme.palette.mode === "light"
                        ? `../../assets/white_theme_logo.png`
                        : `../../assets/dark_theme_logo.png`
                    }
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  ml="20px"
                  mr="10px"
                >
                  MLCS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box
              mb="25px"
              display="flex"
              ml="30px"
              justifyContent="normal"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                padding="10px"
              >
                <img
                  alt="logo"
                  src={
                    theme.palette.mode === "light"
                      ? `../../assets/white_user.jpeg`
                      : `../../assets/dark_user.jpeg`
                  }
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </Box>
              <Box mr="30px">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "5px 0 0 0" }}
                >
                  {userProfile["First Name"]} {userProfile["Last Name"]}
                </Typography>
                <Typography variant="h5" color={colors.grey[300]}>
                  {userProfile.Email}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home page"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <Item
              title="Clients Data"
              to="/clients"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Clients Contracts"
              to="/client-contracts"
              icon={<HandshakeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Services Data"
              to="/services"
              icon={<BusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reminders & Alerts"
              to="/alerts"
              icon={<NotificationsActiveOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Schedules & Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Appointments"
              to="/client-reservations"
              icon={<EmailOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* weekly reports */}
            

            {/* {userProfile["Access Level"] === "user" ? null : (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Users
                </Typography>
                <Item
                  title="Team & Users"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )} */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="Team & Users"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Reports
            </Typography>
            <Item
              title="Meeting & Events Summary"
              to="/reports"
              icon={<SummarizeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Weekly Reports"
              to="/weekly-reports"
              icon={<BackupTableIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
