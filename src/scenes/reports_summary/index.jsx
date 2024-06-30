import { Box, useTheme, Button, Dialog, DialogContent, DialogActions, Typography, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useGetReportsQuery, useDeleteReportMutation } from "../../state/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PdfViewerDialog from "../../utils/PdfViewerDialog";
import { toast } from "react-toastify";

const Reports = () => {
  const { data, isLoading, refetch } = useGetReportsQuery();
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || isDeleting) {
      setLoadingDialogOpen(true);
    } else {
      setLoadingDialogOpen(false);
    }
  }, [isLoading, isDeleting]);

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
    setLoadingDialogOpen(true);
    await handleDeleteClick();
    setLoadingDialogOpen(false);
  };

  const handleDeleteClick = async () => {
    try {
      const promises = selectedReportIds.map(async (reportId) => {
        const response = await deleteReport(reportId);
        if (response.error) {
          toast.error(response.error?.data?.message);
        } else {
          toast.success(response.data?.message);
        }
      });
      await Promise.all(promises);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateConfirmation = async () => {
    handleConfirmationClose();
    navigate("/update-report", {
      state: { selectedReportIds },
    });
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedReportIds(selectionModel);
  };

  const handleViewMoreClick = () => {
    navigate("/report-id", {
      state: { selectedReportIds },
    });
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "title",
      headerName: "Report Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "reporter_name",
      headerName: "Reporter",
      flex: 1,
    },
    {
      field: "client_reportee_name",
      headerName: "Client Related",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Reporting Date",
      flex: 1,
    },
    {
      field: "report_file",
      headerName: "Report File",
      flex: 1,
      renderCell: (params) =>
        params.row.report_file ? (
          <PdfViewerDialog file={params.row.report_file} />
        ) : (
          <Box variant="contained">No File</Box>
        ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Reports" subtitle="List of Reports" />
        <Box display="flex" justifyContent="left" mt="20px" ml="10px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleViewMoreClick}
            disabled={selectedReportIds.length === 0}
          >
            Select Report to view More
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => handleConfirmationOpen("delete")}
            disabled={selectedReportIds.length === 0 || isDeleting}
          >
            Delete Selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => handleConfirmationOpen("update")}
            disabled={selectedReportIds.length === 0}
          >
            Update Selected
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/reports-form">Create a Report</Link>
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
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <Typography>
            {confirmationAction === "delete"
              ? "Are you sure you want to delete the selected report(s)?"
              : confirmationAction === "update"
              ? "Are you sure you want to update the selected report(s)?"
              : null}
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
              onClick={
                confirmationAction === "delete"
                  ? handleDeleteConfirmation
                  : confirmationAction === "update"
                  ? handleUpdateConfirmation
                  : null
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

export default Reports;
