import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ConsumerExplore } from "./pages/ConsumerExplore";
import { AgentDashboard } from "./pages/AgentDashboard";
import { Navbar } from "./components/Navbar";

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  // For demo: toggle between agent and consumer view
  const [isAgent, setIsAgent] = useState(false);

  function handleConnect() {
    setIsConnected(true);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage isConnected={isConnected} onConnect={handleConnect} />
          }
        />
        <Route
          path="/explore"
          element={
            <>
              <Navbar isConnected={isConnected} onConnect={handleConnect} />
              <ConsumerExplore />
            </>
          }
        />
        <Route
          path="/account"
          element={
            isConnected ? (
              isAgent ? (
                <>
                  <Navbar isConnected={isConnected} onConnect={handleConnect} />
                  <AgentDashboard />
                </>
              ) : (
                <Navigate to="/explore" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      {/* For demo: toggle agent/consumer after connect */}
      {isConnected && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mr-2"
            onClick={() => setIsAgent(false)}
          >
            Consumer View
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            onClick={() => setIsAgent(true)}
          >
            Agent View
          </button>
        </div>
      )}
    </BrowserRouter>
  );
}
