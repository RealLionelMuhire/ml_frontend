import React from "react";
import { Button, Box, Typography } from "@mui/material";

const PdfViewerDialog = ({ file }) => {
  const handleViewFile = () => {
    if (file.file_object) {
      const fileURL = URL.createObjectURL(file.file_object);
      window.open(fileURL, "_blank");
    } else if (file.file_content) {
      const fileExtension = file.file_name.split('.').pop().toLowerCase();
      
      // For PDF files
      if (fileExtension === "pdf") {
        const dataUrl = `data:application/pdf;base64,${file.file_content}`;
        window.open(dataUrl, "_blank");
      } 
      // For JPG/PNG files
      else if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
        const dataUrl = `data:image/${fileExtension};base64,${file.file_content}`;
        window.open(dataUrl, "_blank");
      } 
      // For ZIP files
      else if (fileExtension === "zip") {
        const dataUrl = `data:application/zip;base64,${file.file_content}`;
        window.open(dataUrl, "_blank");
      }
    }
  };
  

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" sx={{ marginRight: 2 }}>
        {file.file_name}
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleViewFile}>
        View
      </Button>
    </Box>
  );
};

export default PdfViewerDialog;
