import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  useCreateClientMutation,
  useCreateUncompleteClientMutation,
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
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import LocalStorageUtils from "../../utils/localStorageUtils";
import { use } from "react";
// import ErrorBox from "./ErrorBox";
// import SuccessBox from "./SuccessBox";

const ClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [createClient] = useCreateClientMutation();
  const [saveUncompleteData] = useCreateUncompleteClientMutation();
  const [isLoadingSaveLater, setIsLoadingSaveLater] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    try {
      // Set loading state for dialog
      setDialogLoading(true);
      setDialogOpen(true); // Open the dialog
      setDialogMessage("Submitting form..."); // Set dialog message as submitting
      setDialogSuccess(false); // Set dialog to show a loading state, not success
  
      // Prepare form data
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          // Check if the value is a file or an array of files
          if (Array.isArray(value)) {
            value.forEach((fileData) => {
              if (fileData.file_object instanceof File) {
                formData.append(key, fileData.file_object);
              }
            });
          } else if (key === "financialForecast" || key === "expectedAccountActivity") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });
      console.log("client form data:", formData)
      const response = await createClient(formData); // API call
  
      if (response.error) {
        const errorMessage =
          response.error.data?.detail || response.error?.data?.message || "An error occurred";
        const errors = response.error.data?.errors;
  
        if (errors) {
          Object.entries(errors).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(`${field}: ${msg}`));
          });
        } else {
          toast.error(errorMessage);
        }
  
        setDialogMessage(errorMessage);
        setDialogSuccess(false); // Set to false for error
      } else if (response.data) {
        const successMessage = response.data.message;
        toast.success(successMessage);
        LocalStorageUtils.clear(LOCAL_STORAGE_KEY);
        LocalStorageUtils.clear(LOCAL_STORAGE_STEP_KEY);
        setDialogMessage(successMessage);
        setDialogSuccess(true); // Set to true for success
      }
    } catch (error) {
      const errorMessage = `Error creating user: ${error}`;
      toast.error(errorMessage); // Toast for general error
  
      setDialogMessage(errorMessage);
      setDialogSuccess(false); // Set to false for error
    } finally {
      setDialogLoading(false); // Hide loading spinner after submission
    }
  };

  const handleSaveAndContinueLater = async (values) => {
    try {
      setDialogLoading(true);
      setDialogOpen(true); // Open the dialog
      setDialogMessage("Saving data for later..."); // Show saving message
      setDialogSuccess(false); // Set to false (loading state)
  
      const incompleteFormData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          // Check if the value is a file or an array of files
          if (value instanceof File || (Array.isArray(value) && value[0] instanceof File)) {
            if (Array.isArray(value)) {
              value.forEach((file) => incompleteFormData.append(key, file));
            } else {
              incompleteFormData.append(key, value);
            }
          } else if (key === "financialForecast" || key === "expectedAccountActivity") {
            incompleteFormData.append(key, JSON.stringify(value));
          } else {
            incompleteFormData.append(key, value);
          }
        }
      });
  
      const response = await saveUncompleteData(incompleteFormData);
      console.log("Response received:", response);
  
      if (response.error) {
        const errorMessage = response.error.message || "An error occurred";
        setDialogMessage(errorMessage);
        setDialogSuccess(false); // Set dialog state to error
        toast.error(errorMessage); // Show toast for error
      } else if (response.data) {
        const successMessage = response.data?.message || "Form saved successfully";
        setDialogMessage(successMessage);
        setDialogSuccess(true); // Set dialog state to success
        toast.success(successMessage); // Show toast for success
        LocalStorageUtils.clear(LOCAL_STORAGE_KEY);
        LocalStorageUtils.clear(LOCAL_STORAGE_STEP_KEY);
        navigate("/incomplete-clients"); // Navigate after successful save
      }
    } catch (error) {
      const errorMessage = `Error saving form: ${error.message || error}`;
      setDialogMessage(errorMessage); // Set dialog to show error message
      setDialogSuccess(false); // Set dialog state to error
      toast.error(errorMessage); // Show toast for error
    } finally {
      setDialogLoading(false); // Hide the loading spinner
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
    other_necessary_documents_file: createFileSchema(),
  });

  function createFileSchema(maxSizeMB = 10) {
    return yup.mixed().test(
      "fileSize",
      `Each file must be smaller than ${maxSizeMB} MB.`,
      (value) => {
  
        if (!value || !Array.isArray(value) || value.length === 0) {
          return true; // Allow empty uploads
        }
  
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
        return value.every((file) => {
          if (file.file_object && file.file_object.size) {
            return file.file_object.size <= maxSizeBytes; // Validate file size
          }
          return false; // Fail validation if size is unavailable
        });
      }
    );
  }

  const LOCAL_STORAGE_KEY = "clientFormData";
  const LOCAL_STORAGE_STEP_KEY = "clientFormStep";

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

    CathegoryOfEntity: "",
    SPVType: "",
    SectorOfEntity:[],
    OtherSectorOfEntity: "",

    authorisedName: "",
    authorisedEmail: "",
    authorisedPersonContact: "",
    authorisedCurrentAddress: "",
    authorisedRelationship: "",
    signature_file: [],
    isPep: "",
    bankStatement_file: [],
    professionalReference_file: [],
    countryOfIncorporation: "",
    incorporationDate: "",
    registeredOfficeAddress: "",
    businessActivity: "",
    countryOfOperation: "",

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

    confirmationLetter_file: [],
    bank_statement_file: [],
    custody_accounts_file: [],
    source_of_funds_file: [],
    payslips_file: [],
    due_diligence_file: [],
    financial_statements_file: [],
    proof_of_ownership_file: [],
    lease_agreement_file: [],
    bank_statements_file: [],
    cdd_documents_file: [],
    documentary_evidence_file: [],
    bank_statement_proceeds_file: [],
    notarised_documents_file: [],
    letter_from_donor_file: [],
    donor_source_of_wealth_file: [],
    donor_bank_statement_file: [],
    letter_from_relevant_org_file: [],
    lottery_bank_statement_file: [],
    creditor_agreement_file: [],
    creditor_cdd_file: [],
    creditor_bank_statement_file: [],
    legal_document_file: [],
    notary_letter_file: [],
    executor_letter_file: [],
    loan_agreement_file: [],
    loan_bank_statement_file: [],
    related_third_party_loan_agreement_file: [],
    related_third_party_cdd_file: [],
    related_third_party_bank_statement_file: [],
    unrelated_third_party_loan_agreement_file: [],
    unrelated_third_party_cdd_file: [],
    unrelated_third_party_bank_statement_file: [],
    signed_letter_from_notary_file: [],
    property_contract_file: [],
    insurance_pay_out_file: [],
    retirement_annuity_fund_statement_file: [],
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
    Director1_national_id_file: [],
    Director1_passport_file: [],
    Director2_national_id_file: [],
    Director2_passport_file: [],
    Director3_national_id_file: [],
    Director3_passport_file: [],
    passport_file: [],
    utility_file: [],
    wealth_file: [],
    cv_file: [],
    funds_file: [],
    source_of_wealth_file: [],
    financialStatements_file: [],
    principals_identification_file: [],
    shareholders_file: [],
    declaration_of_trust_file: [],
    certificate_of_registration_file: [],
    deed_of_retirement_file: [],
    business_plan_file: [],
    registered_office_file: [],
    register_of_trustee_file: [],
    proof_of_source_of_funds_file: [],
    proof_of_source_of_wealth_file: [],
    latest_accounts_or_bank_statements_file: [],
    licence_file: [],
    certificate_of_incumbency_file: [],
    charter_file: [],
    latest_accounts_file: [],
    identification_documents_of_the_principals_of_the_foundation_file: [],
    other_necessary_documents_file: [],
  };

  const [formValues, setFormValues] = useState(null);
  const [step, setStep] = useState(() => {
    const storedStep = LocalStorageUtils.get(LOCAL_STORAGE_STEP_KEY);
    return storedStep ? parseInt(storedStep, 10) : 1;
  });

  useEffect(() => {
    const savedData = LocalStorageUtils.get(LOCAL_STORAGE_KEY);
    if (savedData) {
      setFormValues(savedData);
    } else {
      setFormValues(initialValues);
    }
  }, []);

  if (!formValues) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleStepChange = (newStep, values) => {
    LocalStorageUtils.save(LOCAL_STORAGE_KEY, values);
    LocalStorageUtils.save(LOCAL_STORAGE_STEP_KEY, newStep);
    setStep(newStep);
  };

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="-40px">
        <Header
          title="REGISTER A CLIENT"
          subtitle="Please fill in the blank fields in the form below. This information will help us to serve Client better."
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/clients">Back to Client List</Link>
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="175px auto"
        gap="5px"
        alignItems="start"
      >

      {/* navigation boxes */}
      <Box
        display="inline-grid"
        alignItems="flex-start"
        justifyContent="space-between"
        mt="20px"
        sx={{
          border: `1px solid ${colors.grey[500]}`,
          padding: "3px",
          borderRadius: "4px",
          backgroundColor: colors.primary[400],
          marginBottom: "3px",
        }}
      >
        <Button
          variant={step === 1 ? "contained" : "outlined"}
          color={step === 1 ? "secondary" : "primary"}
          onClick={() => handleStepChange(1, formValues)}
          sx={{
            backgroundColor: step === 1 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 1 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          CLIENT DETAILS
        </Button>
        <Button
          variant={step === 2 ? "contained" : "outlined"}
          color={step === 2 ? "secondary" : "primary"}
          onClick={() => handleStepChange(2, formValues)}
          sx={{
            backgroundColor: step === 2 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 2 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          ENTITY INFORMATION
        </Button>
        <Button
          variant={step === 3 ? "contained" : "outlined"}
          color={step === 3 ? "secondary" : "primary"}
          onClick={() => handleStepChange(3, formValues)}
          sx={{
            backgroundColor: step === 3 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 3 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          AUTHORIZED PERSON
        </Button>
        <Button
          variant={step === 4 ? "contained" : "outlined"}
          color={step === 4 ? "secondary" : "primary"}
          onClick={() => handleStepChange(4, formValues)}
          sx={{
            backgroundColor: step === 4 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 4 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          BACKGROUND HISTORY(1)
        </Button>
        <Button
          variant={step === 5 ? "contained" : "outlined"}
          color={step === 5 ? "secondary" : "primary"}
          onClick={() => handleStepChange(5, formValues)}
          sx={{
            backgroundColor: step === 5 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 5 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          BACKGROUND HISTORY(2)
        </Button>
        <Button
          variant={step === 6 ? "contained" : "outlined"}
          color={step === 6 ? "secondary" : "primary"}
          onClick={() => handleStepChange(6, formValues)}
          sx={{
            backgroundColor: step === 6 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 6 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          MODE OF PAYMENT
        </Button>
        <Button
          variant={step === 7 ? "contained" : "outlined"}
          color={step === 7 ? "secondary" : "primary"}
          onClick={() => handleStepChange(7, formValues)}
          sx={{
            backgroundColor: step === 7 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 7 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          PURPOSE OF BUSINESS
        </Button>
        <Button
          variant={step === 8 ? "contained" : "outlined"}
          color={step === 8 ? "secondary" : "primary"}
          onClick={() => handleStepChange(8, formValues)}
          sx={{
            backgroundColor: step === 8 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 8 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          SOURCE OF FUNDS
        </Button>
        <Button
          variant={step === 9 ? "contained" : "outlined"}
          color={step === 9 ? "secondary" : "primary"}
          onClick={() => handleStepChange(9, formValues)}
          sx={{
            backgroundColor: step === 9 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 9 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          SOURCE OF WEALTH
        </Button>
        <Button
          variant={step === 10 ? "contained" : "outlined"}
          color={step === 10 ? "secondary" : "primary"}
          onClick={() => handleStepChange(10, formValues)}
          sx={{
            backgroundColor: step === 10 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 10 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          DIRECTORSHIP
        </Button>
        <Button
          variant={step === 11 ? "contained" : "outlined"}
          color={step === 11 ? "secondary" : "primary"}
          onClick={() => handleStepChange(11, formValues)}
          sx={{
            backgroundColor: step === 11 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 11 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          BANK DETAILS
        </Button>
        <Button
          variant={step === 12 ? "contained" : "outlined"}
          color={step === 12 ? "secondary" : "primary"}
          onClick={() => handleStepChange(12, formValues)}
          sx={{
            backgroundColor: step === 12 ? colors.greenAccent[500] : colors.primary[400],
            "&:hover": {
              backgroundColor: step === 12 ? colors.greenAccent[700] : colors.greenAccent[400],
            },
          }}
        >
          FINANCIAL FORECAST
        </Button>
      </Box>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
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
              // gap="10px"
              // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
                display="grid"
                rowGap="10px"
                columnGap="10px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                position="relative"
                sx={{
                  border: `1px solid ${colors.grey[500]}`,
                  padding: "3px",
                  borderRadius: "4px",
                  height: "70vh",
                  overflowY: "auto",
                  width: "100%",
                  alignItems: "start",
                  gridAutoRows: "auto"
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
                />
              )}
              </Box>
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
                    onClick={() => handleStepChange(step - 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
                    onClick={() => handleStepChange(step + 1, values)}
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
          </form>
        )}
      </Formik>
      </Box>

      <FeedbackDialog
        open={isDialogOpen}  // Open or close dialog based on this state
        message={dialogMessage}  // Show this message in the dialog
        isSuccess={dialogSuccess}  // Success or error state (for color/icons)
        onClose={() => {
          setDialogOpen(false);
          if (dialogSuccess) {
            navigate("/clients");
          }
        }}
        isLoading={dialogLoading}
      />
    </Box>
  );
};

export default ClientForm;
