import { Box, Typography, useTheme, useMediaQuery, IconButton, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");


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
        <Typography  fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }} ml="80px">
          Welcome to MLCS Client & Admin Management Platform
        </Typography>
        <Box
          display="flex"
          gap="10px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          alignItems="left"
        >

          <Box
          width="90%"
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          sx={{ gridColumn: "span 2" }}
          >
            <Button
              fullWidth
              type="submit"
              color="secondary"
              variant="contained"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.secondary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => {
                navigate("/reservation");
              }}
            >
              <>
              <Typography variant="h5" fontWeight="100">BOOK A RESERVATION OR  OPPOINTMENT</Typography>
              </>
            </Button>
          </Box>
          <Box
          width="100%"
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          sx={{ gridColumn: "span 2" }}
          >
            <Button
              fullWidth
              type="submit"
              color="secondary"
              variant="contained"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.secondary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => {
                navigate("/Login");
              }}
            >
              <>
              <Typography variant="h5" fontWeight="100">LOGIN (FOR ADMINISTRATORS ONLY)</Typography>
              </>
            </Button>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
