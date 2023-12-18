import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
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
import { useSelector } from "react-redux";

function App() {
  const [theme, colorMode] = useMode();
  const isAuth = Boolean(useSelector((state) => state.token));
  const [isSidebar, setIsSidebar] = React.useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={isAuth ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/team"
                element={isAuth ? <Team /> : <Navigate to="/" />}
              />
              <Route
                path="/clients"
                element={isAuth ? <Clients /> : <Navigate to="/" />}
              />
              <Route
                path="/activities-form"
                element={isAuth ? <ActivitiesForm /> : <Navigate to="/" />}
              />
              <Route
                path="/activities"
                element={isAuth ? <Activities /> : <Navigate to="/" />}
              />
              <Route
                path="/roles"
                element={isAuth ? <Roles /> : <Navigate to="/" />}
              />
              <Route
                path="/user-form"
                element={isAuth ? <UserForm /> : <Navigate to="/" />}
              />
              <Route
                path="/client-form"
                element={isAuth ? <ClientsForm /> : <Navigate to="/" />}
              />
              <Route
                path="/bar"
                element={isAuth ? <Bar /> : <Navigate to="/" />}
              />
              <Route
                path="/pie"
                element={isAuth ? <Pie /> : <Navigate to="/" />}
              />
              <Route
                path="/faq"
                element={isAuth ? <FAQ /> : <Navigate to="/" />}
              />
              <Route
                path="/line"
                element={isAuth ? <Line /> : <Navigate to="/" />}
              />
              <Route
                path="/calendar"
                element={isAuth ? <Calendar /> : <Navigate to="/" />}
              />
              <Route
                path="/geography"
                element={isAuth ? <Geography /> : <Navigate to="/" />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
