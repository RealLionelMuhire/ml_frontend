import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

const PdfViewerDialog = ({ file }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const pdfDataUrl = `data:application/pdf;base64,${file.file_content}`;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        View {file.file_name}
      </Button>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>{file.file_name}</DialogTitle>
        <DialogContent dividers>
          <div style={{ height: "750px" }}>
            <Worker workerUrl={pdfjsWorker}>
              <Viewer
                fileUrl={pdfDataUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PdfViewerDialog;
