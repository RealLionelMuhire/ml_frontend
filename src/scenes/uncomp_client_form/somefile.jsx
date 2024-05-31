import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  useCreateUserMutation,
  useUpdateUncompletedClientMutation,
  useGetUncompleteClientByIdQuery,
} from "../../state/api";
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
import FormFields10 from "./FormField10";
import FormFields11 from "./FormField11";
import FormFields12 from "./FormField12";
import ErrorBox from "./ErrorBox";
import SuccessBox from "./SuccessBox";

const IncompleteClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isError, data }] = useCreateUserMutation();

  const [isLoadingSaveLater, setIsLoadingSaveLater] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const selectedClientIds = useMemo(
    () => location.state?.selectedClientIds || [],
    [location.state?.selectedClientIds]
  );

  const [updateUncompleteData] = useUpdateUncompletedClientMutation();

  const [step, setStep] = useState(1);

  const { data: clientData, isLoading } =
    useGetUncompleteClientByIdQuery(selectedClientIds);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size={60} color="inherit" />
      </div>
    );
  }

  const client = clientData ? clientData[0] : {};

  const handleFormSubmit = async (values) => {
    try {
      setIsLoadingSubmit(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "financialForecast") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "expectedAccountActivity") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      // console.log("form data:");

      const response = await createUser(formData);

      if (response.error && response.error.data.detail) {
        toast.error(response.error.data.detail);
      } else if (response.error) {
        toast.error(response.error?.data?.message || "An error occurred");
      } else if (response.data) {
        navigate("/clients");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const handleSaveAndContinueLater = async (values) => {
    try {
      setIsLoadingSaveLater(true);

      // Prepare the updated client data
      const incompleteFormData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (
            key === "financialForecast" ||
            key === "expectedAccountActivity"
          ) {
            incompleteFormData.append(key, JSON.stringify(value));
          } else {
            incompleteFormData.append(key, value);
          }
        }
      });

      console.log("incompleteFormData:", incompleteFormData);

      // Loop through each selected client ID and make an API call
      for (const clientId of selectedClientIds) {
        const response = await updateUncompleteData({
          clientId,
          updatedClient: incompleteFormData,
        }).unwrap();

        if (response.error) {
          toast.error(
            `Error updating client ${clientId}: ${response.error.message}`
          );
        } else if (response.data) {
          toast.success(
            `Client ${clientId} updated successfully: ${response.data.message}`
          );
        }
      }

      // Navigate to incomplete clients page after all updates
      navigate("/incomplete-clients");
    } catch (error) {
      console.error("Error saving form for later:", error);
      toast.error("An error occurred while saving the form.");
    } finally {
      setIsLoadingSaveLater(false);
    }
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    // Ultimate Beneficiary Owner / Shareholder (Client)
    firstName: yup.string(),
    lastName: yup.string(),
    clientEmail: yup.string().email("Invalid email"),
    clientContact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid"),
    passportIdNumber: yup.string(),
    birthDate: yup.date(),
    citizenship: yup.string(),
    countryOfResidence: yup.string(),
    passportExpiryDate: yup.date(),
    countryOfIssue: yup.string(),
    preferredLanguage: yup.string(),
    NameOfEntity: yup.string(),
    PrevNameOfEntity: yup.string(),
    TypeOfEntity: yup.string(),
    TypeOfLicense: yup.string(),
    sharePercent: yup.string(),
    currentAddress: yup.string(),
    taxResidency: yup.string(),

    // many more properties
  });

  function createFileSchema() {
    return yup
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
      );
  }

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
    // many more properties
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
          title="COMPLETE A CLIENT REGISTRATION"
          subtitle="Please resume the registration process by completing the blank fields in the form below. This information will help us to serve Client better."
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/incomplete-clients">Back to Incomplete Client List</Link>
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
              {/* other more formfields */}
            </Box>

            {/* Previous and Next Buttons */}
            <Box display="flex" justifyContent="space-between">
              {step !== 13 && (
                <Box display="flex" mt={"20px"}>
                  <Button
                    variant="contained"
                    onClick={() => handleSaveAndContinueLater(values)}
                    color="secondary"
                    disabled={isLoadingSaveLater}
                    style={{ marginRight: "10px" }}
                  >
                    {isLoadingSaveLater ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Save & Continue Later"
                    )}
                  </Button>
                </Box>
              )}
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

              {/* other steps */}
              {step === 11 && (
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
              {step === 12 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    disabled={isLoadingSubmit}
                  >
                    {isLoadingSubmit ? (
                      <CircularProgress size={24} color="inherit" />
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

export default IncompleteClientForm;
