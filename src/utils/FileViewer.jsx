import React from "react";
import axios from "axios";

class FileViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewing: false,
      error: null,
    };
  }

  viewFile = async () => {
    const { url } = this.props;
    try {
      window.open(url, "_blank");
      this.setState({ viewing: true });
    } catch (error) {
      console.error("Error viewing file:", error);
      this.setState({
        viewing: false,
        error: error.message || "An error occurred",
      });
    }
  };

  downloadFile = async () => {
    const { url } = this.props;
    try {
      const response = await axios({
        method: "GET",
        url: url,
        responseType: "blob",
      });

      // Create a temporary link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      this.setState({ downloading: false });
    } catch (error) {
      console.error("Error downloading file:", error);
      this.setState({
        downloading: false,
        error: error.message || "An error occurred",
      });
    }
  };

  render() {
    const { viewing, error } = this.state;
    return (
      <div>
        {!viewing && <button onClick={this.viewFile}>View File</button>}
        {error && <div>Error: {error}</div>}
      </div>
    );
  }
}

export default FileViewer;
