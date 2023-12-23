import { Box, Button, Checkbox } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link} from "react-router-dom";
import { useGetClientsQuery } from "../../state/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActivateClientMutation } from "../../state/api";
import { useDeactivateClientMutation } from "../../state/api";

const Clients = () => {
  const { data, isLoading, refetch } = useGetClientsQuery();
  const [activateClient, { isLoading: isActivating }] = useActivateClientMutation();
  const [deactivateClient, { isLoading: isDeactivating }] = useDeactivateClientMutation();

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedClientIds, setSelectedClientIds] = useState([]);

  const handleSelectionChange = (id) => {
    setSelectedClientIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleActivateClick = async (activate) => {
    try {
      // Map over selectedClientIds and activate or deactivate each client
      const promises = selectedClientIds.map(async (clientId) => {
        await activateClient(clientId);
      });
      // Wait for all promises to resolve
      await Promise.all(promises);

      // Activation or deactivation successful
      await refetch(); // Refetch the client list after activation or deactivation
    } catch (error) {
      // Handle error
      console.error("Error activating/deactivating clients:", error);
    }
  };

  const handleDeactivateClick = async () => {
    try {
      // Map over selectedClientIds and deactivate each client
      const promises = selectedClientIds.map(async (clientId) => {
        await deactivateClient(clientId);
      });
      // Wait for all promises to resolve
      await Promise.all(promises);

      // Deactivation successful
      refetch(); // Refetch the client list after deactivation
    } catch (error) {
      // Handle error
      console.error("Error deactivating clients:", error);
    }
  };

  const handleViewMoreClick = () => {
    console.log("View More clicked for selected client IDs:", selectedClientIds);
    navigate("/clients-id", {
      state: {selectedClientIds},
    });
  };

  const columns = [
    {
      field: "selection",
      headerName: "Select",
      renderCell: (params) => (
        <Checkbox
          checked={selectedClientIds.includes(params.id)}
          onChange={() => handleSelectionChange(params.id)}
        />
      ),
      flex: 0.5,
    },
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "FirstName", headerName: "First Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "LastName", headerName: "Last Name", flex: 1 },
    { field: "passportIdNumber", headerName: "Passport ID Number", flex: 1 },
    { field: "countryOfIssue", headerName: "Country of Issue", flex: 1 },
    { field: "clientContactPhone", headerName: "Client Contact Phone", flex: 1 },
    { field: "clientEmail", headerName: "Client Email", flex: 1 },
    { field: "preferredLanguage", headerName: "Preferred Language", flex: 1 },
    { field: "isActive", headerName: "Is Active", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTS" subtitle="Managing All Clinets" />
        <Box display="flex" justifyContent="left" mt="20px" ml="10px" >
          <Button
            marginRight="10px"
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleViewMoreClick}
            disabled={selectedClientIds.length === 0}
          >
            View More on Selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px" >
          <Button
            marginRight="10px"
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => handleActivateClick(false)}
            disabled={selectedClientIds.length !== 1 || isActivating}
          >
            Select To Activate
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px" >
          <Button
            marginRight="10px"
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => handleDeactivateClick()}
        disabled={selectedClientIds.length !== 1 || isDeactivating}
          >
            Select To Deactivate
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          
          <Button type="submit" color="secondary" variant="contained" marginLeft="10px">
            <Link to="/client-form">
              Register a New Client
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Clients;
