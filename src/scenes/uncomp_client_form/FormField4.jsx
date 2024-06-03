import React from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields4 = ({
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
          gridColumn: "span 2",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          Indicate, whether the Client has changed his name.
        </Typography>
        <TextField
          select
          value={values.changedName}
          onChange={handleChange}
          name="changedName"
          label={`Changed Name: ${client.changedName || ""}`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>

      {(values.changedName === "yes" ||
        (!values.changedName && client.changedName === "yes")) && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 1",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              If yes, please provide us with his former names and the dates of
              the change of names
            </Typography>
          </Box>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Similar Application: ${
              client.similarApplicationDetailsName || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsName}
            name="similarApplicationDetailsName"
            error={
              !!touched.similarApplicationDetailsName &&
              !!errors.similarApplicationDetailsName
            }
            helperText={
              touched.similarApplicationDetailsName &&
              errors.similarApplicationDetailsName
            }
            sx={{ gridColumn: "span 1" }}
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
          Indicate, whether the Client conducts or carries out financial
          services business from any jurisdiction other than Rwanda?
        </Typography>
        <TextField
          select
          value={values.financialServicesBusiness}
          onChange={handleChange}
          name="financialServicesBusiness"
          label={`Financial Services Business: ${
            values.financialServicesBusiness ||
            (!values.financialServicesBusiness &&
              client.financialServicesBusiness)
          }`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>

      {/* {client.financialServicesBusiness === "yes" && ( */}
      {(values.financialServicesBusiness === "yes" ||
        (!values.financialServicesBusiness &&
          client.financialServicesBusiness === "yes")) && (
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
              If yes, specify the name of jurisdiction
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Name of Jurisdiction: ${client.jurisdictionName || ""}`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.jurisdictionName}
            name="jurisdictionName"
            error={!!touched.jurisdictionName && !!errors.jurisdictionName}
            helperText={touched.jurisdictionName && errors.jurisdictionName}
            sx={{ gridColumn: "span 2" }}
          />
          {/* Add input field for jurisdiction name */}
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
              If yes, please provide the address from which financial services
              business is carried out:
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Address: ${client.jurisdictionAddress || ""}`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.jurisdictionAddress}
            name="jurisdictionAddress"
            error={
              !!touched.jurisdictionAddress && !!errors.jurisdictionAddress
            }
            helperText={
              touched.jurisdictionAddress && errors.jurisdictionAddress
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
          Has the Applicant/Beneficial Owner/Partner made a similar application
          in another jurisdiction?
        </Typography>
        <TextField
          select
          value={values.similarApplication}
          onChange={handleChange}
          name="similarApplication"
          label={`Similar Application: ${client.similarApplication || ""}`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>

      {(values.similarApplication === "yes" ||
        (!values.similarApplication &&
          client.similarApplication === "yes")) && (
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
              - If yes, please provide details:
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Similar Application: ${
              client.similarApplicationDetailsPartner || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsPartner}
            name="similarApplicationDetailsPartner"
            error={
              !!touched.similarApplicationDetailsPartner &&
              !!errors.similarApplicationDetailsPartner
            }
            helperText={
              touched.similarApplicationDetailsPartner &&
              errors.similarApplicationDetailsPartner
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
          Has the Applicant/Beneficial Owner/Partner at any time in the previous
          7 years been criticised, censured, disciplined, suspended, or fined by
          any regulatory body in Rwanda or by any regulatory body in any other
          jurisdiction?
        </Typography>
        <TextField
          select
          value={values.criticised}
          onChange={handleChange}
          name="criticised"
          label={`Criticised: ${client.criticised || ""}`}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>

      {/* {client.criticised === "yes" && ( */}
      {(values.criticised === "yes" ||
        (!values.criticised && client.criticised === "yes")) && (
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
              - If yes, please provide details:
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={`Details of Similar Application: ${
              client.similarApplicationDetailsJurisdictions || ""
            }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.similarApplicationDetailsJurisdictions}
            name="similarApplicationDetailsJurisdictions"
            error={
              !!touched.similarApplicationDetailsJurisdictions &&
              !!errors.similarApplicationDetailsJurisdictions
            }
            helperText={
              touched.similarApplicationDetailsJurisdictions &&
              errors.similarApplicationDetailsJurisdictions
            }
            sx={{ gridColumn: "span 2" }}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default FormFields4;
