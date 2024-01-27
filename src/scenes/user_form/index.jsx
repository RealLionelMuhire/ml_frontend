import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCreateUserMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading, isError, data }] = useCreateUserMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    console.log("Form submission initiated. Values:", values);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const response = await createUser(formData);
      console.log("After mutation call. response from backend:", response);
      navigate("/team");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/team">Back to Team</Link>
          </Button>
        </Box>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
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
              <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500">
                  {values.cv ? values.cv.name : <label htmlFor="cv">Upload CV</label>}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="cv"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("cv", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.cv && errors.cv && (
                  <div>{errors.cv}</div>
                )}
              </Box>

              <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
                <Typography variant="h5" color={colors.greenAccent[500]} fontWeight="500" sx={{ gridColumn: "span 2" }}>
                  {values.contract ? values.contract.name : <label htmlFor="contract">Upload Contract</label>}
                </Typography>
                <input
                  type="file"
                  accept=".pdf"
                  name="contract"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("contract", e.currentTarget.files[0]);
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                {touched.contract && errors.contract && (
                  <div>{errors.contract}</div>
                )}
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create New User"
                )}
              </Button>
            </Box>

            {isError && (
              <Box mt="20px" color="error.main">
                Error creating user. Please try again.
              </Box>
            )}

            {data && (
              <Box mt="20px" color="success.main">
                User created successfully!
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  FirstName: yup.string().required("required"),
  LastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  NationalID: yup.string().required("required"),
  BirthDate: yup.date().required("required"),
  UserRoles: yup.string().required("required"),
  Address: yup.string().required("required"),
  cv: yup.mixed().test("fileType", "Invalid file format", (value) => {
    return value && value.length > 0 && value[0].type === "application/pdf";
  }),
  contract: yup.mixed().test("fileType", "Invalid file format", (value) => {
    return value && value.length > 0 && value[0].type === "application/pdf";
  }),
  
});
const initialValues = {
  FirstName: "",
  LastName: "",
  email: "",
  contact: "",
  password: "",
  NationalID: "",
  BirthDate: "",
  UserRoles: "",
  Address: "",
  cv: null,
  contract: null,
};

export default UserForm;
