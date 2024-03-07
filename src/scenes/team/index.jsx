import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../state/api";
import { useActivateUserMutation } from "../../state/api";
import { useDeactivateUserMutation } from "../../state/api";
import { useState } from "react";
import { toast } from "react-toastify";

const Team = () => {
  const { data, isLoading, refetch } = useGetUsersQuery();
  const [activateUser, { isLoading: isActivating }] =
    useActivateUserMutation();
  const [deactivateUser, { isLoading: isDeactivating }] = useDeactivateUserMutation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleActivateClick = async () => {
    try {
      const promises = selectedUserIds.map(async (userId) => {
        const response = await activateUser(userId);
        if (response.error) {
          toast.error(response.error?.data?.message);
        } else {
          toast.success(response.data?.message);
        }
      });

      await Promise.all(promises);
      refetch();
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const handleDeactivateClick = async () => {
    try {
      const promises = selectedUserIds.map(async (userId) => {
        const response = await deactivateUser(userId);
        if (response.error) {
          toast.error(response.error?.data?.message);
        } else {
          toast.success(response.data?.message);
        }
      });

      await Promise.all(promises);
      refetch();
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedUserIds(selectionModel);
  };

  const columns = [
    { field: "UserID", headerName: "ID", flex: 0.25 },
    {
      field: "FirstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "LastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "NationalID",
      headerName: "National ID",
      flex: 1,
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact Phone",
      flex: 1,
    },

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
            <Typography color={colors.grey[100]}>{isActive ? "Yes" : "No"}</Typography>
          </Box>
        );
      },
    },
    {
      field: "registrarName",
      headerName: "Registrar Name",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { accessLevel } }) => {
        return (
          <Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              accessLevel === "admin"
                ? colors.greenAccent[900]
                : accessLevel === "manager"
                ? colors.greenAccent[800]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {accessLevel === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {accessLevel === "manager" && <SecurityOutlinedIcon />}
            {accessLevel === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {accessLevel}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleActivateClick}
            disabled={selectedUserIds.length !== 1 || isActivating}
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
            disabled={selectedUserIds.length !== 1 || isDeactivating}
          >
            Deactivate Selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/user-form">Create New User</Link>
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
          getRowId={(row) => row.UserID}
          rows={data || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </Box>
  );
};

export default Team;
