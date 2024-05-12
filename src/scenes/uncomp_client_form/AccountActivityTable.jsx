import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const AccountAtivityTable = ({
  accountActivityData,
  handleFinancialDataChange,
  setFieldValue,
}) => {
  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "description", headerName: "ACCOUNT ACTIVITY", flex: 1 },
    { field: "year1", headerName: "YEAR 1", flex: 1, editable: true },
    { field: "year2", headerName: "YEAR 2", flex: 1, editable: true },
    { field: "year3", headerName: "YEAR 3", flex: 1, editable: true },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const rows = accountActivityData.map((item, index) => ({
    ...item,
    id: index, // Add ID field
  }));

  const calculateHeight = () => {
    // Calculate height based on number of rows
    return 95 + rows.length * 55; // Adjust 50 and 52.5 according to your row height
  };

  const calculateWidth = () => {
    // Calculate width based on number of columns
    return 200 + columns.length * 120; // Adjust 100 and 150 according to your column width
  };

  return (
    <Box
      m="10px 0 0 0"
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
        onEditRowsModelChange={handleFinancialDataChange}
      />
    </Box>
  );
};

export default AccountAtivityTable;
