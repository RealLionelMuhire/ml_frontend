import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PdfViewerDialog from "../../utils/PdfViewerDialog";
import { tokens } from "../../theme";

const ReportByID = ({ data, selectedReportIds }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "property", headerName: "Property", flex: 1 },
    ...selectedReportIds.map((reportId, index) => ({
      field: `report${index + 1}`,
      headerName: `Report ${index + 1}`,
      flex: 2,
      renderCell: (params) => {
        const value = params.value;
        if (typeof value === "object" && value?.file_name) {
          return <PdfViewerDialog file={value} />;
        }
        return value;
      },
    })),
  ];

  const rows = data
    ? Object.keys(data[0]).map((key) => {
        const row = { id: key, property: key };
        data.forEach((report, index) => {
          row[`report${index + 1}`] = report[key];
        });
        return row;
      })
    : [];

  return (
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
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
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default ReportByID;
