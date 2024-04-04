import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthLandingClient = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/client-dashboard");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the logged in page!</h1>
            <CircularProgress size={40} color="inherit" />
        </div>
    );
};

export default AuthLandingClient;
