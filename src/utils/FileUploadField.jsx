import React, { useState } from "react";
import { Box, Typography, Button, Input, CircularProgress } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const FileUploadField = ({
  label,
  name,
  value,
  error,
  touched,
  setFieldValue,
  accept = ".pdf",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array of File objects
    if (files.length > 0) {
      setUploading(true);
  
      // Add raw files directly to Formik's value
      setFieldValue(name, [...(value || []), ...files]); 
  
      setUploading(false);
    }
  };
  

  const handleViewFile = (file) => {
    const fileURL = URL.createObjectURL(file.file_object);
    window.open(fileURL, "_blank");
  };

  const handleDeleteFile = (fileId) => {
    const updatedFiles = value.filter((file) => file.id !== fileId);
    setFieldValue(name, updatedFiles);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: colors.primary[400],
        gridColumn: "span 2",
        margin: "8px 0",
        borderRadius: "4px",
        padding: "8px 5px",
      }}
    >
      {/* Label */}
      {!value || value.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            border: `1px solid ${colors.grey[500]}`,
            padding: "3px",
            borderRadius: "4px",
            backgroundColor: colors.primary[400],
            marginBottom: "3px",
          }}
        >
          <Typography variant="h7" fontWeight="500">
            {label}
          </Typography>
        </Box>
      ) : null}

      {/* Uploaded Files */}
      {value &&
        value.map((file) => (
          <Box
            key={file.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border: `1px solid ${colors.grey[500]}`,
              padding: "3px",
              borderRadius: "4px",
              backgroundColor: colors.primary[400],
              marginBottom: "3px",
            }}
          >
            <Typography variant="h7" fontWeight="500">
              {file.name}
            </Typography>
            <Box display="flex" alignItems="center">
              {/* View Button */}
              <Button
                variant="contained"
                color="secondary"
                startIcon={<VisibilityRoundedIcon />}
                onClick={() => handleViewFile(file)}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  "&:hover": { backgroundColor: colors.greenAccent[700] },
                  marginRight: "4px",
                }}
              >
                View
              </Button>

              {/* Delete Button */}
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForeverRoundedIcon />}
                onClick={() => handleDeleteFile(file.id)}
                sx={{
                  backgroundColor: colors.redAccent[500],
                  "&:hover": { backgroundColor: colors.redAccent[700] },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}

      {/* File Upload Input */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Input
          type="file"
          accept={accept}
          id={name}
          name={name}
          multiple
          onChange={handleFileUpload}
          sx={{ display: "none" }}
        />
        <label htmlFor={name}>
          <Button
            variant="contained"
            component="span"
            color="secondary"
            startIcon={value && value.length > 0 ? <NoteAddRoundedIcon /> : <AttachFileIcon />}
            disabled={uploading}
          >
            {uploading ? <CircularProgress size={24} /> : value && value.length > 0 ? "Add File" : "Browse"}
          </Button>
        </label>
      </Box>

      {/* Error Message */}
      {touched && error && (
        <Typography color="error" variant="caption" display="block" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadField;
