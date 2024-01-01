import { Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import LegalPersonForm from "./PersonalInfoForm";
import PassportInfoForm from "./PassportInfoForm";
import CompanyInfoForm from "./CompanyInfoForm";
import AddressInfoForm from "./AddressInfoForm";
import Header from "../../components/Header";
import { useCreateClientMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const LegalPersonSchema = yup.object().shape({
  nameOfEntity: yup.string(),
  previousName: yup.string(),
  typeOfEntity: yup.string(),
  typeOfLicence: yup.string(),
  dateOfIncorporation: yup.date(),
  countryOfIncorporation: yup.string(),
  taxResidency: yup.string(),
  registeredOfficeAddress: yup.string(),
  businessActivity: yup.string(),
  countryOfOperation: yup.string(),
  phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  // Authorised Person Information
  authorizedName: yup.string(),
  authorizedAddress: yup.string(),
  authorizedEmail: yup.string().email("Invalid email"),
  relationshipWithClient: yup.string(),
  authorizedPhoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid"),
  authorizedSignatorySignature: yup.string(),
  designation: yup.string(),
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

const initialLegalPersonValues = {
  nameOfEntity: "",
  previousName: "",
  typeOfEntity: "",
  typeOfLicence: "",
  dateOfIncorporation: "",
  countryOfIncorporation: "",
  taxResidency: "",
  registeredOfficeAddress: "",
  businessActivity: "",
  countryOfOperation: "",
  phoneNumber: "",

  // Authorised Person Information
  authorizedName: "",
  authorizedAddress: "",
  authorizedEmail: "",
  relationshipWithClient: "",
  authorizedPhoneNumber: "",
  authorizedSignatorySignature: "",
  designation: "",
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

  const getTitleAndSubtitle = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "LEGAL PERSON INFORMATION",
          subtitle:
            "Complete this section if the Shareholder is a legal entity",
        };
      case 2:
        return {
          title: "PASSPORT INFORMATION",
          subtitle: "Subtitle for Passport Info Form",
        };
      case 3:
        return {
          title: "COMPANY INFORMATION",
          subtitle: "Subtitle for Company Info Form",
        };
      case 4:
        return {
          title: "ADDRESS INFORMATION",
          subtitle: "Subtitle for Address Info Form",
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={subtitle} />
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
            ? initialLegalPersonValues
            : currentStep === 2
            ? initialPassportInfoValues
            : currentStep === 3
            ? initialCompanyInfoValues
            : initialAddressInfoValues
        }
        validationSchema={
          currentStep === 1
            ? LegalPersonSchema
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
              <LegalPersonForm
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
