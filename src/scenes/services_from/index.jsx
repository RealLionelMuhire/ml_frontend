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
import { useCreateServiceMutation } from "../../state/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ServicesForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createService] = useCreateServiceMutation();
  const navigate = useNavigate();

  const { data: clientData } = useGetClientsQuery();
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const selectedClient = clientData.find(
        (client) => client.firstName === values.clientName
      );

      const result = await createService({
        clientId: selectedClient.id,
        serviceData: {
          title: values.activityTitle,
          objective: values.objective,
          service_cost_per_hour: values.service_cost_per_hour,
          currency: values.currency,
        },
      });
      if (result?.error) {
        toast.error(result.error?.data?.message);
        onSubmitProps.resetForm();
      }
      if (result?.data) {
        toast.success(result.data?.message);
        navigate("/services");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const serviceTitles = [
    "Setting up and incorporation",
    "Corporate Governance",
    "Legal and Compliance Assistance",
    "Private Notary Services",
    "Taxation",
    "Accounting",
    "Fund Services",
    "Intellectual property",
    "Training",
  ];

  const currencies = ["RWF", "USD", "EUR", "GBP", "JPY"];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="INITIATION OF A NEW SERVICE"
          subtitle="Starting a new service.. Note that logging out will automatically close all initiated services"
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/services">Back to Services</Link>
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="clientNameLabel">Client Name</InputLabel>
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
              <TextField
                fullWidth
                variant="filled"
                label="Service Title"
                select
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.activityTitle}
                name="activityTitle"
                error={!!touched.activityTitle && !!errors.activityTitle}
                helperText={touched.activityTitle && errors.activityTitle}
                sx={{ gridColumn: "span 4" }}
              >
                {serviceTitles.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Objective"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.objective}
                name="objective"
                error={!!touched.objective && !!errors.objective}
                helperText={touched.objective && errors.objective}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cost Per Hour"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service_cost_per_hour}
                name="service_cost_per_hour"
                error={
                  !!touched.service_cost_per_hour &&
                  !!errors.service_cost_per_hour
                }
                helperText={
                  touched.service_cost_per_hour && errors.service_cost_per_hour
                }
                sx={{ gridColumn: "span 4" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="currencyLabel">Currency</InputLabel>
                <Select
                  labelId="currencyLabel"
                  id="currency"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.currency}
                  name="currency"
                  error={!!touched.currency && !!errors.currency}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Initiate a new service
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  clientName: yup.string().required("Required"),
  activityTitle: yup.string().required("Required"),
  objective: yup.string(),
  service_cost_per_hour: yup
    .number()
    .required("Required")
    .min(0, "Cannot be negative"),
  currency: yup.string(),
});

const initialValues = {
  clientName: "",
  activityTitle: "",
  objective: "",
  service_cost_per_hour: "",
  currency: "",
};

export default ServicesForm;
