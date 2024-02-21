import React from "react";
import { Box, Typography } from "@mui/material";

const FilteredClientsBox = ({ searchQuery }) => {
  // Fetch and filter your clients based on searchQuery
  const clients = []; // Replace with your actual client data
  const filteredClients = clients?.filter((client) => {
    const searchTerm = searchQuery.trim().toLowerCase();
    if (searchTerm === "") {
      return true;
    }
    return Object.values(client).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <Box mt={2} p={2}>
      {filteredClients?.length ? (
        // Render the filtered clients if there are results
        filteredClients.map((client) => (
          <Typography key={client.id}>
            {client.firstName} {client.lastName}
          </Typography>
        ))
      ) : (
        // Display a message if no results are found
        <Typography>No clients found.</Typography>
      )}
    </Box>
  );
};

export default FilteredClientsBox;
