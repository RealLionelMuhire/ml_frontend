// FileUpload.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FileUpload = ({ values, touched, errors, handleChange, setFieldValue }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <React.Fragment>
      <Box  display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 4", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
        <Typography variant="h5" fontWeight="500">
          User Documents
        </Typography>
      </Box>
      <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
        <Typography variant="h5" fontWeight="500">
          {values.cv_file ? values.cv_file.name : <label htmlFor="cv_file">Upload CV</label>}
        </Typography>
        <input
          type="file"
          accept=".pdf"
          name="cv_file"
          onChange={(e) => {
            handleChange(e);
            setFieldValue("cv_file", e.currentTarget.files[0]);
          }}
        />
      </Box>
      <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
        <Typography variant="h5" fontWeight="500">
          {values.contract_file ? values.contract_file.name : <label htmlFor="contract_file">Upload Contract</label>}
        </Typography>
        <input
          type="file"
          accept=".pdf"
          name="contract_file"
          onChange={(e) => {
            handleChange(e);
            setFieldValue("contract_file", e.currentTarget.files[0]);
          }}
        />
      </Box>
      <Box variant="outlined" display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[400], gridColumn: "span 2", margin: "1px 0px 1px", borderRadius: "4px", padding: "13px 5px"}}>
        <Typography variant="h5"  fontWeight="500">
          {values.national_id_file ? values.national_id_file.name : <label htmlFor="cv_file">Upload National ID</label>}
        </Typography>
        <input
          type="file"
          accept=".pdf"
          name="national_id_file"
          onChange={(e) => {
            handleChange(e);
            setFieldValue("national_id_file", e.currentTarget.files[0]);
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default FileUpload;
