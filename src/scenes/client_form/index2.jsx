import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCreateUserMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormFields from "./FormFields";
import FileUpload from "./FileUpload";
import ErrorBox from "./ErrorBox";
import SuccessBox from "./SuccessBox";

const ClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading, isError, data }] = useCreateUserMutation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  

  const handleFormSubmit = async (values) => {
    try {
      
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("form data:",)
      
      const response = await createUser(formData);
      
      if (response.error && response.error.data.detail) {
        toast.error(response.error.data.detail);
        navigate("/dashboard");
      } else if (response.error) {
        toast.error(response.error?.data?.message || "An error occurred");
      } else if (response.data) {
        toast.success(response.data?.message);
        navigate("/team");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  clientEmail: yup.string().email("Invalid email").required("required"),
  clientContact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  passportIdNumber: yup.string().required("required"),
  birthDate: yup.date().required("required"),
  citizenship: yup.string().required("required"),
  countryOfResidence: yup.string(),
  passportExpiryDate: yup.date(),
  countryOfIssue: yup.string(),
  preferredLanguage: yup.string().required("required"),
  NameOfEntity: yup.string(),
  PrevNameOfEntity: yup.string(),
  TypeOfEntity: yup.string(),
  TypeOfLicense: yup.string(),
  sharePercent: yup.string(),
  currentAddress: yup.string().required("required"),
  taxResidency: yup.string(),
  tinNumber: yup.string().required("required"),
  designation: yup.string(),
  introducerName: yup.string(),
  introducerEmail: yup.string().email("Invalid email"),
  contactPersonName: yup.string(),
  contactPersonEmail: yup.string().email("Invalid email"),
  contactPersonPhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid"),
  authorisedName: yup.string(),
  authorisedEmail: yup.string().email("Invalid email"),
  authorisedPersonContact: yup
  .string()
  .matches(phoneRegExp, "Phone number is not valid"),
  authorisedCurrentAddress: yup.string(),
  authorisedRelationship: yup.string(),
  signature_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
  isPep: yup.string().required("required"),
  bankStatement_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
  professionalReference_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
    if (!value || value.length === 0 || !value[0]) {
      return true; // No file provided or empty array, validation passes
    }
    if (value[0].type !== "application/pdf") {
      return false; // File type is not PDF, validation fails
    }
    return true; // Validation passes
  }),
  countryOfIncorporation: yup.string(),
  incorporationDate: yup.date(),
  registeredOfficeAddress: yup.string(),
  businessActivity: yup.string(),
  countryOfOperation: yup.string(),
});
const initialValues = {
  firstName: "",
  lastName: "",
  clientEmail: "",
  clientContact: "",
  passportIdNumber: "",
  birthDate: "",
  citizenship: "",
  countryOfResidence: "",
  passportExpiryDate: "",
  countryOfIssue: "",
  preferredLanguage: "",
  NameOfEntity: "",
  PrevNameOfEntity: "",
  TypeOfEntity: "",
  TypeOfLicense: "",
  sharePercent: "",
  currentAddress: "",
  taxResidency: "",
  tinNumber: "",
  designation: "",
  introducerName: "",
  introducerEmail: "",
  contactPersonName: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
  authorisedName: "",
  authorisedEmail: "",
  authorisedPersonContact: "",
  authorisedCurrentAddress: "",
  authorisedRelationship: "",
  signature_file: null,
  isPep: "",
  bankStatement_file: null,
  professionalReference_file: null,
  countryOfIncorporation: "",
  incorporationDate: "",
  registeredOfficeAddress: "",
  businessActivity: "",
  countryOfOperation: "",
};

  // Handle next and previous steps
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="REGISTER A CLIENT"
          subtitle="Register a new client and Entity information (Ultimate Beneficiary Owner / Shareholder)"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/clients">Back to Client List</Link>
          </Button>
        </Box>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
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
              {step === 1 && (
                <FormFields
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                />
              )}
              {step === 2 && (
                <FileUpload
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
            </Box>

            {/* Previous and Next Buttons */}
            <Box display="flex" justifyContent="space-between">
              {step !== 1 && (
                <Box display="flex" mt="20px">
                  <Button variant="contained" onClick={prevStep} color="secondary">
                    Previous
                  </Button>
                </Box> 
              )}
              {step === 1 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button variant="contained" onClick={nextStep} color="secondary">
                    Next
                  </Button>
                </Box>
              )}
              {step === 2 && (
                <React.Fragment>
                  <Box display="flex" justifyContent="space-between" mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disabled={isLoading || !values.cv_file || !values.contract_file || !values.national_id_file}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        !values.cv_file || !values.contract_file || !values.national_id_file ? (
                          "Upload Files First"
                        ) : (
                          "Create New User"
                        )
                      )}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
            <ErrorBox isError={isError} />
            <SuccessBox data={data} />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ClientForm;