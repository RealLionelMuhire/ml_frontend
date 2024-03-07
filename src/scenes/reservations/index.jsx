import { Box, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import Form from "./form";
import { useContext } from "react";
import { ColorModeContext} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { palette } = useTheme();

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="left"
        alignItems="right"
        ml="15px"
      >
        <img
        alt="logo"
        src={
          theme.palette.mode === 'light'
            ? `../../assets/white_theme_logo.png`
            : `../../assets/dark_theme_logo.png`
        }
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <IconButton onClick={colorMode.toggleColorMode}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
        </IconButton>
      </Box>

      <Box
        variant="contained"
        m="20px"
        width="100%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" justifyContent="left">
          ML Corporates Services
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }}>
          Fill the form below to book an appointment or a meeting
        </Typography>
        <Form />
        <Typography
          // color="secondary"
          mr="5px"
          fontWeight="500"
          variant="h5"
          onClick={() => {
            navigate("/");
          }}
          sx={{
            mb: "1.5rem",
            textDecoration: "underline",
            // color: palette.secondary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.secondary.light,
            },
          }}
        >
          Back to Home
      </Typography>
      </Box>
    </Box>
  );
};

export default Reservation;
