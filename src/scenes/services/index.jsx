import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../../state/api";
import { useCloseServiceMutation } from "../../state/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { data, isLoading, refetch } = useGetServicesQuery();
  const [closeService, { isLoading: isClosing }] = useCloseServiceMutation();
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmClose = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("file", file);

      const promises = selectedServiceIds.map(async (serviceId) => {
        try {
          const response = await closeService({ serviceId, formData });
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
      setOpenDialog(false); // Close the dialog after successful close
    } catch (error) {
      // Handle error
      toast.error("Error closing service:");
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedServiceIds(selectionModel);
  };

  const handleViewMoreClick = () => {
    navigate("/service-id", {
      state: { selectedServiceIds },
    });
  };

  // Helper function to format time in hours and minutes
  const formatTime = (hours) => {
    const totalMinutes = hours * 60;
    const formattedHours = Math.floor(totalMinutes / 60);
    const formattedMinutes = totalMinutes % 60;

    let result = "";
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
        <Typography
          color={params.row.is_active ? colors.greenAccent[500] : undefined}
        >
          {params.row.is_active
            ? "Still active"
            : `${params.row.currency} ${params.row.total_cost}`}
        </Typography>
      ),
    },
    {
      field: "total_elapsed_time",
      headerName: "Time spent",
      flex: 1,
      renderCell: (params) => (
        <Typography
          color={params.row.is_active ? colors.greenAccent[500] : undefined}
        >
          {params.row.is_active
            ? "Still active"
            : formatTime(params.row.total_elapsed_time)}
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Services" subtitle="List of Services" />
        <Box display="flex" justifyContent="left" mt="20px" ml="10px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleViewMoreClick}
            disabled={selectedServiceIds.length === 0}
          >
            Select Service to view More
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleOpenDialog}
            disabled={selectedServiceIds.length !== 1 || isClosing}
          >
            Close selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/services-form">Initiate a Service</Link>
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a short description and File (Optional)</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            multiline
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmClose}
            color="secondary"
            variant="outlined"
            disabled={!description.trim()}
          >
            Confirm Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Services;
