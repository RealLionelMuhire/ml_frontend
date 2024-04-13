import React from "react";
import { Paper, Typography } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="body2" gutterBottom>
        **Terms and Conditions**
      </Typography>
      <Typography variant="body2">
        {/* Replace this text with your actual terms and conditions */}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio
        magna. In nec leo pretium, sollicitudin leo vel, scelerisque nunc. Sed
        diam non nisi aliquam consectetur eu euismod magna. Vivamus magna justo,
        laoreet sit amet eros nec, imperdiet ullamcorper magna. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Maecenas sed diam eget risus varius blandit. Donec rutrum
        congue leo eget malesuada. Nulla facilisi eros in odio euismod laoreet.
        Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas
        eget quam. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Donec velit erat, id ullamcorper magna.
        Sed porttitor lectus nibh.
      </Typography>
    </Paper>
  );
};

export default TermsAndConditions;
