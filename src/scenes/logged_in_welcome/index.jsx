import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthLandingUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
          }}>
            <h1>Welcome to MLCS admin portal</h1>
            <CircularProgress size={300} color="inherit" />
        </div>
    );
};

export default AuthLandingUser;
