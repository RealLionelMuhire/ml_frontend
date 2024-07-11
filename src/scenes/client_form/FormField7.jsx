import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields7 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  isNonMobile,
  setFieldValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <React.Fragment>
      <Box
        variant="outlined"
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "13px 5px",
        }}
      >
        <Typography variant="h5" fontWeight="800">
          PURPOSE AND INTENDED NATURE OF BUSINESS RELATIONSHIP
        </Typography>
      </Box>
      <Box
        variant="outlined"
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "13px 5px",
        }}
      >
        <Typography variant="h6" fontWeight="500" fontStyle="italic">
          B. Company Details
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Proposed activity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.proposedActivity}
        name="proposedActivity"
        error={!!touched.proposedActivity && !!errors.proposedActivity}
        helperText={touched.proposedActivity && errors.proposedActivity}
        sx={{ gridColumn: "span 1" }}
      />

      {/* Target sectors */}
      <TextField
        fullWidth
        variant="filled"
        select
        label="Target sectors"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.targetSectors}
        name="targetSectors"
        error={!!touched.targetSectors && !!errors.targetSectors}
        helperText={touched.targetSectors && errors.targetSectors}
        sx={{ gridColumn: "span 1" }}
      >
        <MenuItem value="Accounting & Auditing">Accounting & Auditing</MenuItem>
        <MenuItem value="Antique Dealers">Antique Dealers</MenuItem>
        <MenuItem value="A­viation">A­viation</MenuItem>
        <MenuItem value="Automobiles">Automobiles</MenuItem>
        <MenuItem value="Cash Intensive Business">
          Cash Intensive Business
        </MenuItem>
        <MenuItem value="Banking and Finance">Banking and Finance</MenuItem>
        <MenuItem value="Brokers">Brokers</MenuItem>
        <MenuItem value="Charities/Trust/Foundations">
          Charities/Trust/Foundations
        </MenuItem>
        <MenuItem value="Chemical Industries">Chemical Industries</MenuItem>
        <MenuItem value="Training">Training</MenuItem>
        <MenuItem value="Restaurant">Restaurant</MenuItem>
        <MenuItem value="Consultancy Services">Consultancy Services</MenuItem>
        <MenuItem value="Construction">Construction</MenuItem>
        <MenuItem value="Consumer Finance (credit card provider)">
          Consumer Finance (credit card provider)
        </MenuItem>
        <MenuItem value="Custom Clearance">Custom Clearance</MenuItem>
        <MenuItem value="Crude oil exportation">Crude oil exportation</MenuItem>
        <MenuItem value="Designer Goods (High Value Items)">
          Designer Goods (High Value Items)
        </MenuItem>
        <MenuItem value="Drilling & Field Development">
          Drilling & Field Development
        </MenuItem>
        <MenuItem value="E-commerce">E-commerce</MenuItem>
        <MenuItem value="Education">Education</MenuItem>
        <MenuItem value="Film & Entertainment">Film & Entertainment</MenuItem>
        <MenuItem value="Food & Beverages">Food & Beverages</MenuItem>
        <MenuItem value="Foreign Exchange">Foreign Exchange</MenuItem>
        <MenuItem value="Funds/Investment Business">
          Funds/Investment Business
        </MenuItem>
        <MenuItem value="Gambling (online or across any line)">
          Gambling (online or across any line)
        </MenuItem>
        <MenuItem value="Healthcare">Healthcare</MenuItem>
        <MenuItem value="Hospitality & Tourism">Hospitality & Tourism</MenuItem>
        <MenuItem value="ICT/BPO Sector">ICT/BPO Sector</MenuItem>
        <MenuItem value="Insurance">Insurance</MenuItem>
        <MenuItem value="Intellectual Property">Intellectual Property</MenuItem>
        <MenuItem value="Jewellery & Precious Metals">
          Jewellery & Precious Metals
        </MenuItem>
        <MenuItem value="Legal/Paralegal">Legal/Paralegal</MenuItem>
        <MenuItem value="Logistics (including Transportation & Warehousing)">
          Logistics (including Transportation & Warehousing)
        </MenuItem>
        <MenuItem value="Luxury Goods">Luxury Goods</MenuItem>
        <MenuItem value="Manufacturing/Textile Sector">
          Manufacturing/Textile Sector
        </MenuItem>
        <MenuItem value="Media">Media</MenuItem>
        <MenuItem value="Mining">Mining</MenuItem>
        <MenuItem value="Money Changers">Money Changers</MenuItem>
        <MenuItem value="Oil, Petroleum & mineral Resources">
          Oil, Petroleum & mineral Resources
        </MenuItem>
        <MenuItem value="Pharmaceutical -licensed product">
          Pharmaceutical -licensed product
        </MenuItem>
        <MenuItem value="Pharmaceutical -unlicensed product / alternative medicine">
          Pharmaceutical -unlicensed product / alternative medicine
        </MenuItem>
        <MenuItem value="Real Estate">Real Estate</MenuItem>
        <MenuItem value="Shipping">Shipping</MenuItem>
        <MenuItem value="Sports Activities">Sports Activities</MenuItem>
        <MenuItem value="Stock Market">Stock Market</MenuItem>
        <MenuItem value="Supply of Manpower">Supply of Manpower</MenuItem>
        <MenuItem value="Tobacco/related">Tobacco/related</MenuItem>
        <MenuItem value="Telecommunications">Telecommunications</MenuItem>
        <MenuItem value="Trade Finance">Trade Finance</MenuItem>
        <MenuItem value="Virtual Currencies">Virtual Currencies</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      {values.targetSectors === "Other" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Specify a target sector"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.otherTargetSectors}
          name="otherTargetSectors"
          error={!!touched.otherTargetSectors && !!errors.otherTargetSectors}
          helperText={touched.otherTargetSectors && errors.otherTargetSectors}
          sx={{ gridColumn: "span 1" }}
        />
      )}

      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Proposed targeted countries/geographical location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.targetedCountries}
        name="targetedCountries"
        error={!!touched.targetedCountries && !!errors.targetedCountries}
        helperText={touched.targetedCountries && errors.targetedCountries}
        sx={{ gridColumn: "span 1" }}
      />
      <Box
        variant="outlined"
        display="inline-flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 2",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "3px 3px",
          height: "auto",
          flex: "4",
        }}
      >
        <Typography variant="h5">
          Will the company acquire a special license/permit?
        </Typography>
        <TextField
          select
          value={values.specialLicense}
          onChange={handleChange}
          name="specialLicense"
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      {values.specialLicense === "yes" && (
        <>
          <Box
            variant="outlined"
            display="inline-flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: colors.primary[400],
              gridColumn: "span 1",
              margin: "1px 0px 1px",
              borderRadius: "4px",
              padding: "3px 3px",
              height: "auto",
              flex: "4",
            }}
          >
            <Typography variant="body1">
              - If yes, please state the type of special license/permits to be
              acquired by the company:
            </Typography>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Secretary"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.secretary}
            name="secretary"
            error={!!touched.secretary && !!errors.secretary}
            helperText={touched.secretary && errors.secretary}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Type of Product(s) / Service(s)"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.productService}
            name="productService"
            error={!!touched.productService && !!errors.productService}
            helperText={touched.productService && errors.productService}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Business Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.businessAddress}
            name="businessAddress"
            error={!!touched.businessAddress && !!errors.businessAddress}
            helperText={touched.businessAddress && errors.businessAddress}
            sx={{ gridColumn: "span 1" }}
          />
        </>
      )}
     
      <Box
        variant="outlined"
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          gridColumn: "span 4",
          margin: "1px 0px 1px",
          borderRadius: "4px",
          padding: "13px 5px",
        }}
      >
        <Typography variant="h6" fontWeight="500" fontStyle="italic">
          C. Shareholding
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Type of shares"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.sharesType}
        name="sharesType"
        error={!!touched.sharesType && !!errors.sharesType}
        helperText={touched.sharesType && errors.sharesType}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="No. of shares incorporation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.sharesNumber}
        name="sharesNumber"
        error={!!touched.sharesNumber && !!errors.sharesNumber}
        helperText={touched.sharesNumber && errors.sharesNumber}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Value of Stated Capital at incorporation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.statedCapital}
        name="statedCapital"
        error={!!touched.statedCapital && !!errors.statedCapital}
        helperText={touched.statedCapital && errors.statedCapital}
        sx={{ gridColumn: "span 1" }}
      />
    </React.Fragment>
  );
};

export default FormFields7;
