import {
    Box,
    useTheme,
    Button,
  } from "@mui/material";
  import { DataGrid, GridToolbar } from "@mui/x-data-grid";
  import { tokens } from "../../theme";
  import Header from "../../components/Header";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { useGetFutureReservationsQuery } from "../../state/api";
  
  const ClientFutureReservations = () => {
    const { data, isLoading, refetch } = useGetFutureReservationsQuery();
    const navigate = useNavigate();
  
    if (data) {
      console.log(data);
    } else {
      console.log("no data available")
    }
    
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "id", headerName: "ID", flex: 0.2 },
      {
        field: "fullName",
        headerName: "Client",
        flex: 1.5,
      },
      {
        field: "clientContact",
        headerName: "Contact",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "reserved_period",
        headerName: "Reserved On",
        cellClassName: "name-column--cell",
        flex: 1.7,
      },
      {
        field: "servicesToDiscuss",
        headerName: "services To Discuss",
        flex: 2,
      },
      {
        field: "otherServices",
        headerName: "Others To Discuss",
        flex: 1.3,
      },
    ];
  
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
          checkboxSelection
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    );
  };
  
  export default ClientFutureReservations;
  