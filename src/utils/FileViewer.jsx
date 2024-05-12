import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";

// Enable pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileViewer = ({ url }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleViewFile = () => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error viewing file:", error);
      setError(error.message || "An error occurred");
    }
  };

  const handleDownloadFile = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>View File</Button>
      <Button onClick={handleDownloadFile}>Download File</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </DialogContent>
      </Dialog>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default FileViewer;
