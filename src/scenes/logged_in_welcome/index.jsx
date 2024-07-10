import { CircularProgress, Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthLandingUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress size={60} color="inherit" />
        </Box>
    );
};

export default AuthLandingUser;
