import React from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields5 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  client,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <React.Fragment>
      <Box
        variant="outlined"
        display="inline-flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          At any time in the previous 7 years, has an application been made for
          the bankruptcy or compulsory winding up of the Applicant/Beneficial
          Owner/Partner or has the Applicant’s property been seized or
          Applicant’s property been seized or forfeited or relinquished by any
          other similar means? :{client.bankruptcyApplication || ""}
        </Typography>
        <TextField
          select
          value={values.bankruptcyApplication}
          onChange={handleChange}
          name="bankruptcyApplication"
          label={`Bankruptcy Application: ${
            client.bankruptcyApplication || ""
          }`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      {/* {client.bankruptcyApplication === "yes" && ( */}
      {(values.bankruptcyApplication === "yes" ||
        (!values.bankruptcyApplication &&
          client.bankruptcyApplication === "yes")) && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              - If yes, please provide details: {client.similarApplicationDetailsForfeit || ""}
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Bankruptcy Application: ${
              client.similarApplicationDetailsForfeit || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsForfeit}
            name="similarApplicationDetailsForfeit"
            error={
              !!touched.similarApplicationDetailsForfeit &&
              !!errors.similarApplicationDetailsForfeit
            }
            helperText={
              touched.similarApplicationDetailsForfeit &&
              errors.similarApplicationDetailsForfeit
            }
            sx={{ gridColumn: "span 2" }}
          />
        </>
      )}

      <Box
        variant="outlined"
        display="inline-flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          Has the Applicant/Beneficial Owner/ Partner at any time in the
          previous 7 years had a Receiver or an Administrator appointed or
          failed to satisfy a debt adjudged due, or come to a compromise or
          similar arrangement with any of its creditors? :{client.receiverAppointed || ""}
        </Typography>
        <TextField
          select
          value={values.receiverAppointed}
          onChange={handleChange}
          name="receiverAppointed"
          label={`Receiver Appointed: ${client.receiverAppointed || ""}`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      {/* {client.receiverAppointed === "yes" && ( */}
      {(values.receiverAppointed === "yes" ||
        (!values.receiverAppointed && client.receiverAppointed === "yes")) && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              - If yes, please provide details: {client.similarApplicationDetailsReceiver || ""}
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Receiver Appointment: ${
              client.similarApplicationDetailsReceiver || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsReceiver}
            name="similarApplicationDetailsReceiver"
            error={
              !!touched.similarApplicationDetailsReceiver &&
              !!errors.similarApplicationDetailsReceiver
            }
            helperText={
              touched.similarApplicationDetailsReceiver &&
              errors.similarApplicationDetailsReceiver
            }
            sx={{ gridColumn: "span 2" }}
          />
        </>
      )}

      <Box
        variant="outlined"
        display="inline-flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          Has the Applicant/Beneficial Owner/ Partner been engaged in any civil
          proceedings or arbitration at any time in the previous 7 years in
          which a debt was adjudged due from, or judgement given against, the
          Applicant in relation to any financial service? :{client.civilProceedings || ""} 
        </Typography>
        <TextField
          select
          value={values.civilProceedings}
          onChange={handleChange}
          name="civilProceedings"
          label={`Civil Proceedings: ${client.civilProceedings || ""}`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      {/* {client.civilProceedings === "yes" && ( */}
      {(values.civilProceedings === "yes" ||
        (!values.civilProceedings && client.civilProceedings === "yes")) && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              - If yes, please provide details: {client.similarApplicationDetailsFinancial || ""}
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Civil Proceedings: ${
              client.similarApplicationDetailsFinancial || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsFinancial}
            name="similarApplicationDetailsFinancial"
            error={
              !!touched.similarApplicationDetailsFinancial &&
              !!errors.similarApplicationDetailsFinancial
            }
            helperText={
              touched.similarApplicationDetailsFinancial &&
              errors.similarApplicationDetailsFinancial
            }
            sx={{ gridColumn: "span 2" }}
          />
        </>
      )}

      <Box
        variant="outlined"
        display="inline-flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          Has the Applicant/Beneficial Owner/ Partner at any time been convicted
          of any offence involving fraud, or other dishonesty, or any other
          offence such as an economic offence or money laundering or been
          subject to penalties for tax evasion (whether or not in Rwanda)
          relating to companies carrying out financial services business? :{client.convicted || ""}
        </Typography>
        <TextField
          select
          value={values.convicted}
          onChange={handleChange}
          name="convicted"
          label={`Convicted: ${client.convicted || ""}`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      {/* {client.convicted === "yes" && ( */}
      {(values.convicted === "yes" ||
        (!values.convicted && client.convicted === "yes")) && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              - If yes, please provide details: ${client.similarApplicationDetailsOffence || ""}
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Offence: ${
              client.similarApplicationDetailsOffence || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsOffence}
            name="similarApplicationDetailsOffence"
            error={
              !!touched.similarApplicationDetailsOffence &&
              !!errors.similarApplicationDetailsOffence
            }
            helperText={
              touched.similarApplicationDetailsOffence &&
              errors.similarApplicationDetailsOffence
            }
            sx={{ gridColumn: "span 2" }}
          />
        </>
      )}

      <Box
        variant="outlined"
        display="inline-flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          Has any Director, Officer or Partner of the Applicant been convicted
          in any Court of Law for a criminal offence or penalised or sanctioned,
          or is currently or has ever been under investigation for professional
          negligence or malpractice by any Regulatory Authority in any country? :{client.directorConvicted || ""}
        </Typography>
        <TextField
          select
          value={values.directorConvicted}
          onChange={handleChange}
          name="directorConvicted"
          label={`Director Convicted: ${client.directorConvicted || ""}`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      {/* {client.directorConvicted === "yes" && ( */}
      {(values.directorConvicted === "yes" ||
        (!values.directorConvicted && client.directorConvicted === "yes")) && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 2",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              - If yes, please provide details: ${client.similarApplicationDetailsDirector || ""}
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Director Conviction: ${
              client.similarApplicationDetailsDirector || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsDirector}
            name="similarApplicationDetailsDirector"
            error={
              !!touched.similarApplicationDetailsDirector &&
              !!errors.similarApplicationDetailsDirector
            }
            helperText={
              touched.similarApplicationDetailsDirector &&
              errors.similarApplicationDetailsDirector
            }
            sx={{ gridColumn: "span 2" }}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default FormFields5;
