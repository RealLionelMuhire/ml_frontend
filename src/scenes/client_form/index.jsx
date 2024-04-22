import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCreateUserMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormFields1 from "./FormField1";
import FormFields2 from "./FormField2";
import FormFields3 from "./FormField3";
import FormFields4 from "./FormField4";
import FormFields5 from "./FormField5";
import FormFields6 from "./FormField6";
import FormFields7 from "./FormField7";
import FormFields8 from "./FormField8";
import FormFields9 from "./FormField9";
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
      console.log("form data:");

      const response = await createUser(formData);

      if (response.error && response.error.data.detail) {
        toast.error(response.error.data.detail);
        navigate("/dashboard");
      } else if (response.error) {
        toast.error(response.error?.data?.message || "An error occurred");
      } else if (response.data) {
        toast.success(response.data?.message);
        navigate("/clients");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    // Ultimate Beneficiary Owner / Shareholder (Client)
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

    // Legal Person (Complete this section if the Shareholder is a legal entity)
    authorisedName: yup.string(),
    authorisedEmail: yup.string().email("Invalid email"),
    authorisedPersonContact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid"),
    authorisedCurrentAddress: yup.string(),
    authorisedRelationship: yup.string(),
    signature_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true;
          }
          if (value[0].type !== "application/pdf") {
            return false;
          }
          return true;
        }
      ),
    isPep: yup.string().required("required"),
    bankStatement_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),
    professionalReference_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),
    countryOfIncorporation: yup.string(),
    incorporationDate: yup.date(),
    registeredOfficeAddress: yup.string(),
    businessActivity: yup.string(),
    countryOfOperation: yup.string(),

    // Similar Application
    changedName: yup.string(),
    similarApplicationDetailsName: yup.string(),
    financialServicesBusiness: yup.string(),
    jurisdictionName: yup.string(),
    jurisdictionAddress: yup.string(),
    similarApplication: yup.string(),
    similarApplicationDetailsPartner: yup.string(),
    criticised: yup.string(),
    similarApplicationDetailsJurisdictions: yup.string(),

    // Bankruptcy
    bankruptcyApplication: yup.string(),
    similarApplicationDetailsForfeit: yup.string(),
    receiverAppointed: yup.string(),
    similarApplicationDetailsReceiver: yup.string(),
    civilProceedings: yup.string(),
    similarApplicationDetailsFinancial: yup.string(),
    convicted: yup.string(),
    imilarApplicationDetailsOffence: yup.string(),
    directorConvicted: yup.string(),
    similarApplicationDetailsDirector: yup.string(),

    // Remitting Party
    RemittingParty: yup.string(),
    ModeOfPayment: yup.string(),
    RelationshipWithApplicant: yup.string(),
    ProposedNameOption1: yup.string(),
    ProposedNameOption2: yup.string(),
    ProposedNameOption3: yup.string(),

    // Company Details
    proposedActivity: yup.string(),
    targetSectors: yup.string(),
    targetedCountries: yup.string(),
    specialLicense: yup.string(),
    secretary: yup.string(),
    productService: yup.string(),
    businessAddress: yup.string(),

    // Source of Funds
    sourceOfFunds: yup.string(),
    otherSourceOfFunds: yup.string(),
    countrySourceFunds: yup.string(),
    netAnnualIncome: yup.string(),
    estimatedNetWorth: yup.string(),
    sourceOfWealth: yup.string(),
    otherSourceOfWealth: yup.string(),
    countrySourceWealth: yup.string(),
    bankInvolvedWealth: yup.string(),

    financialForecast: yup.array().of(
      yup.object().shape({
        year1: yup
          .number()
          .nullable()
          .required("Year 1 is required")
          .min(0, "Year 1 must be a positive number"),
        year2: yup
          .number()
          .nullable()
          .required("Year 2 is required")
          .min(0, "Year 2 must be a positive number"),
        year3: yup
          .number()
          .nullable()
          .required("Year 3 is required")
          .min(0, "Year 3 must be a positive number"),
      })
    ),
    confirmationLetter_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),

    bank_statement_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),

    custody_accounts_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),

    source_of_funds_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),
    payslips_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),

    due_diligence_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),

    financial_statements_file: yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      ),
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

    changedName: "",
    similarApplicationDetailsName: "",
    financialServicesBusiness: "",
    jurisdictionName: "",
    jurisdictionAddress: "",
    similarApplication: "",
    similarApplicationDetailsPartner: "",
    criticised: "",
    similarApplicationDetailsJurisdictions: "",

    bankruptcyApplication: "",
    similarApplicationDetailsForfeit: "",
    receiverAppointed: "",
    similarApplicationDetailsReceiver: "",
    civilProceedings: "",
    similarApplicationDetailsFinancial: "",
    convicted: "",
    imilarApplicationDetailsOffence: "",
    directorConvicted: "",
    similarApplicationDetailsDirector: "",

    RemittingParty: "",
    ModeOfPayment: "",
    RelationshipWithApplicant: "",
    ProposedNameOption1: "",
    ProposedNameOption2: "",
    ProposedNameOption3: "",

    proposedActivity: "",
    targetSectors: "",
    targetedCountries: "",
    specialLicense: "",
    secretary: "",
    productService: "",
    businessAddress: "",

    sourceOfFunds: "",
    otherSourceOfFunds: "",
    countrySourceFunds: "",
    netAnnualIncome: "",
    estimatedNetWorth: "",
    sourceOfWealth: "",
    otherSourceOfWealth: "",
    countrySourceWealth: "",
    bankInvolvedWealth: "",

    financialForecast: [
      {
        id: 0,
        description: "Currency",
        year1: "",
        year2: "",
        year3: "",
      },
      {
        id: 1,
        description: "Initial Investment",
        year1: "",
        year2: "",
        year3: "",
      },
      {
        id: 2,
        description: "Income from Business Activities",
        year1: "",
        year2: "",
        year3: "",
      },
      { id: 3, description: "Expenses", year1: "", year2: "", year3: "" },
      { id: 4, description: "Net Profit", year1: "", year2: "", year3: "" },
    ],
    confirmationLetter_file: null,
    bank_statement_file: null,
    custody_accounts_file: null,
    source_of_funds_file: null,
    payslips_file: null,
    due_diligence_file: null,
    financial_statements_file: null,
  };

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
          subtitle="Please fill in the blank fields in the form below. This information will help us to serve Client better."
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
                <FormFields1
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 2 && (
                <FormFields2
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 3 && (
                <FormFields3
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 4 && (
                <FormFields4
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 5 && (
                <FormFields5
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 6 && (
                <FormFields6
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 7 && (
                <FormFields7
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 8 && (
                <FormFields8
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 9 && (
                <FormFields9
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                />
              )}
            </Box>

            {/* Previous and Next Buttons */}
            <Box display="flex" justifyContent="space-between">
              {step !== 1 && (
                <Box display="flex" mt="20px">
                  <Button
                    variant="contained"
                    onClick={prevStep}
                    color="secondary"
                  >
                    Previous
                  </Button>
                </Box>
              )}
              {step === 1 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 2 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 3 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 4 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 5 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 6 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 7 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 8 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 9 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="secondary" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Box>
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
