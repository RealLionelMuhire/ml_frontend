import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link} from "react-router-dom";
import { useGetServicesQuery } from "../../state/api";


const Services = () => {
  const { data, isLoading, error } = useGetServicesQuery();
  console.log('Data:', data);
  console.log('Error:', error);
  console.log('Loading:', isLoading);

  // Helper function to format time in hours and minutes
  const formatTime = (hours) => {
    const totalMinutes = hours * 60;
    const formattedHours = Math.floor(totalMinutes / 60);
    const formattedMinutes = totalMinutes % 60;

    let result = '';
    if (formattedHours > 0) {
      result += `${formattedHours}h `;
    }
    if (formattedMinutes > 0 || formattedHours === 0) {
      // Use toFixed(0) to remove decimal places
      result += `${formattedMinutes.toFixed(0)}min`;
    }

    return result;
};


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Service",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "provider_name",
      headerName: "Provider",
      flex: 1,
    },
    {
      field: "client_name",
      headerName: "Client",
      flex: 1,
    },
    {
      field: "total_cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.currency} {params.row.total_cost}
        </Typography>
      ),
    },
    {
      field: "total_elapsed_time",
      headerName: "Time spent",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {formatTime(params.row.total_elapsed_time)} {/* Convert hours to formatted time */}
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Services" subtitle="List of Services" />
      <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                <Link to="/services-form">
                  Inititiate a Service
                </Link>
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
        }}
      >
        <DataGrid checkboxSelection
        loading={isLoading || !data}
        getRowId={(row) => row.id}
        rows={data || []}
        columns={columns}
        components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Services;
