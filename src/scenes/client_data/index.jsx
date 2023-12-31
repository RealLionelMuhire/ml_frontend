import { Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PassportInfoForm from "./PassportInfoForm";
import CompanyInfoForm from "./CompanyInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCreateClientMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const personalInfoSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  clientEmail: yup.string().email("Invalid email").required("required"),
  clientContact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  // ... (define validation for personal info fields)
});

const passportInfoSchema = yup.object().shape({
  passportIdNumber: yup.string().required("required"),
  birthDate: yup.date().required("required"),
  citizenship: yup.string().required("required"),
  countryOfResidence: yup.string(),
  // ... (define validation for passport info fields)
});

const companyInfoSchema = yup.object().shape({
  passportExpiryDate: yup.date(),
  countryOfIssue: yup.string(),
  preferredLanguage: yup.string().required("required"),
  companyName: yup.string(),
  clientRole_InCompany: yup.string(),
  // ... (define validation for company info fields)
});

const addressInfoSchema = yup.object().shape({
  currentAddress: yup.string().required("required"),
  taxResidency: yup.string().required("required"),
  tinNumber: yup.string().required("required"),
  // ... (define validation for address info fields)
});
// const checkoutSchema = yup.object().shape({});

const initialPersonalInfoValues = {
  firstName: "",
  lastName: "",
  clientEmail: "",
  clientContact: "",
  // ... (initialize personal info fields)
};

const initialPassportInfoValues = {
  passportIdNumberNumber: "",
  birthDate: "",
  citizenship: "",
  countryOfResidence: "",
  // ... (initialize passport info fields)
};

const initialCompanyInfoValues = {
  passportExpiryDate: "",
  countryOfIssue: "",
  preferredLanguage: "",
  companyName: "",
  clientRole_InCompany: "",
  // ... (initialize company info fields)
};

const initialAddressInfoValues = {
  currentAddress: "",
  taxResidency: "",
  tinNumber: "",
  // ... (initialize address info fields)
};

const ClientsData = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading, isError, data }] = useCreateClientMutation();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      const response = await createUser(values);
      navigate("/clients");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="REGISTER A CLIENT"
          subtitle="Register a new client and Company information"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/clients">Back to Client List</Link>
          </Button>
        </Box>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={
          currentStep === 1
            ? initialPersonalInfoValues
            : currentStep === 2
            ? initialPassportInfoValues
            : currentStep === 3
            ? initialCompanyInfoValues
            : initialAddressInfoValues
        }
        validationSchema={
          currentStep === 1
            ? personalInfoSchema
            : currentStep === 2
            ? passportInfoSchema
            : currentStep === 3
            ? companyInfoSchema
            : addressInfoSchema
        }
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
            {currentStep === 1 && (
              <PersonalInfoForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            )}
            {currentStep === 2 && (
              <PassportInfoForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            )}
            {currentStep === 3 && (
              <CompanyInfoForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            )}
            {currentStep === 4 && (
              <AddressInfoForm
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            )}

            <Box display="flex" justifyContent="space-between" mt="20px">
              {currentStep > 1 && (
                <Button
                  type="button"
                  color="secondary"
                  variant="outlined"
                  onClick={handlePrevStep}
                >
                  Previous
                </Button>
              )}

              {currentStep < 4 && (
                <Button
                  type="button"
                  color="secondary"
                  variant="contained"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              )}

              {currentStep === 4 && (
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register a New Client"
                  )}
                </Button>
              )}
            </Box>

            {isError && (
              <Box mt="20px" color="error.main">
                Error registering client. Please try again.
              </Box>
            )}

            {data && (
              <Box mt="20px" color="success.main">
                Client registered successfully!
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ClientsData;
