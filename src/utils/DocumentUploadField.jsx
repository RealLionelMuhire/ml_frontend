import React, { useState } from "react";
import { Box, Typography, Button, Input, CircularProgress } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const DocumentUploadField = ({
  label,
  name,
  value,
  error,
  touched,
  setFieldValue,
  accept = ".pdf",
  client,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [uploading, setUploading] = useState(false);

  // Normalize client files
  const existingFiles = React.useMemo(() => {
    const files = client?.[name]; // Dynamically access files using the field name
    if (!files) return [];
    return Array.isArray(files) ? files : [files];
  }, [client, name]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      id: `${Date.now()}-${Math.random()}`, // Unique ID
      file_object: file, // Actual File object
      name: file.name,
    }));

    if (files.length > 0) {
      setUploading(true);

      const updatedFiles = [...(value || []), ...files];
      setFieldValue(name, updatedFiles);

      setUploading(false);
    }
  };

  const handleViewFile = (file) => {
    if (file.file_object) {
      // For newly uploaded files
      const fileURL = URL.createObjectURL(file.file_object);
      window.open(fileURL, "_blank");
    } else if (file.file_content) {
      // For files with base64 content
      const fileExtension = file.file_name.split(".").pop().toLowerCase();
  
      if (fileExtension === "pdf") {
        // Handle PDF files
        const dataUrl = `data:application/pdf;base64,${file.file_content}`;
        window.open(dataUrl, "_blank");
      } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
        // Handle image files
        const dataUrl = `data:image/${fileExtension};base64,${file.file_content}`;
        window.open(dataUrl, "_blank");
      } else if (fileExtension === "zip") {
        // Handle ZIP files
        const dataUrl = `data:application/zip;base64,${file.file_content}`;
        window.open(dataUrl, "_blank");
      } else {
        console.error(`Unsupported file type: ${fileExtension}`);
      }
    } else if (file.url) {
      // For existing files with a URL
      window.open(file.url, "_blank");
    } else {
      console.error("No viewable content available for this file.");
    }
  };
  

  const handleDeleteFile = (fileId) => {
    const updatedFiles = value.filter((file) => file.id !== fileId);
    setFieldValue(name, updatedFiles);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        backgroundColor: colors.primary[400],
        gridColumn: "span 2",
        margin: "8px 0",
        borderRadius: "4px",
        padding: "8px 5px",
      }}
    >
      {/* File List */}
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        sx={{
          marginRight: "16px",
        }}
      >
        {/* Label */}
        {!value || value.length === 0 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              gridColumn: "span 2",
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

        {/* Uploaded and Existing Files */}
        {[
          ...existingFiles,
          ...(value || []),
        ].map((file) => (
          <Box
            key={file.id || file.url} // For unique identification
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
              {file.name || file.file_name} {/* Use file.name for new files and file.file_name for existing */}
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
                {file.url || file.file_content ? "View Existing" : "View"} {/* Change label dynamically */}
              </Button>

              {!file.url && (
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
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* File Upload Input */}
      <Box display="flex" alignItems="center" justifyContent="center">
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
            {uploading ? <CircularProgress size={24} /> : value && value.length > 0 ? "" : "Browse"}
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

export default DocumentUploadField;
