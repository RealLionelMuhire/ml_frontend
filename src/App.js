import React from "react";
import { Routes, Route} from "react-router-dom";
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAuth && (
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/activities-form" element={<ActivitiesForm />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/user-form" element={<UserForm />} />
                <Route path="/client-form" element={<ClientsForm />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/line" element={<Line />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
          )}
          {!isAuth && (
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
            )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
