import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthLandingClient = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/client/dashboard");
        }, 3000);

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
            <h1>Welcome to MLCS Client portal</h1>
            <CircularProgress size={300} color="inherit" />
        </div>
    );
};

export default AuthLandingClient;
