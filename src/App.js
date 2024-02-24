import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import UserForm from "./scenes/user_form";
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

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(false);
    if (token && token !== "undefined") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isLoading ? (
            <Routes>
              {/* Routes accessible to non-authenticated users */}
              <Route path="/login" element={<Login />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/testCal" element={<TestCalendar />} />
              

              {/* Routes accessible only to authenticated users */}
              <Route
                element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
              >
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
                      <ProfileUpdateForm />
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
                      <ClientsData />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/bar"
                  element={
                    <AdminLayout>
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
                      <FAQ />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/line"
                  element={
                    <AdminLayout>
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

              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
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
