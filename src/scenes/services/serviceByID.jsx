import React, { useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useGetServicesByIdsQuery } from "../../state/api";
import { tokens } from "../../theme";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const ServiceByID = () => {
  const location = useLocation();
  const selectedServiceIds = useMemo(
    () => location.state?.selectedServiceIds || [],
    [location.state?.selectedServiceIds]
  );
  const { data, isLoading } = useGetServicesByIdsQuery(selectedServiceIds);
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const commonColumns = [{ field: "id", headerName: "ID", flex: 1 }];

  // Create dynamic service columns based on the selected services
  const clientColumns = selectedServiceIds.map((serviceId, index) => ({
    field: `service${index + 1}`,
    headerName: `Service ${index + 1}`,
    flex: 2,
  }));

  const columns = [...commonColumns, ...clientColumns];

  const rows =
    data && data.length > 0
      ? Object.keys(data[0]).map((property) => ({
          id: property,
          property,
          ...data.reduce((services, service, index) => {
            services[`service${index + 1}`] = service[property];
            return services;
          }, {}),
        }))
      : [];
  useEffect(() => {}, [selectedServiceIds]); // Add dependencies based on your logic

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SERVICES"
          subtitle="View more data on selected services"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/services">Back To Services List</Link>
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/service-form">Initiate a new service</Link>
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

export default ServiceByID;
