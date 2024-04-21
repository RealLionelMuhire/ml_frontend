import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const FinancialForecastTable = ({
  financialData,
  handleFinancialDataChange,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "description", headerName: "", width: 200 },
    {
      field: "financialForecast_year1",
      headerName: "YEAR 1",
      width: 150,
      editable: true,
      cellClassName: "editable-cell",
    },
    {
      field: "financialForecast_year2",
      headerName: "YEAR 2",
      width: 150,
      editable: true,
      cellClassName: "editable-cell",
    },
    {
      field: "financialForecast_year3",
      headerName: "YEAR 3",
      width: 150,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 0,
      description: "Currency",
      financialForecast_year1: "",
      financialForecast_year2: "",
      financialForecast_year3: "",
    },
    {
      id: 2,
      description: "Initial Investment",
      financialForecast_year1: "",
      financialForecast_year2: "",
      financialForecast_year3: "",
    },
    {
      id: 3,
      description: "Income from Business Activities",
      financialForecast_year1: "",
      financialForecast_year2: "",
      financialForecast_year3: "",
    },
    {
      id: 4,
      description: "Expenses",
      financialForecast_year1: "",
      financialForecast_year2: "",
      financialForecast_year3: "",
    },
    {
      id: 5,
      description: "Net Profit",
      financialForecast_year1: "",
      financialForecast_year2: "",
      financialForecast_year3: "",
    },
  ];

  return (
    <Box
      m="10px 0 0 0"
      height="47.5vh"
      sx={{
        gridColumn: "span 2",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
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
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        editMode="row"
        onEditCellChangeCommitted={handleFinancialDataChange}
        editRowsModel={{ id: "id", commit: "change", validation: "blur" }}
      />
    </Box>
  );
};

export default FinancialForecastTable;
