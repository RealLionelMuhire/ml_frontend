import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useGetClientsQuery } from "../../state/api";
import { useCreateAlertMutation } from "../../state/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AlertsForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createAlert] = useCreateAlertMutation();
  const navigate = useNavigate();

  const { data: clientData } = useGetClientsQuery();
  const handleFormSubmit = async (values) => {
    try {
      const selectedClient = clientData?.find(
        (client) => client.firstName === values.clientName
      );

      const alertData = {
        title: values.title,
        description: values.description,
        schedule_date: values.schedule_date,
        expiration_date: values.expiration_date,
      };

      if (selectedClient) {
        alertData.clientId = selectedClient.id;
      }

      const result = await createAlert({ alertData });
      if (result?.error) {
        toast.error(result.error?.data?.message);
      }
      if (result?.data) {
        toast.success(result.data?.message);
      }
      navigate("/alerts");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SCHEDULE REMINDER OR AN ALERT"
          subtitle="Schedule reminder or an alert and set the expiration date"
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/alerts">Back to Reminders and Alerts</Link>
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Alert Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Schedule Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.schedule_date}
                name="schedule_date"
                error={!!touched.schedule_date && !!errors.schedule_date}
                helperText={touched.schedule_date && errors.schedule_date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Expiration Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expiration_date}
                name="expiration_date"
                error={!!touched.expiration_date && !!errors.expiration_date}
                helperText={touched.expiration_date && errors.expiration_date}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="clientNameLabel">Select an Active Client Name (Optional)</InputLabel>
                <Select
                  labelId="clientNameLabel"
                  id="clientName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.clientName || ""}
                  name="clientName"
                  error={!!touched.clientName && !!errors.clientName}
                >
                  {clientData &&
                    clientData.map((client) => (
                      <MenuItem key={client.id} value={client.firstName}>
                        {client.firstName} {client.lastName} with Passport or
                        ID: {client.passportIdNumber}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Reminder or an Alert
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  clientName: yup.string(),
  title: yup.string().required("Required"),
  description: yup.string(),
  schedule_date: yup.date().required("Required").min(new Date(), "Must be in the future"),
  expiration_date: yup.date().required("Required").min(new Date(), "Must be in the future"),
});

const initialValues = {
  clientName: "",
  title: "",
  description: "",
  schedule_date: "",
  expiration_date: "",
};

export default AlertsForm;
