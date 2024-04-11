import React, { useState } from "react";
import { Autocomplete, TextField, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../../theme";


const Search = ({ filteredClients, handleClientClick, searchBoxRef }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (event, newValue) => {
    setSelectedClient(newValue);
    handleClientClick(newValue);
  };

  return (
    <Autocomplete
      options={filteredClients || []}
      getOptionLabel={(client) => `${client.id}. ${client.firstName} ${client.lastName}`}
      value={selectedClient || null}
      onChange={handleChange}
      disablePortal
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Client"
          variant="outlined"
          sx={{ 
            backgroundColor: colors.primary[400],
            borderRadius: "5px",
            width: "100%" }}

          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <IconButton type="button">
                  <SearchIcon />
                </IconButton>
                {params.InputProps.startAdornment}
              </>
            ),
          }}
          inputRef={searchBoxRef}
        />
      )}
    />
  );
};

export default Search;
