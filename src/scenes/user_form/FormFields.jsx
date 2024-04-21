import React from "react";
import { TextField, MenuItem } from "@mui/material";
import FinancialForecastTable2 from "./Table2";

const FormFields = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  isNonMobile,
  setFieldValue,
}) => {
  console.log("Errors: ", errors);
  const handleFinancialDataChange = (params) => {
    // console.log({ params });
    setFieldValue(
      "financialForecast",
      values.financialForecast.map((item) => {
        const currentIndex = Object.keys(params)[0];
        if (item.id === +currentIndex) {
          const key = Object.keys(params[currentIndex])[0];
          const value = Object.values(params[currentIndex])[0].value;
          item = { ...item, [key]: value };
          // console.log({ currentIndex, item });
        }
        return item;
      })
    );
  };

  React.useEffect(() => {
    // console.log({ values });
  }, [values]);

  return (
    <React.Fragment>
      <FinancialForecastTable2
        financialData={values.financialForecast}
        handleFinancialDataChange={handleFinancialDataChange}
        setFieldValue={setFieldValue}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.FirstName}
        name="FirstName"
        error={!!touched.FirstName && !!errors.FirstName}
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
        error={!!touched.LastName && !!errors.LastName}
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
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Contact Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact}
        name="contact"
        error={!!touched.contact && !!errors.contact}
        helperText={touched.contact && errors.contact}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="password"
        label="Temporal Password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        name="password"
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="National ID or Passport"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.NationalID}
        name="NationalID"
        error={!!touched.NationalID && !!errors.NationalID}
        helperText={touched.NationalID && errors.NationalID}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="date"
        label="Birth Date"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.BirthDate}
        name="BirthDate"
        error={!!touched.BirthDate && !!errors.BirthDate}
        helperText={touched.BirthDate && errors.BirthDate}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="User Role"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.UserRoles}
        name="UserRoles"
        error={!!touched.UserRoles && !!errors.UserRoles}
        helperText={touched.UserRoles && errors.UserRoles}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        select
        label="Access Level"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.accessLevel}
        name="accessLevel"
        error={!!touched.accessLevel && !!errors.accessLevel}
        helperText={touched.accessLevel && errors.accessLevel}
        sx={{ gridColumn: "span 2" }}
      >
        <MenuItem value="manager">Manager</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </TextField>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.Address}
        name="Address"
        error={!!touched.Address && !!errors.Address}
        helperText={touched.Address && errors.Address}
        sx={{ gridColumn: "span 2" }}
      />
    </React.Fragment>
  );
};

export default FormFields;
