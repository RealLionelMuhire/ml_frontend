import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCreateUserMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormFields from "./FormFields";
import FileUpload from "./FileUpload";
import FeedbackDialog from "../global/FeedbackDialog";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [step, setStep] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    try {
  
      setDialogLoading(true);
      setIsDialogOpen(true);
      setDialogMessage("Creating User...");
      setDialogSuccess(false);
  
      const formData = new FormData();
      formData.append("FirstName", values.FirstName);
      formData.append("LastName", values.LastName);
      formData.append("email", values.email);
      formData.append("contact", values.contact);
      formData.append("password", values.password);
      formData.append("NationalID", values.NationalID);
      formData.append("BirthDate", values.BirthDate);
      formData.append("UserRoles", values.UserRoles);
      formData.append("Address", values.Address);
      formData.append("accessLevel", values.accessLevel);
      if (values.cv_file && values.cv_file.length > 0) {
        values.cv_file.forEach((file) => {
          formData.append("cv_file", file);
        });
      }
      if (values.contract_file && values.contract_file.length > 0) {
        values.contract_file.forEach((file) => {
          formData.append("contract_file", file);
        });
      }
      if (values.national_id_file && values.national_id_file.length > 0) {
        values.national_id_file.forEach((file) => {
          formData.append("national_id_file", file);
        });
      }
  
      const response = await createUser(formData).unwrap();
  
      if (response.error) {
        const errorMessage = response.error.message || "An error occurred";
        setDialogMessage(errorMessage);
        setDialogSuccess(false);
        toast.error(errorMessage);
      } else if (response.data) {
        const successMessage = response.data.message;
        setDialogMessage(successMessage);
        setDialogSuccess(true);
        toast.success(successMessage);

      }
    } catch (error) {
      const errorMessage = `An error occurred: ${error.message}`;
      setDialogMessage(errorMessage);
      setDialogSuccess(false);
      toast.error(errorMessage);
    } finally {
      setDialogLoading(false);
    }
  };

  function createFileSchema() {
    return yup
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
      );
  }

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    FirstName: yup.string(),
    LastName: yup.string(),
    email: yup.string().email("invalid email"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid"),
    password: yup.string(),
    NationalID: yup.string(),
    BirthDate: yup.date(),
    UserRoles: yup.string(),
    Address: yup.string(),
    cv_file: createFileSchema(),

    contract_file: createFileSchema(),
    
    national_id_file: createFileSchema(),
    
    
    accessLevel: yup.string(),
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

      {/* Navigation Boxes */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{
          border: `1px solid ${colors.grey[500]}`,
          padding: "3px",
          borderRadius: "4px",
          backgroundColor: colors.primary[400],
          marginBottom: "3px",
        }}
      >
        <Button
          variant={step === 1 ? "contained" : "outlined"}
          color={step === 1 ? "secondary" : "primary"}
          onClick={() => setStep(1)}
          sx={{
            backgroundColor: step === 1 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 1 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          USER DETAILS
        </Button>
        <Box display="flex" alignItems="center">

        </Box>
        <Button
          variant={step === 2 ? "contained" : "outlined"}
          color={step === 2 ? "secondary" : "primary"}
          onClick={() => setStep(2)}
          sx={{
            backgroundColor: step === 2 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 2 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          USER FILES
        </Button>
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
              gap="10px"
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
                </React.Fragment>
              )}
            </Box>
          </form>
        )}
      </Formik>

      <FeedbackDialog
        isOpen={isDialogOpen}
        message={dialogMessage}
        success={dialogSuccess}
        loading={dialogLoading}
        onClose={() => {
          setIsDialogOpen(false);
          if (dialogSuccess) {
            navigate("/team");
          }
        }}
      />
    </Box>
  );
};

export default UserForm;
