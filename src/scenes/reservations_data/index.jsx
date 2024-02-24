import {
  Box,
  useTheme,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useCloseAlertMutation } from "../../state/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetFutureReservationsQuery } from "../../state/api";

const ClientReservations = () => {
  const { data, isLoading, refetch } = useGetFutureReservationsQuery();
  const [closeAlert, { isLoading: isClosing }] = useCloseAlertMutation();
  const [selectedAlertIds, setSelectedAlertIds] = useState([]);
  const navigate = useNavigate();

  if (data) {
    console.log(data);
  } else {
    console.log("no data available")
  }
  
  const handleConfirmClose = async () => {
    try {
      const promises = selectedAlertIds.map(async (alertId) => {
        try {
          const response = await closeAlert({ alertId });
          if (response?.error) {
            toast.error(response.error?.data?.message);
          }
          if (response?.data) {
            toast.success(response.data?.message);
          }
        } catch (error) {
          toast.error(error);
        }
      });

      await Promise.all(promises);
      await refetch();
    } catch (error) {
      toast.error("Error closing alert:");
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedAlertIds(selectionModel);
  };

  const handleViewMoreClick = () => {
    navigate("/alert-id", {
      state: { selectedAlertIds },
    });
  };
  

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
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ClientReservations" subtitle="List of ClientReservations" />
        <Box display="flex" justifyContent="left" mt="20px" ml="10px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleViewMoreClick}
            disabled={selectedAlertIds.length === 0}
          >
            Select Alert to view More
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleConfirmClose}
            disabled={selectedAlertIds.length !== 1 || isClosing}
          >
            Take Action On selected Alert
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/alerts-form">Generate an Alert</Link>
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

export default ClientReservations;
