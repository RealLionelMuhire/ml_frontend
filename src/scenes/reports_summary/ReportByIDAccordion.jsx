import React from "react";
import {
  Box,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import PdfViewerDialog from "../../utils/PdfViewerDialog";

const ReportByIDAccordion = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!data || data.length === 0) {
    return <CircularProgress />;
  }

  // Helper function to create table rows from grouped data
  const createTableRowsFromGroupedData = (groupedData) => {
    return Object.keys(groupedData).map((key) => (
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {key}
        </TableCell>
        {groupedData[key].map((value, index) => (
          <TableCell key={index}>
            {typeof value === "object" && value?.file_name ? (
              <PdfViewerDialog file={value} />
            ) : (
              value
            )}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  // Group data by keys for each report
  const groupDataByKeys = (reports) => {
    const groupedData = {};
    reports.forEach((report, reportIndex) => {
      Object.keys(report).forEach((key) => {
        if (!groupedData[key]) {
          groupedData[key] = Array(reports.length).fill("");
        }
        groupedData[key][reportIndex] = report[key];
      });
    });
    return groupedData;
  };

  // Extract report summary data
  const reportSummaryData = groupDataByKeys(
    data.map((report) => ({
      id: report.id,
      title: report.title,
      description: report.description,
      "report link": report["report link"],
      "report file": report["report file"],
      "reported at": report["reported at"],
      "modified at": report["modified at"],
    }))
  );

  // Extract client data
  const clientData = groupDataByKeys(
    data.map((report) => ({
      "client reportee id": report["client reportee id"],
      "client reportee name": report["client reportee name"],
      "client reportee email": report["client reportee email"],
    }))
  );

  // Extract user data
  const userData = groupDataByKeys(
    data.map((report) => ({
      "reporter id": report["reporter id"],
      "reporter email": report["reporter email"],
      "reporter name": report["reporter name"],
      "last updated by name": report["last updated by name"],
      "last updated by id": report["last updated by id"],
      "last updated by email": report["last updated by email"],
    }))
  );

  return (
    <Box m="20px">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Report Summary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(reportSummaryData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Client Data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(clientData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            User Data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(userData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ReportByIDAccordion;
