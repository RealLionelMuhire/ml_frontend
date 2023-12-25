import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useGetClientsQuery } from "../../state/api";

const ServicesForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Fetch clients data
  const { data: clientData } = useGetClientsQuery();

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="INITIATION OF A NEW SERVICE" subtitle="Starting a new service.. Note that logging out will automatically close all initiated services" />

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
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="clientNameLabel">Client Name</InputLabel>
                <Select
                  labelId="clientNameLabel"
                  id="clientName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.clientName}
                  name="clientName"
                  error={!!touched.clientName && !!errors.clientName}
                >
                  {clientData && clientData.map((client) => (
                    <MenuItem key={client.id} value={client.name}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Activity Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.activityTitle}
                name="activityTitle"
                error={!!touched.activityTitle && !!errors.activityTitle}
                helperText={touched.activityTitle && errors.activityTitle}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  clientName: yup.string().required("required"),
  activityTitle: yup.string().required("required"),
  description: yup.string(),
});

const initialValues = {
  clientName: "",
  activityTitle: "",
  description: "",
};

export default ServicesForm;
