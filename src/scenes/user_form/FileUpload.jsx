// FileUpload.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import FileUploadField from "../../utils/FileUploadField";

const FileUpload = ({
  values,
  errors,
  touched,
  setFieldValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          marginBottom: "10px",
          borderRadius: "4px",
          padding: "10px 8px",
        }}
      >
        <Typography variant="h5" fontWeight="500">
          User Documents
        </Typography>
      </Box>

      <FileUploadField
        label="Upload CV"
        name="cv_file"
        value={Array.isArray(values.cv_file) ? values.cv_file : []}
        error={errors.cv_file}
        touched={touched.cv_file}
        setFieldValue={setFieldValue}
        accept=".pdf"
      />

      <FileUploadField
        label="Upload Contract"
        name="contract_file"
        value={Array.isArray(values.contract_file) ? values.contract_file : []}
        error={errors.contract_file}
        touched={touched.contract_file}
        setFieldValue={setFieldValue}
        accept=".pdf"
      />

      <FileUploadField
        label="Upload National ID or Passport"
        name="national_id_file"
        value={Array.isArray(values.national_id_file) ? values.national_id_file : []}
        error={errors.national_id_file}
        touched={touched.national_id_file}
        setFieldValue={setFieldValue}
        accept=".pdf"
      />
      {/* uploading other necessary compressed folder below 50mbs */}
      <FileUploadField
        label="Upload Other Necessary Documents(Compress in a zip file)"
        name="other_docs"
        value={Array.isArray(values.other_docs) ? values.other_docs : []}
        error={errors.other_docs}
        touched={touched.other_docs}
        setFieldValue={setFieldValue}
        accept=".zip"
      />
    </React.Fragment>
  );
};

export default FileUpload;
