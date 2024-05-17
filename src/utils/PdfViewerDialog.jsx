import React from "react";
import { Button } from "@mui/material";

const PdfViewerDialog = ({ file }) => {
  const handleOpenInNewTab = () => {
    const pdfDataUrl = `data:application/pdf;base64,${file.file_content}`;
    const newTab = window.open();
    newTab.document.write(
      `<iframe src="${pdfDataUrl}" width="100%" height="100%" style="border:none;"></iframe>`
    );
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleOpenInNewTab}>
      View {file.file_name}
    </Button>
  );
};

export default PdfViewerDialog;
