import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useCreateUserMutation } from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { SHA256 } from "crypto-js";
import CryptoJS from "crypto-js";
import ReusableTextField from "./ReusableTextField"; // Import the reusable text field component
import ReusableFileUploadField from "./ReusableFileUploadField"; // Import the reusable file upload field component


const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createUser, { isLoading, isError, data }] = useCreateUserMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentSection, setCurrentSection] = useState(0);

  const calculateChecksum = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target.result;
          const data = new Uint8Array(arrayBuffer);
          const calculatedChecksum = SHA256(
            CryptoJS.lib.WordArray.create(data)
          ).toString(CryptoJS.enc.Hex);
          resolve(calculatedChecksum);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      // Calculate checksum for cv_file
      const cvFileChecksum = values.file_cv_file
        ? await calculateChecksum(values.file_cv_file)
        : null;

      // Calculate checksum for contract_file
      const contractFileChecksum = values.file_contract_file
        ? await calculateChecksum(values.file_contract_file)
        : null;

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append checksums to FormData
      formData.append("cv_file_checksum", cvFileChecksum);
      formData.append("contract_file_checksum", contractFileChecksum);

      console.log("The cv file checksum is:", cvFileChecksum);
      console.log("The contract file checksum is:", contractFileChecksum);

      console.log("Form submission initiated. Values:", values);
      const response = await createUser(formData);
      console.log(
        "After mutation call. response from backend:",
        response
      );
      navigate("/team");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const sections = [
    { title: "SECTION 1", subtitle: "Personal Information", fields: ["text_FirstName", "text_LastName", "text_email", "text_contact", "file_test_file"] },
    { title: "SECTION 2", subtitle: "Security Information", fields: ["text_password", "text_NationalID", "text_BirthDate"] },
    { title: "SECTION 3", subtitle: "Additional Information", fields: ["text_UserRoles", "text_Address"] },
    { title: "SECTION 4", subtitle: "Document Upload", fields: ["file_cv_file", "file_contract_file"] },
  ];

  const renderFields = (values, errors, touched, handleBlur, handleChange, setFieldValue) => {
    const currentSectionFields = sections[currentSection].fields;
    return currentSectionFields.map((field) => {
      const [type, fieldName] = field.split('_');
      return type === 'text' ? (
        <ReusableTextField
          key={fieldName}
          values={values}
          fieldName={fieldName}
          label={fieldName}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
        />
      ) : (
        <ReusableFileUploadField
          key={fieldName}
          values={values}
          fieldName={fieldName}
          label={`Upload ${fieldName}`}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
        />
      );
    });
  };

  const initialValues = {
    text_FirstName: "",
    text_LastName: "",
    text_email: "",
    text_contact: "",
    text_password: "",
    text_NationalID: "",
    text_BirthDate: "",
    text_UserRoles: "",
    text_Address: "",
    file_cv_file: null,
    file_contract_file: null,
  };

  const validationSchema = yup.object().shape({
    text_FirstName: yup.string().required("required"),
    text_LastName: yup.string().required("required"),
    text_email: yup.string().email("invalid email").required("required"),
    text_contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    text_password: yup.string().required("required"),
    text_NationalID: yup.string().required("required"),
    text_BirthDate: yup.date().required("required"),
    text_UserRoles: yup.string().required("required"),
    text_Address: yup.string().required("required"),
    file_cv_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
      if (!value || value.length === 0 || !value[0]) {
        return true; // No file provided or empty array, validation passes
      }
      if (value[0].type !== "application/pdf") {
        return false; // File type is not PDF, validation fails
      }
      return true; // Validation passes
    }),
    file_contract_file: yup.mixed().test("fileType", "Invalid file format. Please upload a PDF file.", (value) => {
      if (!value || value.length === 0 || !value[0]) {
        return true; // No file provided or empty array, validation passes
      }
      if (value[0].type !== "application/pdf") {
        return false; // File type is not PDF, validation fails
      }
      return true; // Validation passes
    }),
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={sections[currentSection].title}
          subtitle={sections[currentSection].subtitle}
        />
        <Box display="flex" justifyContent="end" mt="20px">
          {currentSection > 0 && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setCurrentSection((prev) => prev - 1)}
            >
              Previous
            </Button>
          )}
          {currentSection < sections.length - 1 && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setCurrentSection((prev) => prev + 1)}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
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
              {renderFields(values, errors, touched, handleBlur, handleChange)}

              <Box
                display="flex"
                justifyContent="end"
                mt="20px"
                gridColumn="span 4"
              >
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : currentSection === sections.length - 1 ? (
                    "Create New User"
                  ) : (
                    "Next"
                  )}
                </Button>
              </Box>

              {isError && (
                <Box mt="20px" color="error.main">
                  Error creating user. Please try again.
                </Box>
              )}

              {data && (
                <Box mt="20px" color="success.main">
                  User created successfully!
                </Box>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export default UserForm;
