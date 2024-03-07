import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetClientsQuery } from "../../state/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActivateClientMutation } from "../../state/api";
import { useDeactivateClientMutation } from "../../state/api";
import { toast } from "react-toastify";

const Clients = () => {
  const { data, isLoading, refetch } = useGetClientsQuery();
  const [activateClient, { isLoading: isActivating }] =
    useActivateClientMutation();
  const [deactivateClient, { isLoading: isDeactivating }] =
    useDeactivateClientMutation();

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedClientIds, setSelectedClientIds] = useState([]);

  const handleActivateClick = async (activate) => {
    try {
      const promises = selectedClientIds.map(async (clientId) => {
        const response = await activateClient(clientId);
        if (response.error) {
          toast.error(response.error?.data?.message);
        } else {
          toast.success(response.data?.message);
        }
      });
      await Promise.all(promises);

      await refetch();
    } catch (error) {
      console.error("Error activating/deactivating clients:", error);
    }
  };

  const handleDeactivateClick = async () => {
    try {
      const promises = selectedClientIds.map(async (clientId) => {
        const response = await deactivateClient(clientId);
        if (response.error) {
          toast.error(response.error?.data?.message);
        } else {
          toast.success(response.data?.message);
        }
      });
      await Promise.all(promises);

      refetch();
    } catch (error) {
      console.error("Error deactivating clients:", error);
    }
  };

  const handleViewMoreClick = () => {
    navigate("/clients-id", {
      state: { selectedClientIds },
    });
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedClientIds(selectionModel);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "passportIdNumber", headerName: "Passport ID Number", flex: 1 },
    { field: "countryOfIssue", headerName: "Country of Issue", flex: 1 },
    { field: "clientContact", headerName: "Client Contact Phone", flex: 1 },
    { field: "clientEmail", headerName: "Client Email", flex: 1 },
    { field: "preferredLanguage", headerName: "Language", flex: 1 },
    { field: "isActive", headerName: "Is Active", flex: 1, renderCell: ({ row: { isActive } }) => {
      return (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            isActive ? colors.greenAccent[600] : colors.redAccent[600]
          }
          borderRadius="4px"
        >
          <Typography color={colors.grey[100]}>{isActive ? "Yes" : "No"}</Typography>
        </Box>
      );
    },  },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTS" subtitle="Managing All Clinets" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleViewMoreClick}
            disabled={selectedClientIds.length === 0}
          >
            Select Client to view More
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleActivateClick}
            disabled={selectedClientIds.length !== 1 || isActivating}
          >
            Activate Selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleDeactivateClick}
            disabled={selectedClientIds.length !== 1 || isDeactivating}
          >
            Deactivate Selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/client-form">Register a New Client</Link>
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
          checkboxSelection
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </Box>
  );
};

export default Clients;
