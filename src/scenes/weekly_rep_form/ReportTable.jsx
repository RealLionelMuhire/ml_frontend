import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const ReportTable = ({ initialReportData = [] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to manage the rows data
  const [reportData, setReportData] = useState(initialReportData);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "dateTime",
      headerName: "Date & Time",
      width: 180,
      editable: true, // Enable editing
    },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 150,
      editable: true,
    },
    {
      field: "taskDescription",
      headerName: "Task Description",
      width: 300,
      editable: true,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 130,
      editable: true,
    },
    {
      field: "challenges",
      headerName: "Challenges",
      width: 300,
      editable: true,
    },
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

  // Convert the data to rows with IDs
  const rows = reportData.map((item, index) => ({
    ...item,
    id: index + 1, // Start IDs at 1
  }));

  const calculateHeight = () => {
    return 90 + rows.length * 55;
  };

  const calculateWidth = () => {
    return 200 + columns.length * 120;
  };

  // Handle adding a new row
  const handleAddRow = () => {
    const newRow = {
      id: reportData.length + 1,
      dateTime: "",
      taskName: "",
      taskDescription: "",
      progress: "",
      challenges: "",
    };
    setReportData((prevData) => [...prevData, newRow]);
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
    <Box m="10px 0 0 0">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          sx={{
            backgroundColor: colors.greenAccent[400],
          }}
        >
          Add Row
        </Button>
      </Box>

      <Box
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
            borderRight: `1px solid ${colors.grey[400]}`,
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellEditCommit={handleRowEditCommit} // Handle cell edits
        />
      </Box>
    </Box>
  );
};

export default ReportTable;
