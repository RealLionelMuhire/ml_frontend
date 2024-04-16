import React from "react";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { colors } from "@mui/system";

const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  showRegisterPassword,
  setShowRegisterPassword,
  showRepeatRegisterPassword,
  setShowRepeatRegisterPassword,
}) => {
  return (
    <Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.FirstName}
        name="FirstName"
        error={Boolean(touched.FirstName) && Boolean(errors.FirstName)}
        helperText={touched.FirstName && errors.FirstName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.LastName}
        name="LastName"
        error={Boolean(touched.LastName) && Boolean(errors.LastName)}
        helperText={touched.LastName && errors.LastName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={Boolean(touched.email) && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Contact"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact}
        name="contact"
        error={Boolean(touched.contact) && Boolean(errors.contact)}
        helperText={touched.contact && errors.contact}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        label="Password"
        type={showRegisterPassword ? "text" : "password"}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        name="password"
        error={Boolean(touched.password) && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowRegisterPassword((prev) => !prev)}
                size="small"
              >
                {showRegisterPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        label="Retype Password"
        type={showRepeatRegisterPassword ? "text" : "password"}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.confirmPassword}
        name="confirmPassword"
        error={
          Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)
        }
        helperText={touched.confirmPassword && errors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowRepeatRegisterPassword((prev) => !prev)}
                size="small"
              >
                {showRepeatRegisterPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        label="Date of Birth"
        type="date"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.BirthDate}
        name="BirthDate"
        error={Boolean(touched.BirthDate) && Boolean(errors.BirthDate)}
        helperText={touched.BirthDate && errors.BirthDate}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Country of Residence"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.countryOfResidence}
        name="countryOfResidence"
        error={
          Boolean(touched.countryOfResidence) &&
          Boolean(errors.countryOfResidence)
        }
        helperText={touched.countryOfResidence && errors.countryOfResidence}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        select
        label="Preferred Language"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.preferredLanguage}
        name="preferredLanguage"
        error={!!touched.preferredLanguage && !!errors.preferredLanguage}
        helperText={touched.preferredLanguage && errors.preferredLanguage}
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
        value={values.NameOfEntity}
        name="NameOfEntity"
        error={Boolean(touched.NameOfEntity) && Boolean(errors.NameOfEntity)}
        helperText={touched.NameOfEntity && errors.NameOfEntity}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="TIN Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.tinNumber}
        name="tinNumber"
        error={Boolean(touched.tinNumber) && Boolean(errors.tinNumber)}
        helperText={touched.tinNumber && errors.tinNumber}
        sx={{ gridColumn: "span 2" }}
      />

      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Tax Residency"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.taxResidency}
        name="taxResidency"
        error={Boolean(touched.taxResidency) && Boolean(errors.taxResidency)}
        helperText={touched.taxResidency && errors.taxResidency}
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
        value={values.citizenship}
        name="citizenship"
        error={Boolean(touched.citizenship) && Boolean(errors.citizenship)}
        helperText={touched.citizenship && errors.citizenship}
        sx={{ gridColumn: "span 2" }}
      >
        <MenuItem value="Rwandan">Rwandan</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      {/* Conditional rendering based on citizenship selection */}
      {values.citizenship === "Rwandan" && (
        <>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="National ID"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.NationalID}
            name="NationalID"
            error={Boolean(touched.NationalID) && Boolean(errors.NationalID)}
            helperText={touched.NationalID && errors.NationalID}
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
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              fontWeight="500"
            >
              {values.national_id_file ? (
                values.national_id_file.name
              ) : (
                <label htmlFor="national_id_file">Upload National ID</label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="national_id_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue("national_id_file", e.currentTarget.files[0]);
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.national_id_file && errors.national_id_file && (
              <div>{errors.national_id_file}</div>
            )}
          </Box>
        </>
      )}
      {values.citizenship === "Other" && (
        <>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Specify Citizenship"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.specifiedCitizenship}
            name="specifiedCitizenship"
            error={
              Boolean(touched.specifiedCitizenship) &&
              Boolean(errors.specifiedCitizenship)
            }
            helperText={
              touched.specifiedCitizenship && errors.specifiedCitizenship
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
            value={values.passportIdNumber}
            name="passportIdNumber"
            error={
              Boolean(touched.passportIdNumber) &&
              Boolean(errors.passportIdNumber)
            }
            helperText={touched.passportIdNumber && errors.passportIdNumber}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Country of Issue"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.countryOfIssue}
            name="countryOfIssue"
            error={
              Boolean(touched.countryOfIssue) && Boolean(errors.countryOfIssue)
            }
            helperText={touched.countryOfIssue && errors.countryOfIssue}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Passport Expiry Date"
            type="date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.passportExpiryDate}
            name="passportExpiryDate"
            error={
              Boolean(touched.passportExpiryDate) &&
              Boolean(errors.passportExpiryDate)
            }
            helperText={touched.passportExpiryDate && errors.passportExpiryDate}
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
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              fontWeight="500"
            >
              {values.passportIdNumber_file ? (
                values.passportIdNumber_file.name
              ) : (
                <label htmlFor="passportIdNumber_file">
                  Upload Passport ID
                </label>
              )}
            </Typography>
            <input
              type="file"
              accept=".pdf"
              name="passportIdNumber_file"
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "passportIdNumber_file",
                  e.currentTarget.files[0]
                );
              }}
              sx={{ gridColumn: "span 2" }}
            />
            {touched.passportIdNumber_file && errors.passportIdNumber_file && (
              <div>{errors.passportIdNumber_file}</div>
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
          gridColumn: "span 2",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "13px 5px",
        }}
      >
        <Typography
          variant="h5"
          color={colors.greenAccent[500]}
          fontWeight="500"
        >
          {values.registration_certificate ? (
            values.registration_certificate.name
          ) : (
            <label htmlFor="registration_certificate">
              Upload Registration Certificate
            </label>
          )}
        </Typography>
        <input
          type="file"
          accept=".pdf"
          name="registration_certificate"
          onChange={(e) => {
            handleChange(e);
            setFieldValue("registration_certificate", e.currentTarget.files[0]);
          }}
          sx={{ gridColumn: "span 2" }}
        />
        {touched.registration_certificate &&
          errors.registration_certificate && (
            <div>{errors.registration_certificate}</div>
          )}
      </Box>
    </Box>
  );
};

export default RegisterForm;
