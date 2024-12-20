import React, { useState, useMemo } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useGetClientsByIdsQuery } from "../../state/api";
import ClientByID from "./clientByID";
import ClientByIDAccordion from "./clientByIDAccordion";
import { useLocation } from "react-router-dom";

const ClientByIDParent = () => {
    const location = useLocation();
    const selectedClientIds = useMemo(
        () => location.state?.selectedClientIds || [],
        [location.state?.selectedClientIds]
    );
    const { data, isLoading } = useGetClientsByIdsQuery(selectedClientIds);
    const [viewMode, setViewMode] = useState("table");
    console.log("Data=============>",data);
    
    if (isLoading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress size={60} color="inherit" />
        </Box>
        );
    }
    
    return (
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="CLIENT" subtitle="View more data on selected clients" />
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
                <Link to="/clients">Back To Clients List</Link>
            </Button>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
                <Link to="/client-form">Create a new client</Link>
            </Button>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button
                onClick={() =>
                setViewMode(viewMode === "table" ? "accordion" : "table")
                }
                color="secondary"
                variant="contained"
            >
                Switch to {viewMode === "table" ? "Accordion" : "Table"} View
            </Button>
            </Box>
        </Box>
        {viewMode === "table" ? (
            <ClientByID data={data} selectedClientIds={selectedClientIds} />
        ) : (
            <ClientByIDAccordion data={data} selectedClientIds={selectedClientIds} />
        )}
        </Box>
    );
    };

export default ClientByIDParent;