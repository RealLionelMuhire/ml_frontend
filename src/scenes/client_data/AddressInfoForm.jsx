import React from "react";
import { Box, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddressInfoForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name="firstName"
        error={!!touched.firstName && !!errors.firstName}
        helperText={touched.firstName && errors.firstName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name="lastName"
        error={!!touched.lastName && !!errors.lastName}
        helperText={touched.lastName && errors.lastName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.clientEmail}
        name="clientEmail"
        error={!!touched.clientEmail && !!errors.clientEmail}
        helperText={touched.clientEmail && errors.clientEmail}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Contact Phone"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.clientContact}
        name="clientContact"
        error={!!touched.clientContact && !!errors.clientContact}
        helperText={touched.clientContact && errors.clientContact}
        sx={{ gridColumn: "span 2" }}
      />
    </Box>
  );
};

export default AddressInfoForm;
