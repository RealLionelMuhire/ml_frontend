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

const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading, isError, data }] = useCreateUserMutation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const findErrorMessageDetail = (errorData) => {
    let errorMessage = null;

    const traverse = (data) => {
      // console.log("===== findErrorMessageDetail.traverse =====");
      // console.log("data:", data);

      if (data && typeof data === "object") {
        // Check if the object has a 'detail' property
        if (data.detail) {
          console.log("data.detail:", data.detail);
          errorMessage = data.detail;
        }
        // Traverse through the object's keys
        for (const key in data) {
          console.log("key:", key);
          if (Array.isArray(data[key])) {
            // If the value is an array, traverse each element
            console.log("data[key]:", data[key]);
            data[key].forEach(traverse);
          } else if (typeof data[key] === "object") {
            // If the value is an object, recursively traverse it
            console.log("data[key]:", data[key]);
            traverse(data[key]);
          }
        }
      }
    };

    traverse(errorData);
    console.log("errorMessage:", errorMessage);
    return errorMessage;
  };

  const findErrorMessageData = (errorData) => {
    let errorMessage = null;

    const traverse = (data) => {
      if (data && typeof data === "object") {
        // Check if the object has a 'message' property
        if (data.message) {
          errorMessage = data.message;
        }
        // Traverse through the object's keys
        for (const key in data) {
          if (Array.isArray(data[key])) {
            // If the value is an array, get the first element
            errorMessage = data[key][0];
          } else {
            // Recursively traverse through nested objects
            traverse(data[key]);
          }
        }
      }
    };

    traverse(errorData);
    return errorMessage;
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "financialForecast") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const response = await createUser(formData);

      if (response.error && response.error.data) {
        const errorMessage = findErrorMessageData(response.error.data);
        if (errorMessage) {
          console.log(errorMessage);
          toast.error(errorMessage);
          // navigate("/dashboard");
          return; // Exit function after displaying error message
        }
      }

      if (!response.ok) {
        // Extract error message from response data
        // const errorMessage = response.data;
        console.log("response not ok", response);
        const errorMessage = findErrorMessageDetail(response.data);
        if (errorMessage) {
          console.log("error data when response not ok", errorMessage);
          toast.error(errorMessage);
          // navigate("/dashboard");
          return; // Exit function after displaying error message
        }
      }

      // Handle other cases if needed
      if (response.error) {
        console.log(response.error);
        toast.error(response.error?.message || "An error occurred");
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
    cv_file: yup
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
    contract_file: yup
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
    accessLevel: yup.string().required("required"),
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
    accessLevel: "",
    cv_file: null,
    contract_file: null,
    national_id_file: null,
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
          title="CREATE USER"
          subtitle="Create a New User Profile and Data"
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/team">Back to Team</Link>
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
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 2 && (
                <FileUpload
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
                <React.Fragment>
                  <Box display="flex" justifyContent="space-between" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : !values.cv_file ||
                        !values.contract_file ||
                        !values.national_id_file ? (
                        "Upload Files First"
                      ) : (
                        "Create New User"
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

export default UserForm;
