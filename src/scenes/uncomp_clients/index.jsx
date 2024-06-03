import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useGetUncompleteClientsQuery,
  useDeleteUncompleteClientMutation,
} from "../../state/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { toast } from "react-toastify";

const IncompleteClients = () => {
  const { data, isLoading, refetch } = useGetUncompleteClientsQuery();
  const [deleteClient, { isLoading: isDeleting }] =
    useDeleteUncompleteClientMutation();

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

  const handleConfirmationOpen = (action) => {
    setConfirmationAction(action);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationAction(null);
    setConfirmationDialogOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    handleConfirmationClose();
    await handleDeleteClick();
  };

  const handleViewMoreClick = () => {
    navigate("/incomplete-client-form", {
      state: { selectedClientIds },
    });
  };

  const handleDeleteClick = async () => {
    try {
      const promises = selectedClientIds.map(async (clientId) => {
        const response = await deleteClient(clientId);
        if (response.error) {
          toast.error(response.error?.data?.message);
        } else {
          toast.success(response.data?.message);
        }
      });
      await Promise.all(promises);
      refetch();
    } catch (error) {
      toast.error("Error deleting clients");
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedClientIds(selectionModel);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "NameOfEntity", headerName: "Entity Name", flex: 1 },
    {
      field: "firstName",
      headerName: "Representative First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Representative Last Name",
      flex: 1,
      hide: true,
    },
    { field: "email", headerName: "Representitive Email", flex: 1 },
    { field: "SectorOfEntity", headerName: "Sector of Entity", flex: 1 },
    { field: "CathegoryOfEntity", headerName: "Cathegory of Entity", flex: 1 },
    { field: "SPVType", headerName: "SPV Type", flex: 1, hide: true },
    {
      field: "passportIdNumber",
      headerName: "Passport ID Number",
      flex: 1,
      hide: true,
    },
    {
      field: "countryOfIssue",
      headerName: "Country of Issue",
      flex: 1,
      hide: true,
    },
    {
      field: "clientContact",
      headerName: "Client Contact Phone",
      flex: 1,
      hide: true,
    },
    { field: "clientEmail", headerName: "Client Email", flex: 1, hide: true },
    { field: "preferredLanguage", headerName: "Language", flex: 1, hide: true },
    {
      field: "isActive",
      headerName: "Is Active",
      flex: 1,
      renderCell: ({ row: { isActive } }) => {
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
            <Typography color={colors.grey[100]}>
              {isActive ? "Yes" : "No"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="INCOMPLETE REGISTRATION CLIENTS"
          subtitle="Showing All IncompleteClients yet to complete their registration"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => handleConfirmationOpen("delete")}
            disabled={selectedClientIds.length === 0 || isDeleting}
          >
            Delete Selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleViewMoreClick}
            disabled={selectedClientIds.length === 0}
          >
            Select Client to Complete the registration
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/clients">Completed Registrations</Link>
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
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationClose}
        maxWidth="xs"
        fullWidth
      >
        {/* <DialogTitle>Confirmation</DialogTitle> */}
        <DialogContent>
          <Typography>
            {confirmationAction === "activate"
              ? "Are you sure you want to activate the selected client?"
              : "Are you sure you want to deactivate the selected client?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" p={2} gap="20px">
            <Button
              onClick={handleConfirmationClose}
              color="secondary"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirmation}
              color="secondary"
              variant="contained"
              disabled={isDeleting}
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IncompleteClients;
