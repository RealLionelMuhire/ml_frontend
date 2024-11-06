import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import WeeklyRepForm from "./WeeklyRepForm"; // Import your form component
import { v4 as uuidv4 } from "uuid";

const ReportTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [reportData, setReportData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "taskName", headerName: "Task Name", flex: 2 },
    { field: "taskDescription", headerName: "Task Description", flex: 2 },
    { field: "progress", headerName: "Progress", flex: 2 },
    { field: "challenges", headerName: "Challenges", flex: 2 },
    { field: "dateTime", headerName: "Date and Time", flex: 3 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteRow(params.id)}
          sx={{
            backgroundColor: colors.redAccent[400],
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const calculateHeight = () => {
    return 90 + reportData.length * 65;
  };

  const calculateWidth = () => {
    return 200 + columns.length * 120;
  };

  // Handle adding a new row from the form data
  const handleFormSubmit = (newData) => {
    const newDataWithId = { ...newData, id: uuidv4() }; // Assign a unique ID when adding
    setReportData((prevData) => [...prevData, newDataWithId]);
    setIsFormVisible(false); // Hide the form after submission
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setIsFormVisible(false);
  };

  // Handle deleting a row
  const handleDeleteRow = (id) => {
    setReportData((prevData) => prevData.filter((row) => row.id !== id));
  };

  // Handle row edit commit
  const handleRowEditCommit = (params) => {
    const updatedData = reportData.map((row) =>
      row.id === params.id ? { ...row, [params.field]: params.value } : row
    );
    setReportData(updatedData);
  };

  return (
    <Box width="100%">
      <Box
        m="20px"
        height={`${calculateHeight()}px`}
        width={`${calculateWidth()}px`}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `2px solid ${colors.grey[400]}`,
            borderRight: `1px solid ${colors.grey[400]}`,
            borderLeft: `1px solid ${colors.grey[400]}`,
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 1,
          },
          "& .MuiDataGrid-cell--editing": {
            bgcolor: "rgb(255,215,115, 0.19)",
            color: "#1a3e72",
          },
          "& .Mui-error": {
            bgcolor: (theme) =>
              `rgb(126,10,15, ${theme.palette.mode === "dark" ? 0 : 0.1})`,
            color: (theme) =>
              theme.palette.mode === "dark" ? "#ff4343" : "#750f0f",
          },
        }}
      >
        <DataGrid
          rows={reportData} // Use reportData directly, as it already has IDs
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          onRowEditCommit={handleRowEditCommit}
        />
      </Box>

      <Box display="flex" justifyContent="flex-start" m="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormVisible(!isFormVisible)}
          sx={{
            backgroundColor: colors.greenAccent[400],
          }}
        >
          {isFormVisible ? "Close Form" : "Add Task"}
        </Button>
      </Box>

      {isFormVisible && (
        <Box mt={2}>
          <WeeklyRepForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            handleCancel={handleFormCancel}
          />
        </Box>
      )}
    </Box>
  );
};

export default ReportTable;
