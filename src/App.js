import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Clients from "./scenes/clients";
import Activities from "./scenes/activities";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import ActivitiesForm from "./scenes/activities_form";
import Roles from "./scenes/roles";
import UserForm from "./scenes/user_form";
import ClientsForm from "./scenes/client_form";
// import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import ClientWithID from "./scenes/clients/clientByID";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check if the token is present to determine authentication status
    setIsLoading(false);
    console.log("===bolean===>", token);
    if (token && token !== "undefined") {
      console.log("--token===>", token);
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
                  path="/activities-form"
                  element={
                    <AdminLayout>
                      <ActivitiesForm />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/activities"
                  element={
                    <AdminLayout>
                      <Activities />
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
                  path="/client-form"
                  element={
                    <AdminLayout>
                      <ClientsForm />
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
