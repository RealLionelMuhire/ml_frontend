import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useGetReportsQuery } from "../../state/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileViewer from "../../utils/FileViewer";

const Reports = () => {
  const { data, isLoading } = useGetReportsQuery();
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const navigate = useNavigate();

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
      field: "report_link",
      headerName: "Report File",
      flex: 1,
      renderCell: (params) => <FileViewer url={params.row.report_link} />,
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
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/reports-form">Generate an Report</Link>
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

export default Reports;
