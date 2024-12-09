import React, { useState } from "react";
import { Box, Typography, Button, Input, CircularProgress } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
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
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array of File objects
    if (files.length > 0) {
      setUploading(true);
  
      // Removed FileReader-based conversion since backend requires raw file objects
      const newFiles = files.map((file) => ({
        id: Date.now() + Math.random(),
        file_name: file.name,
        file_object: file,
      }));

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFieldValue(name, [...(value || []), ...files]);
      setUploading(false);
    }
  };
  

  const handleViewFile = (fileContent) => {
    const pdfDataUrl = `data:application/pdf;base64,${fileContent}`;
    const newTab = window.open();
    newTab.document.write(
      `<iframe src="${pdfDataUrl}" width="100%" height="100%" style="border:none;"></iframe>`
    );
  };

  const handleDeleteFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
    setUploadedFiles(updatedFiles);
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
      {/* Label or File Name */}
      {uploadedFiles.length === 0 && (
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
      )}

      {/* Uploaded Files */}
      {uploadedFiles.map((file) => (
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
            {file.file_name}
          </Typography>
          <Box display="flex" alignItems="center">
            {/* View Button */}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<VisibilityRoundedIcon />}
              onClick={() => handleViewFile(file.file_content)}
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
          multiple // Allow multiple files
          onChange={handleFileUpload}
          sx={{ display: "none" }}
        />
        <label htmlFor={name}>
          <Button
            variant="contained"
            component="span"
            color="secondary"
            startIcon={uploadedFiles.length > 0 ? <NoteAddRoundedIcon /> : <AttachFileIcon />}
            disabled={uploading}
          >
            {uploading ? <CircularProgress size={24} /> : uploadedFiles.length > 0 ? "Add File" : "Browse"}
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
