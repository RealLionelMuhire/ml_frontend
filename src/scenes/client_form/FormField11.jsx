import React from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields11 = ({
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
          {/* Director 1 */}
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
              Director 1
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1FirstName}
            name="Director1FirstName"
            error={
              Boolean(touched.Director1FirstName) &&
              Boolean(errors.Director1FirstName)
            }
            helperText={touched.Director1FirstName && errors.Director1FirstName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1LastName}
            name="Director1LastName"
            error={
              Boolean(touched.Director1LastName) &&
              Boolean(errors.Director1LastName)
            }
            helperText={touched.Director1LastName && errors.Director1LastName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1email}
            name="Director1email"
            error={
              Boolean(touched.Director1email) && Boolean(errors.Director1email)
            }
            helperText={touched.Director1email && errors.Director1email}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1contact}
            name="Director1contact"
            error={
              Boolean(touched.Director1contact) &&
              Boolean(errors.Director1contact)
            }
            helperText={touched.Director1contact && errors.Director1contact}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Date of Birth"
            type="date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1BirthDate}
            name="Director1BirthDate"
            error={
              Boolean(touched.Director1BirthDate) &&
              Boolean(errors.Director1BirthDate)
            }
            helperText={touched.Director1BirthDate && errors.Director1BirthDate}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Country of Residence"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1countryOfResidence}
            name="Director1countryOfResidence"
            error={
              Boolean(touched.Director1countryOfResidence) &&
              Boolean(errors.Director1countryOfResidence)
            }
            helperText={
              touched.Director1countryOfResidence &&
              errors.Director1countryOfResidence
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
            value={values.Director1preferredLanguage}
            name="Director1preferredLanguage"
            error={
              !!touched.Director1preferredLanguage &&
              !!errors.Director1preferredLanguage
            }
            helperText={
              touched.Director1preferredLanguage &&
              errors.Director1preferredLanguage
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
            value={values.Director1NameOfEntity}
            name="Director1NameOfEntity"
            error={
              Boolean(touched.Director1NameOfEntity) &&
              Boolean(errors.Director1NameOfEntity)
            }
            helperText={
              touched.Director1NameOfEntity && errors.Director1NameOfEntity
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
            value={values.Director1tinNumber}
            name="Director1tinNumber"
            error={
              Boolean(touched.Director1tinNumber) &&
              Boolean(errors.Director1tinNumber)
            }
            helperText={touched.Director1tinNumber && errors.Director1tinNumber}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tax Residency"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director1taxResidency}
            name="Director1taxResidency"
            error={
              Boolean(touched.Director1taxResidency) &&
              Boolean(errors.Director1taxResidency)
            }
            helperText={
              touched.Director1taxResidency && errors.Director1taxResidency
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
            value={values.Director1citizenship}
            name="Director1citizenship"
            error={
              Boolean(touched.Director1citizenship) &&
              Boolean(errors.Director1citizenship)
            }
            helperText={
              touched.Director1citizenship && errors.Director1citizenship
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

          {/* Conditional rendering based on Director1citizenship selection */}
          {values.Director1citizenship === "Rwandan" && (
            <>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="National ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director1NationalID}
                name="Director1NationalID"
                error={
                  Boolean(touched.Director1NationalID) &&
                  Boolean(errors.Director1NationalID)
                }
                helperText={
                  touched.Director1NationalID && errors.Director1NationalID
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
          {values.Director1citizenship === "Other" && (
            <>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Specify Citizenship"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director1specifiedCitizenship}
                name="Director1specifiedCitizenship"
                error={
                  Boolean(touched.Director1specifiedCitizenship) &&
                  Boolean(errors.Director1specifiedCitizenship)
                }
                helperText={
                  touched.Director1specifiedCitizenship &&
                  errors.Director1specifiedCitizenship
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
                value={values.Director1passportIdNumber}
                name="Director1passportIdNumber"
                error={
                  Boolean(touched.Director1passportIdNumber) &&
                  Boolean(errors.Director1passportIdNumber)
                }
                helperText={
                  touched.Director1passportIdNumber &&
                  errors.Director1passportIdNumber
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
                value={values.Director1countryOfIssue}
                name="Director1countryOfIssue"
                error={
                  Boolean(touched.Director1countryOfIssue) &&
                  Boolean(errors.Director1countryOfIssue)
                }
                helperText={
                  touched.Director1countryOfIssue &&
                  errors.Director1countryOfIssue
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
                value={values.Director1passportExpiryDate}
                name="Director1passportExpiryDate"
                error={
                  Boolean(touched.Director1passportExpiryDate) &&
                  Boolean(errors.Director1passportExpiryDate)
                }
                helperText={
                  touched.Director1passportExpiryDate &&
                  errors.Director1passportExpiryDate
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
                  name="Director1_passport_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "Director1_passport_file",
                      e.currentTarget.files[0]
                    );
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.Director1_passport_file &&
                  errors.Director1_passport_file && (
                    <div>{errors.Director1_passport_file}</div>
                  )}
              </Box>
            </>
          )}
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
              Director 2
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director2FirstName}
            name="Director2FirstName"
            error={
              Boolean(touched.Director2FirstName) &&
              Boolean(errors.Director2FirstName)
            }
            helperText={touched.Director2FirstName && errors.Director2FirstName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director2LastName}
            name="Director2LastName"
            error={
              Boolean(touched.Director2LastName) &&
              Boolean(errors.Director2LastName)
            }
            helperText={touched.Director2LastName && errors.Director2LastName}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director2email}
            name="Director2email"
            error={
              Boolean(touched.Director2email) && Boolean(errors.Director2email)
            }
            helperText={touched.Director2email && errors.Director2email}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director2contact}
            name="Director2contact"
            error={
              Boolean(touched.Director2contact) &&
              Boolean(errors.Director2contact)
            }
            helperText={touched.Director2contact && errors.Director2contact}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Date of Birth"
            type="date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director2BirthDate}
            name="Director2BirthDate"
            error={
              Boolean(touched.Director2BirthDate) &&
              Boolean(errors.Director2BirthDate)
            }
            helperText={touched.Director2BirthDate && errors.Director2BirthDate}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Country of Residence"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director2countryOfResidence}
            name="Director2countryOfResidence"
            error={
              Boolean(touched.Director2countryOfResidence) &&
              Boolean(errors.Director2countryOfResidence)
            }
            helperText={
              touched.Director2countryOfResidence &&
              errors.Director2countryOfResidence
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
            value={values.Director2preferredLanguage}
            name="Director2preferredLanguage"
            error={
              !!touched.Director2preferredLanguage &&
              !!errors.Director2preferredLanguage
            }
            helperText={
              touched.Director2preferredLanguage &&
              errors.Director2preferredLanguage
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
            value={values.Director2NameOfEntity}
            name="Director2NameOfEntity"
            error={
              Boolean(touched.Director2NameOfEntity) &&
              Boolean(errors.Director2NameOfEntity)
            }
            helperText={
              touched.Director2NameOfEntity && errors.Director2NameOfEntity
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
            value={values.Director2tinNumber}
            name="Director2tinNumber"
            error={
              Boolean(touched.Director2tinNumber) &&
              Boolean(errors.Director2tinNumber)
            }
            helperText={touched.Director2tinNumber && errors.Director2tinNumber}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tax Residency"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.Director2taxResidency}
            name="Director2taxResidency"
            error={
              Boolean(touched.Director2taxResidency) &&
              Boolean(errors.Director2taxResidency)
            }
            helperText={
              touched.Director2taxResidency && errors.Director2taxResidency
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
            value={values.Director2citizenship}
            name="Director2citizenship"
            error={
              Boolean(touched.Director2citizenship) &&
              Boolean(errors.Director2citizenship)
            }
            helperText={
              touched.Director2citizenship && errors.Director2citizenship
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

          {/* Conditional rendering based on Director2citizenship selection */}
          {values.Director2citizenship === "Rwandan" && (
            <>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="National ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director2NationalID}
                name="Director2NationalID"
                error={
                  Boolean(touched.Director2NationalID) &&
                  Boolean(errors.Director2NationalID)
                }
                helperText={
                  touched.Director2NationalID && errors.Director2NationalID
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
          {values.Director2citizenship === "Other" && (
            <>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Specify Citizenship"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Director2specifiedCitizenship}
                name="Director2specifiedCitizenship"
                error={
                  Boolean(touched.Director2specifiedCitizenship) &&
                  Boolean(errors.Director2specifiedCitizenship)
                }
                helperText={
                  touched.Director2specifiedCitizenship &&
                  errors.Director2specifiedCitizenship
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
                value={values.Director2passportIdNumber}
                name="Director2passportIdNumber"
                error={
                  Boolean(touched.Director2passportIdNumber) &&
                  Boolean(errors.Director2passportIdNumber)
                }
                helperText={
                  touched.Director2passportIdNumber &&
                  errors.Director2passportIdNumber
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
                value={values.Director2countryOfIssue}
                name="Director2countryOfIssue"
                error={
                  Boolean(touched.Director2countryOfIssue) &&
                  Boolean(errors.Director2countryOfIssue)
                }
                helperText={
                  touched.Director2countryOfIssue &&
                  errors.Director2countryOfIssue
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
                value={values.Director2passportExpiryDate}
                name="Director2passportExpiryDate"
                error={
                  Boolean(touched.Director2passportExpiryDate) &&
                  Boolean(errors.Director2passportExpiryDate)
                }
                helperText={
                  touched.Director2passportExpiryDate &&
                  errors.Director2passportExpiryDate
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
                  name="Director2_passport_file"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "Director2_passport_file",
                      e.currentTarget.files[0]
                    );
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.Director2_passport_file &&
                  errors.Director2_passport_file && (
                    <div>{errors.Director2_passport_file}</div>
                  )}
              </Box>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default FormFields11;
