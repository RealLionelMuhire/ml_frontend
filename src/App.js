import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TokenRetrieval from "./utils/TokenRetrieval";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Clients from "./scenes/clients";
import Services from "./scenes/services";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import ServicesForm from "./scenes/services_from";
import Roles from "./scenes/roles";
import UserForm from "./scenes/user_form/index2";
import ClientsForm from "./scenes/client_form";
import { BrowserRouter as Router } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import ClientWithID from "./scenes/clients/clientByID";
import ServiceByID from "./scenes/services/serviceByID";
import ProfileUpdateForm from "./scenes/team/profile_update";
import ClientsData from "./scenes/client_data";
import Alerts from "./scenes/alerts";
import AlertByID from "./scenes/alerts/alertByID";
import AlertsForm from "./scenes/alerts_form";
import AlertPage from "./scenes/alerts/alert_plane_text";
import Reservation from "./scenes/reservations";
import TestCalendar from "./scenes/reservations/TestCalendar";
import ClientReservations from "./scenes/reservations_data";
import ReservationDisplay from "./scenes/reservation_display";
import WelcomePage from "./scenes/welcome_page";
import AuthLandingUser from "./scenes/logged_in_welcome";
import UserProfileDisplay from "./scenes/team/profile_data";
import Contracts from "./scenes/client_contracts";
import ContractByID from "./scenes/client_contracts/contractByID";
import Reports from "./scenes/reports_summary";
import ReportByID from "./scenes/reports_summary/reportByID";

import ClientLayout from "./layouts/client";
import ClientDashboard from "./client_scenes/client_dashboard";
import ClientLogin from "./client_scenes/login_client";
import AuthLandingClient from "./client_scenes/logged_in_welcome";
import ClientWelcomePage from "./client_scenes/welcome_page";

const ProtectedRoute = ({
  isAuthenticated,
  isClientAuthenticated,
  isUserAuthenticated,
}) => {
  const userType = localStorage.getItem("userType");

  if (isAuthenticated || isClientAuthenticated || isUserAuthenticated) {
    return <Outlet />;
  } else {
    if (userType === "client") {
      return <Navigate to="/client-login" />;
    } else {
      return <Navigate to="/login" />;
    }
  }
};

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClientAuthenticated, setIsClientAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = TokenRetrieval.getToken();
    const userType = localStorage.getItem("userType");
    setIsLoading(false);
    if (token && token !== "undefined") {
      setIsAuthenticated(true);
      if (userType === "client") {
        setIsClientAuthenticated(true);
      } else if (
        userType === "user" ||
        userType === "admin" ||
        userType === "manager"
      ) {
        setIsUserAuthenticated(true);
      } else {
        setIsClientAuthenticated(false);
        setIsUserAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsClientAuthenticated(false);
      setIsUserAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isLoading ? (
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              {/* Routes accessible to non-authenticated users */}
              <Route path="/login" element={<Login />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/testCal" element={<TestCalendar />} />
              <Route path="/client-login" element={<ClientLogin />} />
              <Route path="/client-welcome" element={<ClientWelcomePage />} />

              {/* Routes accessible only to authenticated users */}
              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    isUserAuthenticated={isUserAuthenticated}
                  />
                }
              >
                <Route path="/landing-user" element={<AuthLandingUser />} />
                <Route
                  path="/dashboard"
                  element={
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/team"
                  element={
                    <AdminLayout>
                      <Team />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/clients"
                  element={
                    <AdminLayout>
                      <Clients />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/clients-id"
                  element={
                    <AdminLayout>
                      <ClientWithID />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/services-form"
                  element={
                    <AdminLayout>
                      <ServicesForm />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <AdminLayout>
                      <Services />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/service-id"
                  element={
                    <AdminLayout>
                      <ServiceByID />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/alerts-form"
                  element={
                    <AdminLayout>
                      <AlertsForm />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/alerts"
                  element={
                    <AdminLayout>
                      <Alerts />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/alert-id"
                  element={
                    <AdminLayout>
                      <AlertByID />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/roles"
                  element={
                    <AdminLayout>
                      <Roles />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/user-form"
                  element={
                    <AdminLayout>
                      {" "}
                      <UserForm />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/alerts-page"
                  element={
                    <AdminLayout>
                      <AlertPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/update-user"
                  element={
                    <AdminLayout>
                      <ProfileUpdateForm />{" "}
                    </AdminLayout>
                  }
                />
                <Route
                  path="/client-form"
                  element={
                    <AdminLayout>
                      <ClientsForm />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/clients-data"
                  element={
                    <AdminLayout>
                      <ClientsData />{" "}
                    </AdminLayout>
                  }
                />
                <Route
                  path="/client-contract"
                  element={
                    <AdminLayout>
                      <Contracts />{" "}
                    </AdminLayout>
                  }
                />
                <Route
                  path="/contract-id"
                  element={
                    <AdminLayout>
                      <ContractByID />{" "}
                    </AdminLayout>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <AdminLayout>
                      <Reports />{" "}
                    </AdminLayout>
                  }
                />
                <Route
                  path="/report-id"
                  element={
                    <AdminLayout>
                      <ReportByID />{" "}
                    </AdminLayout>
                  }
                />
                <Route
                  path="/bar"
                  element={
                    <AdminLayout>
                      {" "}
                      <Bar />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/pie"
                  element={
                    <AdminLayout>
                      <Pie />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <AdminLayout>
                      <FAQ />{" "}
                    </AdminLayout>
                  }
                />
                <Route
                  path="/line"
                  element={
                    <AdminLayout>
                      {" "}
                      <Line />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <AdminLayout>
                      <Calendar />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/geography"
                  element={
                    <AdminLayout>
                      <Geography />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/client-reservations"
                  element={
                    <AdminLayout>
                      <ClientReservations />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/reservations-display"
                  element={
                    <AdminLayout>
                      <ReservationDisplay />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/user-profile"
                  element={
                    <AdminLayout>
                      <UserProfileDisplay />
                    </AdminLayout>
                  }
                />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    isClientAuthenticated={isClientAuthenticated}
                  />
                }
              >
                <Route
                  path="/client/dashboard"
                  element={
                    <ClientLayout>
                      <ClientDashboard />
                    </ClientLayout>
                  }
                />
                <Route path="/landing" element={<AuthLandingClient />} />
              </Route>

              <Route path="/" element={<WelcomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <h1>loading ... </h1>
          )}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
