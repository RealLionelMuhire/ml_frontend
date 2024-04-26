import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const FinancialForecastTable2 = ({
  financialData,
  handleFinancialDataChange,
}) => {
  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "description", headerName: "FINANCIAL FORECAST", flex: 1 },
    { field: "year1", headerName: "YEAR 1", flex: 1, editable: true },
    { field: "year2", headerName: "YEAR 2", flex: 1, editable: true },
    { field: "year3", headerName: "YEAR 3", flex: 1, editable: true },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const rows = financialData.map((item, index) => ({
    ...item,
    id: index, // Add ID field
  }));

  return (
    <Box
      m="10px 0 0 0"
      height="47.5vh"
      sx={{
        gridColumn: "span 3",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${colors.grey[400]}`,
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
        onEditRowsModelChange={handleFinancialDataChange}
      />
    </Box>
  );
};

export default FinancialForecastTable2;
