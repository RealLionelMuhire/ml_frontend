import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/activities";
import Roles from "./scenes/roles";
import Clients from "./scenes/clients";
import UserForm from "./scenes/user_form";
import ClientForm from "./scenes/client_form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
import AdminLayout from "./layouts/admin";
import Activities from "./scenes/activities";
import ActivitiesForm from "./scenes/activities_form";

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
              <Route path="/clients" element={<AdminLayout>
                <Clients />
              </AdminLayout>} />
              <Route path="/invoices" element={<AdminLayout>
                <Invoices/>
              </AdminLayout>} />
              <Route path="/activities-form" element={<AdminLayout>
                <ActivitiesForm/>
              </AdminLayout>} />
              <Route path="/activities" element={<AdminLayout>
                <Activities/>
              </AdminLayout>} />
              <Route path="/roles" element={<AdminLayout>
                <Roles/>
              </AdminLayout>} />
              <Route path="/user-form" element={<AdminLayout>
                <UserForm/>
              </AdminLayout>} />
              <Route path="/client-form" element={<AdminLayout>
                <ClientForm/>
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