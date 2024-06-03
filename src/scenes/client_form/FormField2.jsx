import React from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields2 = ({
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
          Legal Person (Complete this section if the Shareholder is a legal
          entity)
        </Typography>
      </Box>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Name of Entity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.NameOfEntity}
        name="NameOfEntity"
        error={!!touched.NameOfEntity && !!errors.NameOfEntity}
        helperText={touched.NameOfEntity && errors.NameOfEntity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Any Name of Entity(If any)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.PrevNameOfEntity}
        name="PrevNameOfEntity"
        error={!!touched.PrevNameOfEntity && !!errors.PrevNameOfEntity}
        helperText={touched.PrevNameOfEntity && errors.PrevNameOfEntity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Type of Entity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.TypeOfEntity}
        name="TypeOfEntity"
        error={!!touched.TypeOfEntity && !!errors.TypeOfEntity}
        helperText={touched.TypeOfEntity && errors.TypeOfEntity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        select
        label="Cathegory of Entity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.CathegoryOfEntity}
        name="CathegoryOfEntity"
        error={!!touched.CathegoryOfEntity && !!errors.CathegoryOfEntity}
        helperText={touched.CathegoryOfEntity && errors.CathegoryOfEntity}
        sx={{ gridColumn: "span 1" }}
      >
        <MenuItem value="trust">Trust</MenuItem>
        <MenuItem value="holdings">Holdings</MenuItem>
        <MenuItem value="SPV">SPV</MenuItem>
        <MenuItem value="foundation">Foundation</MenuItem>
      </TextField>
      {values.CathegoryOfEntity === "SPV" && (
        <>
          <TextField
            fullWidth
            variant="filled"
            select
            label="SPV Type"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.SPVType}
            name="SPVType"
            error={!!touched.SPVType && !!errors.SPVType}
            helperText={touched.SPVType && errors.SPVType}
            sx={{ gridColumn: "span 1" }}
          >
            <MenuItem value="legalEntity">Legal Entity</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
          </TextField>
        </>
      )}
      {(values.CathegoryOfEntity === "trust" ||
        values.CathegoryOfEntity === "holdings" ||
        values.CathegoryOfEntity === "foundation" ||
        values.SPVType) && (
        <>
          <TextField
            fullWidth
            variant="filled"
            select
            label="Sector of Entity"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.SectorOfEntity}
            name="SectorOfEntity"
            error={!!touched.SectorOfEntity && !!errors.SectorOfEntity}
            helperText={touched.SectorOfEntity && errors.SectorOfEntity}
            sx={{ gridColumn: "span 1" }}
          >
            <MenuItem value="Accounting & Auditing">
              Accounting & Auditing
            </MenuItem>
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
            <MenuItem value="Consultancy Services">
              Consultancy Services
            </MenuItem>
            <MenuItem value="Construction">Construction</MenuItem>
            <MenuItem value="Consumer Finance (credit card provider)">
              Consumer Finance (credit card provider)
            </MenuItem>
            <MenuItem value="Custom Clearance">Custom Clearance</MenuItem>
            <MenuItem value="Crude oil exportation">
              Crude oil exportation
            </MenuItem>
            <MenuItem value="Designer Goods (High Value Items)">
              Designer Goods (High Value Items)
            </MenuItem>
            <MenuItem value="Drilling & Field Development">
              Drilling & Field Development
            </MenuItem>
            <MenuItem value="E-commerce">E-commerce</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Film & Entertainment">
              Film & Entertainment
            </MenuItem>
            <MenuItem value="Food & Beverages">Food & Beverages</MenuItem>
            <MenuItem value="Foreign Exchange">Foreign Exchange</MenuItem>
            <MenuItem value="Funds/Investment Business">
              Funds/Investment Business
            </MenuItem>
            <MenuItem value="Gambling (online or across any line)">
              Gambling (online or across any line)
            </MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Hospitality & Tourism">
              Hospitality & Tourism
            </MenuItem>
            <MenuItem value="ICT/BPO Sector">ICT/BPO Sector</MenuItem>
            <MenuItem value="Insurance">Insurance</MenuItem>
            <MenuItem value="Intellectual Property">
              Intellectual Property
            </MenuItem>
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
            <MenuItem value="Other">Other</MenuItem>{" "}
          </TextField>
        </>
      )}
      {values.SectorOfEntity === "Other" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Specify the Entity Sector"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.OtherSectorOfEntity}
          name="OtherSectorOfEntity"
          error={!!touched.OtherSectorOfEntity && !!errors.OtherSectorOfEntity}
          helperText={touched.OtherSectorOfEntity && errors.OtherSectorOfEntity}
          sx={{ gridColumn: "span 1" }}
        />
      )}
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Type of licence (if any)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.TypeOfLicense}
        name="TypeOfLicense"
        error={!!touched.TypeOfLicense && !!errors.TypeOfLicense}
        helperText={touched.TypeOfLicense && errors.TypeOfLicense}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Tax Residency (ies)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.taxResidency}
        name="taxResidency"
        error={!!touched.taxResidency && !!errors.taxResidency}
        helperText={touched.taxResidency && errors.taxResidency}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="date"
        label="Date of Incorporation/registration"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.incorporationDate}
        name="incorporationDate"
        error={!!touched.incorporationDate && !!errors.incorporationDate}
        helperText={touched.incorporationDate && errors.incorporationDate}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Country of Iconporation"
        onBlur={handleBlur}
        onChange={handleChange}
        name="countryOfIncorporation"
        error={
          !!touched.countryOfIncorporation && !!errors.countryOfIncorporation
        }
        helperText={
          touched.countryOfIncorporation && errors.countryOfIncorporation
        }
        sx={{ gridColumn: "span 1" }}
      >
        <CountryDropdown
          value={values.countryOfIncorporation}
          onChange={(val) =>
            handleChange({
              target: { name: "countryOfIncorporation", value: val },
            })
          }
          classes="form-control"
        />
      </TextField>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Registered office address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.registeredOfficeAddress}
        name="registeredOfficeAddress"
        error={
          !!touched.registeredOfficeAddress && !!errors.registeredOfficeAddress
        }
        helperText={
          touched.registeredOfficeAddress && errors.registeredOfficeAddress
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Business activity"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.businessActivity}
        name="businessActivity"
        error={!!touched.businessActivity && !!errors.businessActivity}
        helperText={touched.businessActivity && errors.businessActivity}
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Country of operation"
        onBlur={handleBlur}
        onChange={handleChange}
        name="countryOfOperation"
        error={!!touched.countryOfOperation && !!errors.countryOfOperation}
        helperText={touched.countryOfOperation && errors.countryOfOperation}
        sx={{ gridColumn: "span 1" }}
      >
        <CountryDropdown
          value={values.countryOfOperation}
          onChange={(val) =>
            handleChange({
              target: { name: "countryOfIncorporation", value: val },
            })
          }
          classes="form-control"
        />
      </TextField>
    </React.Fragment>
  );
};

export default FormFields2;
