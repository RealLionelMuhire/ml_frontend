import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Menu, MenuItem, CircularProgress} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "../../state/api";
import {
  useActivateClientMutation,
  useDeactivateClientMutation,
  useDeleteClientMutation,
} from "../../state/api";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Clients = () => {
  const { data, isLoading, refetch } = useGetClientsQuery();
  const [activateClient, { isLoading: isActivating }] = useActivateClientMutation();
  const [deactivateClient, { isLoading: isDeactivating }] = useDeactivateClientMutation();
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle loading dialog state
  useEffect(() => {
    setLoadingDialogOpen(isLoading || isActivating || isDeactivating || isDeleting);
  }, [isLoading, isActivating, isDeactivating, isDeleting]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmationOpen = (action) => {
    setConfirmationAction(action);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationAction(null);
    setConfirmationDialogOpen(false);
  };

  const handleActivateConfirmation = async () => {
    handleConfirmationClose();
    await handleActivateClick(true);
  };

  const handleDeactivateConfirmation = async () => {
    handleConfirmationClose();
    await handleDeactivateClick();
  };

  const handleDeleteConfirmation = async () => {
    handleConfirmationClose();
    await handleDeleteClick();
  };

  const handleActivateClick = async () => {
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
      toast.error("Error activating clients");
    }
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
      toast.error(error);
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
    },
    { field: "email", headerName: "Representative Email", flex: 1 },
    { field: "isActive", headerName: "Is Active", flex: 1,
      renderCell: ({ row: { isActive } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={isActive ? colors.greenAccent[600] : colors.redAccent[600]}
          borderRadius="4px"
        >
          <Typography color={colors.grey[100]}>{isActive ? "Yes" : "No"}</Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button
          color="secondary"
          onClick={handleMenuOpen}
          aria-controls="action-menu"
          aria-haspopup="true"
          variant="contained"
          startIcon={<MoreVertIcon />}
        >
          Actions
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTS" subtitle="Managing All Clients" />
        <Box >
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="secondary"
            variant="contained"
            startIcon={<MoreVertIcon />}
          >
            Select for More Actions
          </Button>
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleConfirmationOpen("activate");
                handleMenuClose();
              }}
              disabled={selectedClientIds.length !== 1 || isActivating}
            >
              Activate Selected(1)
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleConfirmationOpen("deactivate");
                handleMenuClose();
              }}
              disabled={selectedClientIds.length !== 1 || isDeactivating}
            >
              Deactivate Selected(1)
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleConfirmationOpen("delete");
                handleMenuClose();
              }}
              disabled={selectedClientIds.length === 0 || isDeleting}
            >
              Delete Selected
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/clients-id", { state: { selectedClientIds } });
                handleMenuClose();
              }}
              disabled={selectedClientIds.length === 0}
            >
              View More On Selected
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/update-client", { state: { selectedClientIds } });
                handleMenuClose();
              }}
              disabled={selectedClientIds.length !== 1}
            >
              Modify Data On Selected(1)
            </MenuItem>
          </Menu>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained" >
            <Link to="/incomplete-clients">Incomplete Registrations</Link>
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
      <Dialog open={confirmationDialogOpen} onClose={handleConfirmationClose} maxWidth="xs" fullWidth>
        <DialogContent>
          <Typography>
            {confirmationAction === "activate"
              ? "Are you sure you want to activate the selected client?"
              : confirmationAction === "deactivate"
              ? "Are you sure you want to deactivate the selected client?"
              : "Are you sure you want to delete the selected client(s)?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" p={2} gap="20px">
            <Button onClick={handleConfirmationClose} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button
              onClick={
                confirmationAction === "activate"
                  ? handleActivateConfirmation
                  : confirmationAction === "deactivate"
                  ? handleDeactivateConfirmation
                  : handleDeleteConfirmation
              }
              color="secondary"
              variant="contained"
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog open={loadingDialogOpen}>
        <DialogContent>
          <CircularProgress size={60} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Clients;
