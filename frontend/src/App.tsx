import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/landing-page";
import RoleSelection from "./pages/role-selection";
import ScouterRegistration from "./pages/scouter-registration";
import AgentRegistration from "./pages/agent-registration";
import ScouterDashboard from "./pages/scouter-dashboard";
import AgentDashboard from "./pages/agent-dashboard";
import { RegistrationTest } from "./components/RegistrationTest";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route
            path="/scouter-registration"
            element={<ScouterRegistration />}
          />
          <Route path="/agent-registration" element={<AgentRegistration />} />
          <Route path="/scouter-dashboard" element={<ScouterDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/test-registration" element={<RegistrationTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#f8fafc",
              border: "1px solid #475569",
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
