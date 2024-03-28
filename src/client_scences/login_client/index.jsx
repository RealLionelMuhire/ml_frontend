import { Box, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import Form from "./form";
import { useContext } from "react";
import { ColorModeContext} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const colorMode = useContext(ColorModeContext);
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
          ML Corporate Services
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography  fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }}>
          Welcome to ML Corporate Services
        </Typography>
        <Form/>
      </Box>
    </Box>
  );
};

export default Login;
