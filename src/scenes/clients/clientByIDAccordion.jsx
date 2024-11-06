import React from "react";
import {
  Box,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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

const ClientByIDAccordion = ({ data }) => {
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

  const renderFinancialForecastTable = (forecastData) => {
    if (!forecastData || forecastData.length === 0) {
      return <Typography>No Financial Forecast data available.</Typography>;
    }


    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Year 1</TableCell>
              <TableCell>Year 2</TableCell>
              <TableCell>Year 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecastData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.year1}</TableCell>
                <TableCell>{row.year2}</TableCell>
                <TableCell>{row.year3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };


  const renderExpectedAccountActivityTable = (expectedAccountActivityData) => {
    if (!expectedAccountActivityData || expectedAccountActivityData.length === 0) {
      return <Typography>No Expected Account Activity data available.</Typography>;
    }

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Year 1</TableCell>
              <TableCell>Year 2</TableCell>
              <TableCell>Year 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expectedAccountActivityData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.year1}</TableCell>
                <TableCell>{row.year2}</TableCell>
                <TableCell>{row.year3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const client = data[0];
  const financialForecast = client?.["Financial Forecast"] || [];
  const expectedAccountActivity = client?.["Expected Account Activity"] || [];

  const groupDataByKeys = (clients) => {
    const groupedData = {};
    clients.forEach((client, clientIndex) => {
      Object.keys(client).forEach((key) => {
        if (!groupedData[key]) {
          groupedData[key] = Array(clients.length).fill("");
        }
        groupedData[key][clientIndex] = client[key];
      });
    });
    return groupedData;
  };

  // const groupedData = groupDataByKeys(data);

  const clientDetailsData = groupDataByKeys(
    data.map((client) => ({
      id: client.id,
      "First Name": client["First Name"],
      "Last Name": client["Last Name"],
      "Tax Residency": client["Tax Residency"],
      "TIN Number": client["TIN Number"],
      Citizenship: client.Citizenship,
      "Birth Date": client["Birth Date"],
      "Country of Residence": client["Country of Residence"],
      "Passport ID Number": client["Passport ID Number"],
      "Country of Issue": client["Country of Issue"],
      "Share Percentage": client["Share Percentage"],
      "Current Address": client["Current Address"],
      "Client Contact": client["Client Contact"],
      "Client Email": client["Client Email"],
      "Preferred Language": client["Preferred Language"],
      "National ID": client["National ID"],
      Designation: client.Designation,

    }))
  )

  const introducerDetailsData = groupDataByKeys(
    data.map((client) => ({
      "Introducer Name": client["Introducer Name"],
      "Introducer Email": client["Introducer Email"],
    }))
  )

  const legalPersonDeatailsData = groupDataByKeys(
    data.map((client) => ({
      "Name of Entity": client["Name of Entity"],
      "Previous Name of Entity": client["Previous Name of Entity"],
      "Type of Entity": client["Type of Entity"],
      "Type of License": client["Type of License"],
      "Share Percentage": client["Share Percentage"],
      "Country of Incorporation": client["Country of Incorporation"],
      "Incorporation Date": client["Incorporation Date"],
      "Registered Office Address": client["Registered Office Address"],
      "Business Activity": client["Business Activity"],
      "Country of Operation": client["Country of Operation"],

    }))
  )

  const authorizedPersonToDealForLegalPersonData = groupDataByKeys(
    data.map((client) => ({
      "Authorised Name": client["Authorised Person Name"],
      "Authorised Email": client["Authorised Person Email"],
      "Authorised Person Contact": client["Authorised Person Contact"],
      "Authorised Current Address": client["Authorised Current Address"],
      "Authorised Relationship": client["Authorised Relationship"],
      "signature file": client["signature file"],
    }))
  )

  const PepStatus = groupDataByKeys(
    data.map((client) => ({
      "Is PEP(Policy Exposed Person)": client["Is PEP(Policy Exposed Person)"],
      "bankStatement file": client["bankStatement file"],
      "professionalReference file": client["professionalReference file"],
    }))
  )

  const otherBackgroundInfo = groupDataByKeys(
    data.map((client) => ({
      "Changed Name?": client["Changed Name?"],
      "Former Name": client["Former Name"],
      "Carries out financial services else?": client["Carries out financial services else?"],
      "Jurisdiction Name": client["Jurisdiction Name"],
      "Jurisdiction Address": client["Jurisdiction Address"],
      "Made Similar Application in Other Jurisdiction?": client["Made Similar Application in Other Jurisdiction?"],
      "Partner in Similar Application": client["Partner in Similar Application"],
      "Criticised, Cencured, Displined, Suspended, or Fined by Regulatory Body?": client["Criticised, Cencured, Displined, Suspended, or Fined by Regulatory Body?"],
      "Details of Criticism, Censure, Discipline, Suspension, or Fine": client["Details of Criticism, Censure, Discipline, Suspension, or Fine"],
      "Bankruptcy or Seisure Of Properties?": client["Bankruptcy or Seisure Of Properties?"],
      "Details of Bankruptcy or Seisure Of Properties": client["Details of Bankruptcy or Seisure Of Properties"],
      "Administrator appointed or failed to satisfy a debt?": client["Administrator appointed or failed to satisfy a debt?"],
      "Details of Administrator appointed or failed to satisfy a debt": client["Details of Administrator appointed or failed to satisfy a debt"],
      "Civil Proceedings ?": client["Civil Proceedings ?"],
      "Details of Civil Proceedings": client["Details of Civil Proceedings"],
      "Convicted of any Offence?": client["Convicted of any Offence?"],
      "Details of Conviction": client["Details of Conviction"],
      "Director Convicted of any Offence?": client["Director Convicted of any Offence?"],
      "Details of Director Conviction": client["Details of Director Conviction"],
    }))
  )

  const modeOfPaymentData = groupDataByKeys(
    data.map((client) => ({
    "Remitting Party": client["Remitting Party"],
    "Mode Of Payment": client["Mode Of Payment"],
    "Relationship With Applicant": client["Relationship With Applicant"],
    }))
  )

  const proposedNameData = groupDataByKeys(
    data.map((client) => ({
    "Proposed Name Option 1": client["Proposed Name Option 1"],
    "Proposed Name Option 2": client["Proposed Name Option 2"],
    "Proposed Name Option 3": client["Proposed Name Option 3"],
    }))
  )

  const companyDetailsData = groupDataByKeys(
    data.map((client) => ({
      "Proposed Activity": client["Proposed Activity"],
      "Target Sectors": client["Target Sectors"],
      "Targeted Countries": client["Targeted Countries"],
      "Special License?": client["Special License?"],
      "Secretary": client["Secretary"],
      "Product Service": client["Product Service"],
      "Business Address": client["Business Address"],
      }))
    )

    const shareHoldingData = groupDataByKeys(
      data.map((client) => ({
        "Share Holding": client["Share Holding"],
        "Share Type": client["Share Type"],
        "Share Number": client["Share Number"],
      }))
    )

    const sourceOfFundsData = groupDataByKeys(
      data.map((client) => ({
        "Source of Funds": client["Source of Funds"],
        "Other Source of Funds": client["Other Source of Funds"],
        "Country Source of Funds": client["Country Source of Funds"],
        "Net Annual Income": client["Net Annual Income"],
        "Estimated Net Worth": client["Estimated Net Worth"],
      }))
    )

    const filesAttachedData = groupDataByKeys(
      data.map((client) => ({
    "confirmationLetter file": client["confirmationLetter file"],
    "custody accounts file": client["custody accounts file"],
    "source of funds file": client["source of funds file"],
    "payslips file": client["payslips file"],
    "due diligence file": client["due diligence file"],
    "financial statements file": client["financial statements file"],
    "proof of ownership file": client["proof of ownership file"],
    "lease agreement file": client["lease agreement file"],
    "documentary evidence file": client["documentary evidence file"],
    "bank statement proceeds file": client["bank statement proceeds file"],
    "bank statement file": client["bank statement file"],
    "cdd documents file": client["cdd documents file"],
    "bank statements file": client["bank statements file"],
    "bank statements proceeds file": client["bank statements proceeds file"],
    "notarised documents file": client["notarised documents file"],
    "letter from donor file": client["letter from donor file"],
    "donor source of wealth file": client["donor source of wealth file"],
    "donor bank statement file": client["donor bank statement file"],
    "letter from relevant org file": client["letter from relevant org file"],
    "lottery bank statement file": client["lottery bank statement file"],
    "creditor agreement file": client["creditor agreement file"],
    "creditor cdd file": client["creditor cdd file"],
    "creditor bank statement file": client["creditor bank statement file"],
    "legal document file": client["legal document file"],
    "notary letter file": client["notary letter file"],
    "executor letter file": client["executor letter file"],
    "loan agreement file": client["loan agreement file"],
    "loan bank statement file": client["loan bank statement file"],
    "related third party loan agreement file": client["related third party loan agreement file"],
    "related third party cdd file": client["related third party cdd file"],
    "related third party bank statement file": client["related third party bank statement file"],
    "unrelated third party loan agreement file": client["unrelated third party loan agreement file"],
    "unrelated third party cdd file": client["unrelated third party cdd file"],
    "unrelated third party bank statement file": client["unrelated third party bank statement file"],
    "signed letter from notary file": client["signed letter from notary file"],
    "property contract file": client["property contract file"],
    "insurance pay out file": client["insurance pay out file"],
    "retirement annuity fund statement file": client["retirement annuity fund statement file"],
    "passport file": client["passport file"],
    "utility file": client["utility file"],
    "wealth file": client["wealth file"],
    "cv file": client["cv file"],
    "funds file": client["funds file"],
    "source of wealth file": client["source of wealth file"],
    "financialStatements file": client["financialStatements file"],
    "principals identification file": client["principals identification file"],
    "shareholders file": client["shareholders file"],
    "declaration of trust file": client["declaration of trust file"],
    "certificate of registration file": client["certificate of registration file"],
    "deed of retirement file": client["deed of retirement file"],
    "business plan file": client["business plan file"],
    "registered office file": client["registered office file"],
    "register of trustee file": client["register of trustee file"],
    "proof of source of funds file": client["proof of source of funds file"],
    "proof of source of wealth file": client["proof of source of wealth file"],
    "latest accounts or bank statements file": client["latest accounts or bank statements file"],
    "licence file": client["licence file"],
    "certificate of incumbency file": client["certificate of incumbency file"],
    "charter file": client["charter file"],
    "latest accounts file": client["latest accounts file"],
    "identification documents of the principals of the foundation file": client["identification documents of the principals of the foundation file"],
      }))
    )

    const sourceOfWealthData = groupDataByKeys(
      data.map((client) => ({
        "sourceOfWealth": client["sourceOfWealth"],
        "otherSourceOfWealth": client["otherSourceOfWealth"],
        "countrySourceWealth": client["countrySourceWealth"],
        "bankInvolvedWealth": client["bankInvolvedWealth"],
      }))
    )

    const mlDirectorshipData = groupDataByKeys(
      data.map((client) => ({
        'Officers of ML Corporate Services act as Director?': client['Officers of ML Corporate Services act as Director?'],
      }))
    )

    const mlDirector1Data = groupDataByKeys(
        data.map((client) => ({
          "Director 1 First Name": client["Director 1 First Name"],
          "Director 1 Last Name": client["Director 1 Last Name"],
          "Director 1 Email": client["Director 1 Email"],
          "Director 1 Contact": client["Director 1 Contact"],
          "Director 1 Birth Date": client["Director 1 Birth Date"],
          "Director 1 National ID": client["Director 1 National ID"],
          "Director 1 Passport ID Number": client["Director 1 Passport ID Number"],
          "Director 1 Country of Issue": client["Director 1 Country of Issue"],
          "Director 1 Passport Expiry Date": client["Director 1 Passport Expiry Date"],
          "Director 1 Citizenship": client["Director 1 Citizenship"],
          "Director 1 Specified Citizenship": client["Director 1 Specified Citizenship"],
          "Director 1 Country of Residence": client["Director 1 Country of Residence"],
          "Director 1 Preferred Language": client["Director 1 Preferred Language"],
          "Director 1 Name of Entity": client["Director 1 Name of Entity"],
          "Director 1 TIN Number": client["Director 1 TIN Number"],
          "Director 1 Tax Residency": client["Director 1 Tax Residency"],
          "Director 1 is PEP": client["Director 1 is PEP"],
        }))
    )

    const mlDirector2Data = groupDataByKeys(
      data.map((client) => ({
        "Director 2 First Name": client["Director 2 First Name"],
        "Director 2 Last Name": client["Director 2 Last Name"],
        "Director 2 Email": client["Director 2 Email"],
        "Director 2 Contact": client["Director 2 Contact"],
        "Director 2 Birth Date": client["Director 2 Birth Date"],
        "Director 2 National ID": client["Director 2 National ID"],
        "Director 2 Passport ID Number": client["Director 2 Passport ID Number"],
        "Director 2 Country of Issue": client["Director 2 Country of Issue"],
        "Director 2 Passport Expiry Date": client["Director 2 Passport Expiry Date"],
        "Director 2 Citizenship": client["Director 2 Citizenship"],
        "Director 2 Specified Citizenship": client["Director 2 Specified Citizenship"],
        "Director 2 Country of Residence": client["Director 2 Country of Residence"],
        "Director 2 Preferred Language": client["Director 2 Preferred Language"],
        "Director 2 Name of Entity": client["Director 2 Name of Entity"],
        "Director 2 TIN Number": client["Director 2 TIN Number"],
        "Director 2 Tax Residency": client["Director 2 Tax Residency"],
        "Director 2 is PEP": client["Director 2 is PEP"],
      }))
    )

    const mlDirector3Data = groupDataByKeys(
      data.map((client) => ({
        "Director 3 First Name": client["Director 3 First Name"],
        "Director 3 Last Name": client["Director 3 Last Name"],
        "Director 3 Email": client["Director 3 Email"],
        "Director 3 Contact": client["Director 3 Contact"],
        "Director 3 Birth Date": client["Director 3 Birth Date"],
        "Director 3 National ID": client["Director 3 National ID"],
        "Director 3 Passport ID Number": client["Director 3 Passport ID Number"],
        "Director 3 Country of Issue": client["Director 3 Country of Issue"],
        "Director 3 Passport Expiry Date": client["Director 3 Passport Expiry Date"],
        "Director 3 Citizenship": client["Director 3 Citizenship"],
        "Director 3 Specified Citizenship": client["Director 3 Specified Citizenship"],
        "Director 3 Country of Residence": client["Director 3 Country of Residence"],
        "Director 3 Preferred Language": client["Director 3 Preferred Language"],
        "Director 3 Name of Entity": client["Director 3 Name of Entity"],
        "Director 3 TIN Number": client["Director 3 TIN Number"],
        "Director 3 Tax Residency": client["Director 3 Tax Residency"],
        "Director 3 is PEP": client["Director 3 is PEP"],
      }))
    )

    const bankAccountDetails = groupDataByKeys(
      data.map((client) => ({
        "Bank Name": client["Bank Name"],
        "Currency": client["Currency"],
        "Call Back Process Contact": client["Call Back Process Contact"],
        "Name of Proposed Officer": client["Name of Proposed Officer"],
      }))
    )

    const groupASignatorieddata = groupDataByKeys(
      data.map((client) => ({
        "Group A Signatory 1": client["Group A Signatory 1"],
        "Group A Signatory 2": client["Group A Signatory 2"],
        "Group A Signatory 3": client["Group A Signatory 3"],
        "Group A Signatory 4": client["Group A Signatory 4"],
      }))
    )

    const groupBSignatorieddata = groupDataByKeys(
      data.map((client) => ({
        "Group B Signatory 1": client["Group B Signatory 1"],
        "Group B Signatory 2": client["Group B Signatory 2"],
        "Group B Signatory 3": client["Group B Signatory 3"],
        "Group B Signatory 4": client["Group B Signatory 4"],
      }))
    )

    const modeOfOperation = groupDataByKeys(
      data.map((client) => ({
        "Mode of Operation": client["Mode of Operation"],
      }))
    )

    const ibAccessRights = groupDataByKeys(
      data.map((client) => ({
        "Authorized User 1": client["Authorized User 1"],
        "Authorized User 1 Access Rights": client["Authorized User 1 Access Rights"],
        "Authorized User 2": client["Authorized User 2"],
        "Authorized User 2 Access Rights": client["Authorized User 2 Access Rights"],
        "Authorized User 3": client["Authorized User 3"],
        "Authorized User 3 Access Rights": client["Authorized User 3 Access Rights"],
        "Authorized User 4": client["Authorized User 4"],
        "Authorized User 4 Access Rights": client["Authorized User 4 Access Rights"],
      }))
    )

    const mlStorageAdminDetail = groupDataByKeys(
      data.map((client) => ({
        "Registrar ID": client["Registrar ID"],
        "Registrar Email": client["Registrar Email"],
        "Registrar First Name": client["Registrar First Name"],
        "Registration Date": client["Registration Date"],
        "Is Active": client["Is Active"],
        "Activator ID": client["Activator ID"],
        "Activator Email": client["Activator Email"],
        "Activator First Name": client["Activator First Name"],
        "Activation Date": client["Activation Date"],
        "Deactivator ID": client["Deactivator ID"],
        "Deactivator Email": client["Deactivator Email"],
        "Deactivator First Name": client["Deactivator First Name"],
        "Deactivation Date": client["Deactivation Date"],
      }))
    )

    



  return (
    <Box m="20px">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            Client Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(clientDetailsData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            Introducer Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(introducerDetailsData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            Legal Person Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(legalPersonDeatailsData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            Authorised Person to Deal On Belf Legal Person
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(authorizedPersonToDealForLegalPersonData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            PEP (Politically Exposed Person) Status
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(PepStatus)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            Other Background Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(otherBackgroundInfo)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            Mode Of Payment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(modeOfPaymentData)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            PURPOSE AND INTENDED NATURE OF BUSINESS RELATIONSHIP
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[300]} variant="h5">
                A. Proposed Name
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableBody>
                    {createTableRowsFromGroupedData(proposedNameData)}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[300]} variant="h5">
                B. Company Detail
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableBody>
                    {createTableRowsFromGroupedData(companyDetailsData)}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[300]} variant="h5">
                C. Shareholding
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableBody>
                    {createTableRowsFromGroupedData(shareHoldingData)}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[300]} variant="h5">
                D. 1. Source of Funds
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableBody>
                    {createTableRowsFromGroupedData(sourceOfFundsData)}
                  </TableBody>
                </Table>
              </TableContainer>

              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                    Files Attached
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(filesAttachedData)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[300]} variant="h5">
                D. 2. Source of Wealth
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableBody>
                    {createTableRowsFromGroupedData(sourceOfWealthData)}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[300]} variant="h5">
                E. Directorship
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableBody>
                    {createTableRowsFromGroupedData(mlDirectorshipData)}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                    ML Director 1
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(mlDirector1Data)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                    ML Director 2
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(mlDirector2Data)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                    ML Director 3
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(mlDirector3Data)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
              
            </AccordionDetails>
          </Accordion>

          
          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[300]} variant="h5">
                F. Bank Account
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableBody>
                    {createTableRowsFromGroupedData(bankAccountDetails)}
                  </TableBody>
                </Table>
              </TableContainer>

              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                    Group A Signatories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(groupASignatorieddata)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                    Group B Signatories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(groupBSignatorieddata)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                    Mode Of Operation
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(modeOfOperation)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>

              <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[300]} variant="h5">
                  IB and Access Rights
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {createTableRowsFromGroupedData(ibAccessRights)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            FINANCIAL FORECAST
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderFinancialForecastTable(financialForecast)}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            EXPECTED ACCOUNT ACTIVITY
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderExpectedAccountActivityTable(expectedAccountActivity)}
        </AccordionDetails>
      </Accordion>



      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[300]} variant="h5">
            ML Storage Administration Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody>
                {createTableRowsFromGroupedData(mlStorageAdminDetail)}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* files */}
      {Object.keys(filesAttachedData).some(key => filesAttachedData[key].some(file => file)) && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={colors.greenAccent[300]} variant="h5">
          FILES
        </Typography>
          </AccordionSummary>
          <AccordionDetails>
        <TableContainer>
          <Table>
            <TableBody>
          {createTableRowsFromGroupedData(filesAttachedData)}
            </TableBody>
          </Table>
        </TableContainer>
          </AccordionDetails>
        </Accordion>
      )}
      
    </Box>
  );
}

export default ClientByIDAccordion;