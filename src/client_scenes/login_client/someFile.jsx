import React from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields10 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <React.Fragment>
      {/* DIRECTORSHIP */}
      <Box
        variant="outlined"
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "13px 5px",
        }}
      >
        <Typography variant="h5" fontWeight="800">
          E. Directorship
        </Typography>
      </Box>
      {/* DIRECTORSHIP */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Will officers of ML Corporate Services act as Director"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.isMlDirectors}
        name="isMlDirectors"
        error={!!touched.isMlDirectors && !!errors.isMlDirectors}
        helperText={touched.isMlDirectors && errors.isMlDirectors}
        sx={{ gridColumn: "span 1" }}
      >
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>

      {/* Conditional rendering for certificate upload */}
      {values.isMlDirectors === "yes" && (
        <>
          {/* Director 3 */}
          <Box
            variant="outlined"
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 4",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "13px 5px",
            }}
          >
            <Typography variant="h6" fontWeight="500" fontStyle="italic">
              Director 3
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3FirstName}
            name="Director3FirstName"
            error={
              Boolean(touched.Director3FirstName) &&
              Boolean(errors.Director3FirstName)
            }
            helperText={touched.Director3FirstName && errors.Director3FirstName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3LastName}
            name="Director3LastName"
            error={
              Boolean(touched.Director3LastName) &&
              Boolean(errors.Director3LastName)
            }
            helperText={touched.Director3LastName && errors.Director3LastName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3email}
            name="Director3email"
            error={
              Boolean(touched.Director3email) && Boolean(errors.Director3email)
            }
            helperText={touched.Director3email && errors.Director3email}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3contact}
            name="Director3contact"
            error={
              Boolean(touched.Director3contact) &&
              Boolean(errors.Director3contact)
            }
            helperText={touched.Director3contact && errors.Director3contact}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Date of Birth"
            type="date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3BirthDate}
            name="Director3BirthDate"
            error={
              Boolean(touched.Director3BirthDate) &&
              Boolean(errors.Director3BirthDate)
            }
            helperText={touched.Director3BirthDate && errors.Director3BirthDate}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Country of Residence"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3countryOfResidence}
            name="Director3countryOfResidence"
            error={
              Boolean(touched.Director3countryOfResidence) &&
              Boolean(errors.Director3countryOfResidence)
            }
            helperText={
              touched.Director3countryOfResidence &&
              errors.Director3countryOfResidence
            }
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            select
            label="Preferred Language"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3preferredLanguage}
            name="Director3preferredLanguage"
            error={
              !!touched.Director3preferredLanguage &&
              !!errors.Director3preferredLanguage
            }
            helperText={
              touched.Director3preferredLanguage &&
              errors.Director3preferredLanguage
            }
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="french">French</MenuItem>
            <MenuItem value="kinyarwanda">Kinyarwanda</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name of Entity"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3NameOfEntity}
            name="Director3NameOfEntity"
            error={
              Boolean(touched.Director3NameOfEntity) &&
              Boolean(errors.Director3NameOfEntity)
            }
            helperText={
              touched.Director3NameOfEntity && errors.Director3NameOfEntity
            }
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="TIN Number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3tinNumber}
            name="Director3tinNumber"
            error={
              Boolean(touched.Director3tinNumber) &&
              Boolean(errors.Director3tinNumber)
            }
            helperText={touched.Director3tinNumber && errors.Director3tinNumber}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tax Residency"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3taxResidency}
            name="Director3taxResidency"
            error={
              Boolean(touched.Director3taxResidency) &&
              Boolean(errors.Director3taxResidency)
            }
            helperText={
              touched.Director3taxResidency && errors.Director3taxResidency
            }
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            select
            label="Citizenship"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director3citizenship}
            name="Director3citizenship"
            error={
              Boolean(touched.Director3citizenship) &&
              Boolean(errors.Director3citizenship)
            }
            helperText={
              touched.Director3citizenship && errors.Director3citizenship
            }
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value="Rwandan">Rwandan</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            fullWidth
            variant="filled"
            select
            label="PEP(Politically Exposed Person) Status"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1isPep}
            name="Director1isPep"
            error={!!touched.Director1isPep && !!errors.Director1isPep}
            helperText={touched.Director1isPep && errors.Director1isPep}
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>

          {/* Conditional rendering for certificate upload */}
          {values.Director1isPep === "yes" && (
            <>
              <Box
                variant="outlined"
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 2",
                  margin: "1px 0px 1px",
                  borderRadius: "4px",
                  padding: "13px 5px",
                }}
              >
                <Typography variant="h6">
                  {values.Director1bankStatement_file ? (
                    values.Director1bankStatement_file.name
                  ) : (
                    <label htmlFor="sample_file">
                      Upload last six months bank statements
                    </label>
                  )}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="Director1bankStatement_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "Director1bankStatement_file",
                      e.currentTarget.files[0]
                    );
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.Director1bankStatement_file &&
                  errors.Director1bankStatement_file && (
                    <div>{errors.Director1bankStatement_file}</div>
                  )}
              </Box>

              <Box
                variant="outlined"
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 2",
                  margin: "1px 0px 1px",
                  borderRadius: "4px",
                  padding: "13px 5px",
                }}
              >
                <Typography variant="h6">
                  {values.Director1professionalReference_file ? (
                    values.Director1professionalReference_file.name
                  ) : (
                    <label htmlFor="sample_file">
                      Upload professional reference
                    </label>
                  )}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="Director1professionalReference_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "Director1professionalReference_file",
                      e.currentTarget.files[0]
                    );
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.Director1professionalReference_file &&
                  errors.Director1professionalReference_file && (
                    <div>{errors.Director1professionalReference_file}</div>
                  )}
              </Box>
            </>
          )}

          {/* Conditional rendering based on Director3citizenship selection */}
          {values.Director3citizenship === "Rwandan" && (
            <>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="National ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director3NationalID}
                name="Director3NationalID"
                error={
                  Boolean(touched.Director3NationalID) &&
                  Boolean(errors.Director3NationalID)
                }
                helperText={
                  touched.Director3NationalID && errors.Director3NationalID
                }
                sx={{ gridColumn: "span 2" }}
              />
              <Box
                variant="outlined"
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 2",
                  margin: "1px 0px 1px",
                  borderRadius: "4px",
                  padding: "13px 5px",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Upload National ID
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="Director1_national_id_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "Director1_national_id_file",
                      e.currentTarget.files[0]
                    );
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.Director1_national_id_file &&
                  errors.Director1_national_id_file && (
                    <div>{errors.Director1_national_id_file}</div>
                  )}
              </Box>
            </>
          )}
          {values.Director3citizenship === "Other" && (
            <>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Specify Citizenship"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director3specifiedCitizenship}
                name="Director3specifiedCitizenship"
                error={
                  Boolean(touched.Director3specifiedCitizenship) &&
                  Boolean(errors.Director3specifiedCitizenship)
                }
                helperText={
                  touched.Director3specifiedCitizenship &&
                  errors.Director3specifiedCitizenship
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Passport ID Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director3passportIdNumber}
                name="Director3passportIdNumber"
                error={
                  Boolean(touched.Director3passportIdNumber) &&
                  Boolean(errors.Director3passportIdNumber)
                }
                helperText={
                  touched.Director3passportIdNumber &&
                  errors.Director3passportIdNumber
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country of Issue"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director3countryOfIssue}
                name="Director3countryOfIssue"
                error={
                  Boolean(touched.Director3countryOfIssue) &&
                  Boolean(errors.Director3countryOfIssue)
                }
                helperText={
                  touched.Director3countryOfIssue &&
                  errors.Director3countryOfIssue
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Passport Expiry Date"
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director3passportExpiryDate}
                name="Director3passportExpiryDate"
                error={
                  Boolean(touched.Director3passportExpiryDate) &&
                  Boolean(errors.Director3passportExpiryDate)
                }
                helperText={
                  touched.Director3passportExpiryDate &&
                  errors.Director3passportExpiryDate
                }
                sx={{ gridColumn: "span 2" }}
              />
              <Box
                variant="outlined"
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: colors.primary[400],
                  gridColumn: "span 2",
                  margin: "1px 0px 1px",
                  borderRadius: "4px",
                  padding: "13px 5px",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Upload Passport Document
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="Director3_passport_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "Director3_passport_file",
                      e.currentTarget.files[0]
                    );
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.Director3_passport_file &&
                  errors.Director3_passport_file && (
                    <div>{errors.Director3_passport_file}</div>
                  )}
              </Box>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default FormFields10;

const initialValues = {
  isMlDirectors: "",
  Director3FirstName: "",
  Director3LastName: "",
  Director3email: "",
  Director3contact: "",
  Director3BirthDate: "",
  Director3NationalID: "",
  Director3passportIdNumber: "",
  Director3countryOfIssue: "",
  Director3passportExpiryDate: "",
  Director3citizenship: "",
  Director3specifiedCitizenship: "",
  Director3countryOfResidence: "",
  Director3preferredLanguage: "",
  Director3NameOfEntity: "",
  Director3tinNumber: "",
  Director3taxResidency: "",
  Director3_national_id_file: null,
  Director3_passport_file: null,
};
