import React, { useState, useMemo } from "react";
import { Box, CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useGetReportListByIdsQuery } from "../../state/api";
import WeeklyRepByID from "./WeeklyRepByID";
import WeeklyRepByIDAccordion from "./WeeklyRepByIDAccordion";
import { useLocation } from "react-router-dom";

const WeeklyRepByIDParent = () => {
  const location = useLocation();
  const selectedReportIds = useMemo(
    () => location.state?.selectedReportIds || [],
    [location.state?.selectedReportIds]
  );
  const { data, isLoading, isError } = useGetReportListByIdsQuery(selectedReportIds);
  const [viewMode, setViewMode] = useState("table"); // "table" or "accordion"

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} color="inherit" />
      </Box>
    );
  }

  if (isError) {
    return <Box>Error loading reports. Please try again.</Box>;
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">

      <Header title="REPORT" subtitle="View more data on selected reports" />
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          <Link to="/reports">Back To Reports List</Link>
        </Button>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          <Link to="/reports-form">Create a new report</Link>
        </Button>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button onClick={() => setViewMode(viewMode === "table" ? "accordion" : "table")} color="secondary" variant="contained">
          Switch to {viewMode === "table" ? "Accordion" : "Table"} View
        </Button>
      </Box>
      </Box>
      {viewMode === "table" ? (
        <WeeklyRepByID data={data} selectedReportIds={selectedReportIds} />
      ) : (
        <WeeklyRepByIDAccordion data={data} selectedReportIds={selectedReportIds} />
      )}
    </Box>
  );
};

export default WeeklyRepByIDParent;
