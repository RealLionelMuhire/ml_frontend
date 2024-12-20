import React, { useState, useEffect } from "react";
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
import FeedbackDialog from "../global/FeedbackDialog";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import LocalStorageUtils from "../../utils/localStorageUtils";

const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  // const [step, setStep] = useState(1);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    cv_file: [],
    contract_file: [],
    national_id_file: [],
    other_docs: [],
  };
  const LOCAL_STORAGE_KEY = "userFormData";
  const LOCAL_STORAGE_STEP_KEY = "userFormStep";

  // Local state for form values and step
  const [formValues, setFormValues] = useState(null); // Start with null
  const [step, setStep] = useState(() => {
    const savedStep = LocalStorageUtils.get(LOCAL_STORAGE_STEP_KEY);
    return savedStep || 1;
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = LocalStorageUtils.get(LOCAL_STORAGE_KEY);
    if (savedData) {
      setFormValues(savedData);
    } else {
      setFormValues(initialValues);
    }
  }, []);

  // Show spinner if `formValues` is not yet initialized
  if (!formValues) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleStepChange = (newStep, values) => {
    LocalStorageUtils.save(LOCAL_STORAGE_KEY, values);
    LocalStorageUtils.save(LOCAL_STORAGE_STEP_KEY, newStep);
    setStep(newStep);
  };
  const handleFormSubmit = async (values) => {
    try {
  
      setDialogLoading(true);
      setIsDialogOpen(true);
      setDialogMessage("Creating User...");
      setDialogSuccess(false);
  
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((fileData) => {
            if (fileData.file_object instanceof File) {
              formData.append(key, fileData.file_object);
            }
          });
        } else {
          formData.append(key, value);
        }
      });
      console.log("user form data:", formData)
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
        navigate("/team");
      }
    } catch (error) {
      const errorMessage = `An error occurred: ${error.message}`;
      setDialogMessage(errorMessage);
      setDialogSuccess(false);
      toast.error(errorMessage);
    } finally {
      setDialogLoading(false);
      LocalStorageUtils.clear(LOCAL_STORAGE_KEY);
      LocalStorageUtils.clear(LOCAL_STORAGE_STEP_KEY);
      navigate("/team");
    }
  };

  function createFileSchema(maxSizeMB = 10) {
    return yup.mixed().test(
      "fileSize",
      `Each file must be smaller than ${maxSizeMB} MB.`,
      (value) => {
  
        if (!value || !Array.isArray(value) || value.length === 0) {
          return true; // Allow empty uploads
        }
  
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
        return value.every((file) => {
          if (file.file_object && file.file_object.size) {
            return file.file_object.size <= maxSizeBytes; // Validate file size
          }
          return false; // Fail validation if size is unavailable
        });
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
    other_docs: createFileSchema(),
    accessLevel: yup.string(),
  });


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
      <Box
        display="grid"
        gridTemplateColumns="130px auto"
        gap="5px"
        alignItems="start"
      >

      {/* Navigation Boxes */}
      <Box
        display="grid"
        gridRow="span 2"
        alignItems="start"
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
          onClick={() => handleStepChange(1, formValues)}
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
          onClick={() => handleStepChange(2, formValues)}
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
        initialValues={formValues}
        enableReinitialize={true}
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
              
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
                display="grid"
                rowGap="10px"
                columnGap="10px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                position="relative"
                sx={{
                  border: `1px solid ${colors.grey[500]}`,
                  padding: "3px",
                  borderRadius: "4px",
                  height: "65vh",
                  overflowY: "auto",
                  width: "100%",
                  alignItems: "start",
                  gridAutoRows: "auto"
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
            </Box>

            {/* Previous and Next Buttons */}
            <Box display="flex" justifyContent="space-between">
              {step !== 1 && (
                <Box display="flex" mt="20px">
                  <Button
                    variant="contained"
                    onClick={() => handleStepChange(step - 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
      </Box>

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
