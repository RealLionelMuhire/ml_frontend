import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PdfViewerDialog from "../../utils/PdfViewerDialog";
import { tokens } from "../../theme";

const ClientByID = ({ data, selectedClientIds }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Filter out unwanted fields
  const filteredData = data.map((item) => {
    const filteredItem = {};
    Object.keys(item).forEach((key) => {
      // Include "Expected Account Activity" and "Financial Forecast"
      if (key === "Expected Account Activity" || key === "Financial Forecast") {
        filteredItem[key] = item[key]?.map((file) => ({
          file_name: file.name || file.file_name,
          file_content: file.file_content || null, // Base64 content or parsed data
          file_object: file.file_object || null, // Actual file object
        })) || [];
      } else {
        // Include other fields normally
        filteredItem[key] = item[key];
      }
    });
    return filteredItem;
  });
  
  

  const columns = [
    { field: "property", headerName: "Property", flex: 1 },
    ...selectedClientIds.map((clientId, index) => ({
      field: `client${index + 1}`,
      headerName: `Client ${index + 1}`,
      flex: 2,
      renderCell: (params) => {
        const value = params.value;
  
        if (Array.isArray(value)) {
          // Render multiple files (array case)
          return (
            <Box display="flex" flexDirection="column">
              {value.map((file, idx) => (
                <PdfViewerDialog
                  key={idx}
                  file={{
                    file_name: file.name || file.file_name,
                    file_content: file.file_content || "",
                  }}
                />
              ))}
            </Box>
          );
        }
  
        if (value && typeof value === "object") {
          // Render single file (object case)
          return (
            <PdfViewerDialog
              file={{
                file_name: value.name || value.file_name,
                file_content: value.file_content || "",
              }}
            />
          );
        }
  
        // For other types (e.g., string or number)
        return typeof value === "string" || typeof value === "number" ? value : null;
      },
    })),
  ];
  
  
  const rows = filteredData
    ? Object.keys(filteredData[0]).map((key) => {
        const row = { id: key, property: key };
        filteredData.forEach((client, index) => {
          row[`client${index + 1}`] = client[key];
        });
        return row;
      })
    : [];

  return (
    <Box
      m="20px 0 -10 0"
      height="80vh"
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
        // pageSize={10}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default ClientByID;
