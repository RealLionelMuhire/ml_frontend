import React from "react";
import { TextField, Box, Typography, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const FormFields2 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  client,
  isNonMobile,
  setFieldValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleMultiSelectChange = (event) => {
    const value = event.target.value;
    setFieldValue(
      "SectorOfEntity",
      typeof value === "string" ? value.split(",") : value // Ensure array format
    );
  };

  const sectors = [
    "Accounting & Auditing",
    "Antique Dealers",
    "A­viation",
    "Automobiles",
    "Cash Intensive Business",
    "Banking and Finance",
    "Brokers",
    "Charities/Trust/Foundations",
    "Chemical Industries",
    "Training",
    "Restaurant",
    "Consultancy Services",
    "Construction",
    "Consumer Finance (credit card provider)",
    "Custom Clearance",
    "Crude oil exportation",
    "Designer Goods (High Value Items)",
    "Drilling & Field Development",
    "E-commerce",
    "Education",
    "Film & Entertainment",
    "Food & Beverages",
    "Foreign Exchange",
    "Funds/Investment Business",
    "Gambling (online or across any line)",
    "Healthcare",
    "Hospitality & Tourism",
    "ICT/BPO Sector",
    "Insurance",
    "Intellectual Property",
    "Jewellery & Precious Metals",
    "Legal/Paralegal",
    "Logistics (including Transportation & Warehousing)",
    "Luxury Goods",
    "Manufacturing/Textile Sector",
    "Media",
    "Mining",
    "Money Changers",
    "Oil, Petroleum & mineral Resources",
    "Pharmaceutical -licensed product",
    "Pharmaceutical -unlicensed product / alternative medicine",
    "Real Estate",
    "Shipping",
    "Sports Activities",
    "Stock Market",
    "Supply of Manpower",
    "Tobacco/related",
    "Telecommunications",
    "Trade Finance",
    "Virtual Currencies",
    "Other",
  ];

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
        label={`Name of Entity: ${client.NameOfEntity || ""}`}
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
        label={`Previous Name of Entity(If any): ${
          client.PrevNameOfEntity || ""
        }`}
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
        label={`Type of Entity: ${client.TypeOfEntity || ""}`}
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
        label={`Cathegory of Entity: ${client.CathegoryOfEntity || ""}`}
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
        <MenuItem value="corporation">Corporation</MenuItem>
        <MenuItem value="partnership">Partnership</MenuItem>
        <MenuItem value="limitedLiabilityCompany">Limited Liability Company (LLC)</MenuItem>
        <MenuItem value="soleProprietorship">Sole Proprietorship</MenuItem>
        <MenuItem value="cooperative">Cooperative(Co-op)</MenuItem>
        <MenuItem value="nonprofitOrganization">Nonprofit Organization</MenuItem>
        <MenuItem value="jointVenture">Joint Venture</MenuItem>
        <MenuItem value="franchise">Franchise</MenuItem>
        <MenuItem value="publicLimitedCompany">Public Limited Company (PLC)</MenuItem>
        <MenuItem value="privateLimitedCompany">Private Limited Company (Ltd)</MenuItem>
        <MenuItem value="branchOffice">Branch Office</MenuItem>
        <MenuItem value="merchantsCompany">Merchants Company</MenuItem>
        <MenuItem value="socialEnterprise">Social Enterprise</MenuItem>
      </TextField>
      {client.CathegoryOfEntity === "SPV" && (
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
      {(client.CathegoryOfEntity === "trust" ||
        client.CathegoryOfEntity === "holdings" ||
        client.CathegoryOfEntity === "foundation" ||
        client.CathegoryOfEntity === "corporation" ||
        client.CathegoryOfEntity === "partnership" ||
        client.CathegoryOfEntity === "limitedLiabilityCompany" ||
        client.CathegoryOfEntity === "soleProprietorship" ||
        client.CathegoryOfEntity === "cooperative" ||
        client.CathegoryOfEntity === "nonprofitOrganization" ||
        client.CathegoryOfEntity === "jointVenture" ||
        client.CathegoryOfEntity === "franchise" ||
        client.CathegoryOfEntity === "publicLimitedCompany" ||
        client.CathegoryOfEntity === "privateLimitedCompany" ||
        client.CathegoryOfEntity === "branchOffice" ||
        client.CathegoryOfEntity === "merchantsCompany" ||
        client.CathegoryOfEntity === "socialEnterprise" ||
        client.SPVType) && (
        <>
          <TextField
          fullWidth
          variant="filled"
          select
          label={`Sector of Entity: ${client.SectorOfEntity}`}
          onBlur={handleBlur}
          onChange={handleMultiSelectChange}
          value={values.SectorOfEntity || []}
          name="SectorOfEntity"
          SelectProps={{
            multiple: true,
            renderValue: (selected) => {
              if (!selected || selected.length === 0) return "Select Sectors";
              return selected.join(", ");
            },
          }}
          error={!!touched.SectorOfEntity && !!errors.SectorOfEntity}
          helperText={touched.SectorOfEntity && errors.SectorOfEntity}
          sx={{ gridColumn: "span 1" }}
        >
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              <Checkbox
                checked={values.SectorOfEntity?.includes(sector) || false}
              />
              <ListItemText primary={sector} />
            </MenuItem>
          ))}
        </TextField>
        </>
      )}
      {values.SectorOfEntity === "Other" && (
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label={`Other Sector of Entity: ${client.OtherSectorOfEntity}`}
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
        label={`Type of licence (if any): ${client.TypeOfLicense}`}
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
        label={`Tax Residency (ies): ${client.taxResidency}`}
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
        label={`Date of Incorporation/registration: ${client.incorporationDate}`}
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
        label={`Country of Iconporation: ${client.countryOfIncorporation}`}
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
        label={`Registered office address: ${client.registeredOfficeAddress}`}
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
        label={`Business activity: ${client.businessActivity}`}
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
        label={`Country of Operation: ${client.countryOfOperation}`}
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
