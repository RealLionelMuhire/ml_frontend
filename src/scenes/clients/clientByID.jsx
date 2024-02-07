import React, { useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useGetClientsByIdsQuery } from "../../state/api";
import { tokens } from "../../theme";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const ClientWithID = () => {
  const location = useLocation();
  const selectedClientIds = useMemo(
    () => location.state?.selectedClientIds || [],
    [location.state?.selectedClientIds]
  );
  const { data, isLoading } = useGetClientsByIdsQuery(selectedClientIds);
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const commonColumns = [{ field: "id", headerName: "ID", flex: 1 }];

  // Create dynamic client columns based on the selected clients
  const clientColumns = selectedClientIds.map((clientId, index) => ({
    field: `client${index + 1}`,
    headerName: `Client ${index + 1}`,
    flex: 2,
    renderCell: (params) => {
      // Check if the cell data is a link to a PDF file
      const isPdfLink = typeof params.value === 'string' && params.value.endsWith(".pdf");
  
      if (isPdfLink) {
        return (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Download PDF
          </a>
        );
      }
  
      return params.value;
    },
  }));
  

  const columns = [...commonColumns, ...clientColumns];

  const rows =
  data && data.length > 0
    ? Object.keys(data[0]).map((property) => ({
        id: property,
        property,
        ...data.reduce((clients, client, index) => {
          clients[`client${index + 1}`] = client[property];
          return clients;
        }, {}),
      }))
    : [];


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTS" subtitle="View more data on selected clients" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/clients">Back To Clients List</Link>
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/client-form">Register a new client</Link>
          </Button>
        </Box>
      </Box>

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
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ClientWithID;

