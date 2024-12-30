import React from "react";
import { Box, Typography } from "@mui/material";
import FinancialForecastTable2 from "./FinancialForecastTable";
import AccountAtivityTable from "./AccountActivityTable";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import DocumentUploadField from "../../utils/DocumentUploadField";

const FormFields12 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  isNonMobile,
  setFieldValue,
  client,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFinancialDataChange = (params) => {
    // console.log({ params });
    setFieldValue(
      "financialForecast",
      values.financialForecast.map((item) => {
        const currentIndex = Object.keys(params)[0];
        if (item.id === +currentIndex) {
          const key = Object.keys(params[currentIndex])[0];
          const value = Object.values(params[currentIndex])[0].value;
          item = { ...item, [key]: value };
          // console.log({ currentIndex, item });
        }
        return item;
      })
    );
  };

  const handleExpectedAccDataChange = (params) => {
    // console.log({ params });
    setFieldValue(
      "expectedAccountActivity",
      values.expectedAccountActivity.map((item) => {
        const currentIndex = Object.keys(params)[0];
        if (item.id === +currentIndex) {
          const key = Object.keys(params[currentIndex])[0];
          const value = Object.values(params[currentIndex])[0].value;
          item = { ...item, [key]: value };
          // console.log({ currentIndex, item });
        }
        return item;
      })
    );
  };

  React.useEffect(() => {
    // console.log({ values });
  }, [values]);

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
        <Typography variant="h5" fontWeight="700">
          FINANCIAL FORECAST
        </Typography>
      </Box>
      <FinancialForecastTable2
        financialData={values.financialForecast}
        clientFinancialData={client.financialForecast}
        handleFinancialDataChange={handleFinancialDataChange}
        setFieldValue={setFieldValue}
      />
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
        <Typography variant="h5" fontWeight="700">
          EXPECTED ACCOUNT ACTIVITY
        </Typography>
      </Box>
      <AccountAtivityTable
        accountActivityData={values.expectedAccountActivity}
        clientAccountActivityData={client.expectedAccountActivity}
        handleExpectedAccDataChange={handleExpectedAccDataChange}
        setFieldValue={setFieldValue}
      />
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
        <Typography
          variant="h5"
          fontWeight="500"
          fontStyle="italic"
          gutterBottom
        >
          Notes: For all the Shareholder/s, Director/s, Authorised Signatory/ies
          and other officer/s listed above, kindly submit the certified true
          copies of due diligence documents.
        </Typography>
      </Box>

      <DocumentUploadField
        label="Upload Other Necessary Documents(Compress Folder into a zip file)"
        name="other_necessary_documents_file"
        value={
          Array.isArray(values.other_necessary_documents_file)
            ? values.other_necessary_documents_file
            : []
        }
        error={errors.other_necessary_documents_file}
        touched={touched.other_necessary_documents_file}
        setFieldValue={setFieldValue}
        client={client}
        accept=".zip"
      />
    </React.Fragment>
  );
};

export default FormFields12;
