import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Roles from "./scenes/roles";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import AdminLayout from "./layouts/admin";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Routes>
          <Route path="/admin-login" element={<Login/>}/>
              <Route path="/" element={<AdminLayout>
                <Dashboard/>
              </AdminLayout>} />
              <Route path="/team" element={<AdminLayout>
                <Team/>
              </AdminLayout>} />
              <Route path="/contacts" element={<AdminLayout>
                <Contacts />
              </AdminLayout>} />
              <Route path="/invoices" element={<AdminLayout>
                <Invoices/>
              </AdminLayout>} />
              <Route path="/roles" element={<AdminLayout>
                <Roles/>
              </AdminLayout>} />
              <Route path="/form" element={<AdminLayout>
                <Form/>
              </AdminLayout>} />
              <Route path="/faq" element={<AdminLayout>
                <FAQ/>
              </AdminLayout>} />
              <Route path="/calendar" element={<AdminLayout>
                <Calendar/>
              </AdminLayout>} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;