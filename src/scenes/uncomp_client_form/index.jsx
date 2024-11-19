import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, CircularProgress, Dialog, DialogContent, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  useCreateClientMutation,
  useUpdateUncompletedClientMutation,
  useGetUncompleteClientByIdQuery,
} from "../../state/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormFields1 from "./FormField1";
import FormFields2 from "./FormField2";
import FormFields3 from "./FormField3";
import FormFields4 from "./FormField4";
import FormFields5 from "./FormField5";
import FormFields6 from "./FormField6";
import FormFields7 from "./FormField7";
import FormFields8 from "./FormField8";
import FormFields9 from "./FormField9";
import FormFields10 from "./FormField10";
import FormFields11 from "./FormField11";
import FormFields12 from "./FormField12";
import FeedbackDialog from"../global/FeedbackDialog"
import ErrorBox from "./ErrorBox";
import SuccessBox from "./SuccessBox";

const IncompleteClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createClient, { isError, data }] = useCreateClientMutation();

  const [isLoadingSaveLater, setIsLoadingSaveLater] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);


  const location = useLocation();
  const selectedClientIds = useMemo(
    () => location.state?.selectedClientIds || [],
    [location.state?.selectedClientIds]
  );

  

  const [updateUncompleteData] = useUpdateUncompletedClientMutation();

  const [step, setStep] = useState(1);

  const {
    data: clientData,
    isLoading,
    refetch,
  } = useGetUncompleteClientByIdQuery(selectedClientIds);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress size={60} color="inherit" />
      </div>
    );
  }

  const client = clientData ? clientData[0] : {};
  // console.log("client:", client);

  const mergeForecastData = (valuesData, clientData) => {
    if (!valuesData || !clientData) return valuesData || clientData;
  
    return valuesData.map((row, index) => {
      const clientRow = clientData[index] || {};
      return {
        ...row,
        year1: row.year1 || clientRow.year1,
        year2: row.year2 || clientRow.year2,
        year3: row.year3 || clientRow.year3,
      };
    });
  };
  
  const handleFormSubmit = async (values) => {
    // Merge values with client data for final submission
    const finalValues = { ...values };
  
    if (values.financialForecast && client.financialForecast) {
      finalValues.financialForecast = mergeForecastData(values.financialForecast, client.financialForecast);
    }
    if (values.expectedAccountActivity && client.expectedAccountActivity) {
      finalValues.expectedAccountActivity = mergeForecastData(values.expectedAccountActivity, client.expectedAccountActivity);
    }
    Object.keys(values).forEach((key) => {
      if (!values[key] && client[key]) {
        finalValues[key] = client[key];
      }
    });
  
    try {
      setIsLoadingSubmit(true);
      setDialogLoading(true);
      setDialogOpen(true);
      setDialogMessage("Submitting form...");
      setDialogSuccess(false);
  
      // Create formData from finalValues
      const formData = new FormData();
      Object.entries(finalValues).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === "financialForecast" || key === "expectedAccountActivity") {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === 'object' && value.file_name && value.file_content) {
            const byteArray = Uint8Array.from(atob(value.file_content), (c) => c.charCodeAt(0));
            const file = new File([byteArray], value.file_name, { type: "application/pdf" });
            formData.append(key, file);
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
      });
  
      const response = await createClient(formData);
  
      if (response.error) {
        const errorMessage = response.error.data?.detail || response.error?.data?.message || "An error occurred";
        setDialogMessage(errorMessage);
        setDialogSuccess(false);
        toast.error(errorMessage);
      } else if (response.data) {
        const successMessage = response.data.message;
        setDialogMessage(successMessage);
        setDialogSuccess(true);
        toast.success(successMessage);
      }

      navigate("/clients");
    } catch (error) {
      const errorMessage = `Error creating user: ${error.message || error}`;
      setDialogMessage(errorMessage);
      setDialogSuccess(false);
      toast.error(errorMessage);
    } finally {
      setIsLoadingSubmit(false);
      setDialogLoading(false);
    }
  };
  
  

  const handleSaveAndContinueLater = async (values) => {
    try {
      setIsLoadingSaveLater(true);
      setDialogLoading(true);
      setDialogOpen(true);
      setDialogMessage("Saving data for later...");
      setDialogSuccess(false);
  
      // Prepare incomplete formData
      const incompleteFormData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === "financialForecast" || key === "expectedAccountActivity") {
            incompleteFormData.append(key, JSON.stringify(value));
          } else {
            incompleteFormData.append(key, value);
          }
        }
      });
  
      for (const clientId of selectedClientIds) {
        const response = await updateUncompleteData({ clientId, updatedClient: incompleteFormData }).unwrap();
  
        if (response.error) {
          const errorMessage = `Error updating client ${clientId}: ${response.error.message}`;
          setDialogMessage(errorMessage);
          setDialogSuccess(false);
          toast.error(errorMessage);
          break;
        } else if (response.data) {
          const successMessage = `Client ${clientId} updated successfully: ${response.data.message}`;
          setDialogMessage(successMessage);
          setDialogSuccess(true);
          toast.success(successMessage);
        }
      }
      navigate("/incomplete-clients");
    } catch (error) {
      const errorMessage = "An error occurred while saving the form.";
      setDialogMessage(errorMessage);
      setDialogSuccess(false);
      toast.error(errorMessage);
    } finally {
      setIsLoadingSaveLater(false);
      setDialogLoading(false);
    }
  };
  

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    // Ultimate Beneficiary Owner / Shareholder (Client)
    firstName: yup.string(),
    lastName: yup.string(),
    clientEmail: yup.string().email("Invalid email"),
    clientContact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid"),
    passportIdNumber: yup.string(),
    birthDate: yup.date(),
    citizenship: yup.string(),
    countryOfResidence: yup.string(),
    passportExpiryDate: yup.date(),
    countryOfIssue: yup.string(),
    preferredLanguage: yup.string(),
    NameOfEntity: yup.string(),
    PrevNameOfEntity: yup.string(),
    TypeOfEntity: yup.string(),
    TypeOfLicense: yup.string(),
    sharePercent: yup.string(),
    currentAddress: yup.string(),
    taxResidency: yup.string(),
    tinNumber: yup.string(),
    designation: yup.string(),
    introducerName: yup.string(),
    introducerEmail: yup.string().email("Invalid email"),
    contactPersonName: yup.string(),
    contactPersonEmail: yup.string().email("Invalid email"),
    contactPersonPhone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid"),

    // Legal Person (Complete this section if the Shareholder is a legal entity)
    authorisedName: yup.string(),
    authorisedEmail: yup.string().email("Invalid email"),
    authorisedPersonContact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid"),
    authorisedCurrentAddress: yup.string(),
    authorisedRelationship: yup.string(),
    signature_file: createFileSchema(),

    isPep: yup.string(),
    bankStatement_file: createFileSchema(),
    professionalReference_file: createFileSchema(),

    countryOfIncorporation: yup.string(),
    incorporationDate: yup.date(),
    registeredOfficeAddress: yup.string(),
    businessActivity: yup.string(),
    countryOfOperation: yup.string(),

    CathegoryOfEntity: yup.string(),
    SPVType: yup.string(),
    SectorOfEntity: yup.array()
    .of(yup.string())
    .optional(),
    OtherSectorOfEntity: yup.string(),

    // Similar Application
    changedName: yup.string(),
    similarApplicationDetailsName: yup.string(),
    financialServicesBusiness: yup.string(),
    jurisdictionName: yup.string(),
    jurisdictionAddress: yup.string(),
    similarApplication: yup.string(),
    similarApplicationDetailsPartner: yup.string(),
    criticised: yup.string(),
    similarApplicationDetailsJurisdictions: yup.string(),

    // Bankruptcy
    bankruptcyApplication: yup.string(),
    similarApplicationDetailsForfeit: yup.string(),
    receiverAppointed: yup.string(),
    similarApplicationDetailsReceiver: yup.string(),
    civilProceedings: yup.string(),
    similarApplicationDetailsFinancial: yup.string(),
    convicted: yup.string(),
    imilarApplicationDetailsOffence: yup.string(),
    directorConvicted: yup.string(),
    similarApplicationDetailsDirector: yup.string(),

    // Remitting Party
    RemittingParty: yup.string(),
    ModeOfPayment: yup.string(),
    RelationshipWithApplicant: yup.string(),
    ProposedNameOption1: yup.string(),
    ProposedNameOption2: yup.string(),
    ProposedNameOption3: yup.string(),

    // Company Details
    proposedActivity: yup.string(),
    targetSectors: yup.string(),
    otherTargetSectors: yup.string(),
    targetedCountries: yup.string(),
    specialLicense: yup.string(),
    secretary: yup.string(),
    productService: yup.string(),
    businessAddress: yup.string(),
    sharesType: yup.string(),
    sharesNumber: yup.string(),
    statedCapital: yup.string(),

    // Source of Funds
    sourceOfFunds: yup.string(),
    otherSourceOfFunds: yup.string(),
    countrySourceFunds: yup.string(),
    netAnnualIncome: yup.string(),
    estimatedNetWorth: yup.string(),
    sourceOfWealth: yup.string(),
    otherSourceOfWealth: yup.string(),
    countrySourceWealth: yup.string(),
    bankInvolvedWealth: yup.string(),

    isMlDirectors: yup.string(),
    Director1FirstName: yup.string(),
    Director1LastName: yup.string(),
    Director1email: yup.string().email("Invalid email"),
    Director1contact: yup.string(),
    Director1BirthDate: yup.date(),
    Director1NationalID: yup.string(),
    Director1passportIdNumber: yup.string(),
    Director1countryOfIssue: yup.string(),
    Director1passportExpiryDate: yup.date(),
    Director1citizenship: yup.string(),
    Director1specifiedCitizenship: yup.string(),
    Director1countryOfResidence: yup.string(),
    Director1preferredLanguage: yup.string(),
    Director1NameOfEntity: yup.string(),
    Director1tinNumber: yup.string(),
    Director1taxResidency: yup.string(),
    Director2FirstName: yup.string(),
    Director2LastName: yup.string(),
    Director2email: yup.string().email("Invalid email"),
    Director2contact: yup.string(),
    Director2BirthDate: yup.date(),
    Director2NationalID: yup.string(),
    Director2passportIdNumber: yup.string(),
    Director2countryOfIssue: yup.string(),
    Director2passportExpiryDate: yup.date(),
    Director2citizenship: yup.string(),
    Director2specifiedCitizenship: yup.string(),
    Director2countryOfResidence: yup.string(),
    Director2preferredLanguage: yup.string(),
    Director2NameOfEntity: yup.string(),
    Director2tinNumber: yup.string(),
    Director2taxResidency: yup.string(),
    Director3FirstName: yup.string(),
    Director3LastName: yup.string(),
    Director3email: yup.string().email("Invalid email"),
    Director3contact: yup.string(),
    Director3BirthDate: yup.date(),
    Director3NationalID: yup.string(),
    Director3passportIdNumber: yup.string(),
    Director3countryOfIssue: yup.string(),
    Director3passportExpiryDate: yup.date(),
    Director3citizenship: yup.string(),
    Director3specifiedCitizenship: yup.string(),
    Director3countryOfResidence: yup.string(),
    Director3preferredLanguage: yup.string(),
    Director3NameOfEntity: yup.string(),
    Director3tinNumber: yup.string(),
    Director3taxResidency: yup.string(),
    Director1isPep: yup.string(),
    Director2isPep: yup.string(),
    Director3isPep: yup.string(),

    bankName: yup.string(),
    Currency: yup.string(),
    groupASignatory1: yup.string(),
    groupASignatory2: yup.string(),
    groupASignatory3: yup.string(),
    groupASignatory4: yup.string(),
    groupBSignatory1: yup.string(),
    groupBSignatory2: yup.string(),
    groupBSignatory3: yup.string(),
    groupBSignatory4: yup.string(),
    authorizedUser1: yup.string(),
    authorizedUser1AccessRights: yup.string(),
    authorizedUser2: yup.string(),
    authorizedUser2AccessRights: yup.string(),
    authorizedUser3: yup.string(),
    authorizedUser3AccessRights: yup.string(),
    authorizedUser4: yup.string(),
    authorizedUser4AccessRights: yup.string(),
    modeOfOperation: yup.string(),
    callBackProcessContact: yup.string(),
    nameOfProposedOfficer: yup.string(),

    confirmationLetter_file: createFileSchema(),
    custody_accounts_file: createFileSchema(),
    source_of_funds_file: createFileSchema(),
    payslips_file: createFileSchema(),
    due_diligence_file: createFileSchema(),
    financial_statements_file: createFileSchema(),
    proof_of_ownership_file: createFileSchema(),
    lease_agreement_file: createFileSchema(),
    documentary_evidence_file: createFileSchema(),
    bank_statement_proceeds_file: createFileSchema(),
    bank_statement_file: createFileSchema(),
    cdd_documents_file: createFileSchema(),
    bank_statements_file: createFileSchema(),
    bank_statements_proceeds_file: createFileSchema(),

    notarised_documents_file: createFileSchema(),
    letter_from_donor_file: createFileSchema(),
    donor_source_of_wealth_file: createFileSchema(),
    donor_bank_statement_file: createFileSchema(),
    letter_from_relevant_org_file: createFileSchema(),
    lottery_bank_statement_file: createFileSchema(),
    creditor_agreement_file: createFileSchema(),
    creditor_cdd_file: createFileSchema(),
    creditor_bank_statement_file: createFileSchema(),
    legal_document_file: createFileSchema(),
    notary_letter_file: createFileSchema(),
    executor_letter_file: createFileSchema(),
    loan_agreement_file: createFileSchema(),
    loan_bank_statement_file: createFileSchema(),
    related_third_party_loan_agreement_file: createFileSchema(),
    related_third_party_cdd_file: createFileSchema(),
    related_third_party_bank_statement_file: createFileSchema(),
    unrelated_third_party_loan_agreement_file: createFileSchema(),
    unrelated_third_party_cdd_file: createFileSchema(),
    unrelated_third_party_bank_statement_file: createFileSchema(),
    signed_letter_from_notary_file: createFileSchema(),
    property_contract_file: createFileSchema(),
    insurance_pay_out_file: createFileSchema(),
    retirement_annuity_fund_statement_file: createFileSchema(),

    passport_file: createFileSchema(),
    utility_file: createFileSchema(),
    wealth_file: createFileSchema(),
    cv_file: createFileSchema(),
    funds_file: createFileSchema(),
    source_of_wealth_file: createFileSchema(),
    financialStatements_file: createFileSchema(),
    principals_identification_file: createFileSchema(),
    shareholders_file: createFileSchema(),
    declaration_of_trust_file: createFileSchema(),
    certificate_of_registration_file: createFileSchema(),
    deed_of_retirement_file: createFileSchema(),
    business_plan_file: createFileSchema(),
    registered_office_file: createFileSchema(),
    register_of_trustee_file: createFileSchema(),
    proof_of_source_of_funds_file: createFileSchema(),
    proof_of_source_of_wealth_file: createFileSchema(),
    latest_accounts_or_bank_statements_file: createFileSchema(),
    licence_file: createFileSchema(),
    certificate_of_incumbency_file: createFileSchema(),
    charter_file: createFileSchema(),
    latest_accounts_file: createFileSchema(),
    identification_documents_of_the_principals_of_the_foundation_file:
      createFileSchema(),
  });

  function createFileSchema() {
    return yup
      .mixed()
      .test(
        "fileType",
        "Invalid file format. Please upload a PDF file.",
        (value) => {
          if (!value || value.length === 0 || !value[0]) {
            return true; // No file provided or empty array, validation passes
          }
          if (value[0].type !== "application/pdf") {
            return false; // File type is not PDF, validation fails
          }
          return true; // Validation passes
        }
      );
  }

  const initialValues = {
    firstName: "",
    lastName: "",
    clientEmail: "",
    clientContact: "",
    passportIdNumber: "",
    birthDate: "",
    citizenship: "",
    countryOfResidence: "",
    passportExpiryDate: "",
    countryOfIssue: "",
    preferredLanguage: "",
    NameOfEntity: "",
    PrevNameOfEntity: "",
    TypeOfEntity: "",
    TypeOfLicense: "",
    sharePercent: "",
    currentAddress: "",
    taxResidency: "",
    tinNumber: "",
    designation: "",
    introducerName: "",
    introducerEmail: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "",

    authorisedName: "",
    authorisedEmail: "",
    authorisedPersonContact: "",
    authorisedCurrentAddress: "",
    authorisedRelationship: "",
    signature_file: null,
    isPep: "",
    bankStatement_file: null,
    professionalReference_file: null,
    countryOfIncorporation: "",
    incorporationDate: "",
    registeredOfficeAddress: "",
    businessActivity: "",
    countryOfOperation: "",

    CathegoryOfEntity: "",
    SPVType: "",
    SectorOfEntity: "",
    OtherSectorOfEntity: "",

    changedName: "",
    similarApplicationDetailsName: "",
    financialServicesBusiness: "",
    jurisdictionName: "",
    jurisdictionAddress: "",
    similarApplication: "",
    similarApplicationDetailsPartner: "",
    criticised: "",
    similarApplicationDetailsJurisdictions: "",

    bankruptcyApplication: "",
    similarApplicationDetailsForfeit: "",
    receiverAppointed: "",
    similarApplicationDetailsReceiver: "",
    civilProceedings: "",
    similarApplicationDetailsFinancial: "",
    convicted: "",
    imilarApplicationDetailsOffence: "",
    directorConvicted: "",
    similarApplicationDetailsDirector: "",

    RemittingParty: "",
    ModeOfPayment: "",
    RelationshipWithApplicant: "",
    ProposedNameOption1: "",
    ProposedNameOption2: "",
    ProposedNameOption3: "",

    proposedActivity: "",
    targetSectors: "",
    otherTargetSectors: "",
    targetedCountries: "",
    specialLicense: "",
    secretary: "",
    productService: "",
    businessAddress: "",
    sharesType: "",
    sharesNumber: "",
    statedCapital: "",

    sourceOfFunds: "",
    otherSourceOfFunds: "",
    countrySourceFunds: "",
    netAnnualIncome: "",
    estimatedNetWorth: "",
    sourceOfWealth: "",
    otherSourceOfWealth: "",
    countrySourceWealth: "",
    bankInvolvedWealth: "",

    financialForecast: [
      {
        id: 0,
        description: "Currency",
        year1: "",
        year2: "",
        year3: "",
      },
      {
        id: 1,
        description: "Initial Investment",
        year1: "",
        year2: "",
        year3: "",
      },
      {
        id: 2,
        description: "Income from Business Activities",
        year1: "",
        year2: "",
        year3: "",
      },
      { id: 3, description: "Expenses", year1: "", year2: "", year3: "" },
      { id: 4, description: "Net Profit", year1: "", year2: "", year3: "" },
    ],

    // Estimated Deposit Yearly (Currency)
    // Estimated Number of Transactions (monthly or yearly)
    //   Estimated Value of Transactions (monthly or yearly)

    expectedAccountActivity: [
      {
        id: 0,
        description: "Estimated Deposit Yearly (Currency)",
        year1: "",
        year2: "",
        year3: "",
      },
      {
        id: 1,
        description: "Estimated Number of Transactions (monthly or yearly)",
        year1: "",
        year2: "",
        year3: "",
      },
      {
        id: 2,
        description: "Estimated Value of Transactions (monthly or yearly)",
        year1: "",
        year2: "",
        year3: "",
      },
    ],

    bankName: "",
    Currency: "",
    groupASignatory1: "",
    groupASignatory2: "",
    groupASignatory3: "",
    groupASignatory4: "",
    groupBSignatory1: "",
    groupBSignatory2: "",
    groupBSignatory3: "",
    groupBSignatory4: "",
    authorizedUser1: "",
    authorizedUser1AccessRights: "",
    authorizedUser2: "",
    authorizedUser2AccessRights: "",
    authorizedUser3: "",
    authorizedUser3AccessRights: "",
    authorizedUser4: "",
    authorizedUser4AccessRights: "",
    modeOfOperation: "",
    callBackProcessContact: "",
    nameOfProposedOfficer: "",

    confirmationLetter_file: null,
    bank_statement_file: null,
    custody_accounts_file: null,
    source_of_funds_file: null,
    payslips_file: null,
    due_diligence_file: null,
    financial_statements_file: null,
    proof_of_ownership_file: null,
    lease_agreement_file: null,
    bank_statements_file: null,
    cdd_documents_file: null,
    documentary_evidence_file: null,
    bank_statement_proceeds_file: null,
    notarised_documents_file: null,
    letter_from_donor_file: null,
    donor_source_of_wealth_file: null,
    donor_bank_statement_file: null,
    letter_from_relevant_org_file: null,
    lottery_bank_statement_file: null,
    creditor_agreement_file: null,
    creditor_cdd_file: null,
    creditor_bank_statement_file: null,
    legal_document_file: null,
    notary_letter_file: null,
    executor_letter_file: null,
    loan_agreement_file: null,
    loan_bank_statement_file: null,
    related_third_party_loan_agreement_file: null,
    related_third_party_cdd_file: null,
    related_third_party_bank_statement_file: null,
    unrelated_third_party_loan_agreement_file: null,
    unrelated_third_party_cdd_file: null,
    unrelated_third_party_bank_statement_file: null,
    signed_letter_from_notary_file: null,
    property_contract_file: null,
    insurance_pay_out_file: null,
    retirement_annuity_fund_statement_file: null,
    isMlDirectors: "",
    Director1FirstName: "",
    Director1LastName: "",
    Director1email: "",
    Director1contact: "",
    Director1password: "",
    Director1confirmPassword: "",
    Director1BirthDate: "",
    Director1NationalID: "",
    Director1passportIdNumber: "",
    Director1countryOfIssue: "",
    Director1passportExpiryDate: "",
    Director1citizenship: "",
    Director1specifiedCitizenship: "",
    Director1countryOfResidence: "",
    Director1preferredLanguage: "",
    Director1NameOfEntity: "",
    Director1tinNumber: "",
    Director1taxResidency: "",
    Director2FirstName: "",
    Director2LastName: "",
    Director2email: "",
    Director2contact: "",
    Director2BirthDate: "",
    Director2NationalID: "",
    Director2passportIdNumber: "",
    Director2countryOfIssue: "",
    Director2passportExpiryDate: "",
    Director2citizenship: "",
    Director2specifiedCitizenship: "",
    Director2countryOfResidence: "",
    Director2preferredLanguage: "",
    Director2NameOfEntity: "",
    Director2tinNumber: "",
    Director2taxResidency: "",
    Director3FirstName: "",
    Director3LastName: "",
    Director3email: "",
    Director3contact: "",
    Director3BirthDate: "",
    Director3NationalID: "",
    Director3passportIdNumber: "",
    Director3countryOfIssue: "",
    Director3passportExpiryDate: "",
    Director3citizenship: "",
    Director3specifiedCitizenship: "",
    Director3countryOfResidence: "",
    Director3preferredLanguage: "",
    Director3NameOfEntity: "",
    Director3tinNumber: "",
    Director3taxResidency: "",
    Director1isPep: "",
    Director2isPep: "",
    Director3isPep: "",
    Director1_national_id_file: null,
    Director1_passport_file: null,
    Director2_national_id_file: null,
    Director2_passport_file: null,
    Director3_national_id_file: null,
    Director3_passport_file: null,
    passport_file: null,
    utility_file: null,
    wealth_file: null,
    cv_file: null,
    funds_file: null,
    source_of_wealth_file: null,
    financialStatements_file: null,
    principals_identification_file: null,
    shareholders_file: null,
    declaration_of_trust_file: null,
    certificate_of_registration_file: null,
    deed_of_retirement_file: null,
    business_plan_file: null,
    registered_office_file: null,
    register_of_trustee_file: null,
    proof_of_source_of_funds_file: null,
    proof_of_source_of_wealth_file: null,
    latest_accounts_or_bank_statements_file: null,
    licence_file: null,
    certificate_of_incumbency_file: null,
    charter_file: null,
    latest_accounts_file: null,
    identification_documents_of_the_principals_of_the_foundation_file: null,
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="COMPLETE A CLIENT REGISTRATION"
          subtitle="Please resume the registration process by completing the blank fields in the form below. This information will help us to serve Client better."
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/incomplete-clients">Back to Incomplete Client List</Link>
          </Button>
        </Box>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {step === 1 && (
                <FormFields1
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 2 && (
                <FormFields2
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 3 && (
                <FormFields3
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 4 && (
                <FormFields4
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 5 && (
                <FormFields5
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 6 && (
                <FormFields6
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 7 && (
                <FormFields7
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 8 && (
                <FormFields8
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 9 && (
                <FormFields9
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 10 && (
                <FormFields10
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 11 && (
                <FormFields11
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
              {step === 12 && (
                <FormFields12
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isNonMobile={isNonMobile}
                  setFieldValue={setFieldValue}
                  client={client}
                />
              )}
            </Box>

            {/* Previous and Next Buttons */}
            <Box display="flex" justifyContent="space-between">
              {step !== 13 && (
                <Box display="flex" mt={"20px"}>
                  <Button
                    variant="contained"
                    onClick={() => handleSaveAndContinueLater(values)}
                    color="secondary"
                    disabled={isLoadingSaveLater}
                    style={{ marginRight: "10px" }}
                  >
                    {isLoadingSaveLater ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Save & Continue Later"
                    )}
                  </Button>
                </Box>
              )}
              {step !== 1 && (
                <Box display="flex" mt="20px">
                  <Button
                    variant="contained"
                    onClick={prevStep}
                    color="secondary"
                  >
                    Previous
                  </Button>
                </Box>
              )}
              {step === 1 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 2 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 3 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 4 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 5 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 6 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 7 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 8 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 9 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 10 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 11 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={nextStep}
                    color="secondary"
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 12 && (
                <Box display="flex" mt="20px" justifyContent="end">
                  <Button
                    variant="contained"
                    onClick={() => handleFormSubmit(values)}
                    type="submit"
                    color="secondary"
                    disabled={isLoadingSubmit}
                  >
                    {isLoadingSubmit ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Box>
              )}
            </Box>
            <ErrorBox isError={isError} />
            <SuccessBox data={data} />
          </form>
        )}
      </Formik>

      <FeedbackDialog
        open={isDialogOpen}
        message={dialogMessage}
        isSuccess={dialogSuccess}
        onClose={() => setDialogOpen(false)}
        isLoading={dialogLoading}
      />
    </Box>
  );
};

export default IncompleteClientForm;
