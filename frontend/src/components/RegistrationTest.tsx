import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  useRegisterAgentWithoutGasConfig,
  useRegisterScoutWithoutGasConfig,
  useGetAgent,
  useGetScout,
  useCheckUserRegistrationStatus,
} from "../services/contractService";
import { toast } from "sonner";

export function RegistrationTest() {
  const { address: walletAddress, isConnected } = useAccount();

  // Registration hooks
  const registerAgent = useRegisterAgentWithoutGasConfig();
  const registerScout = useRegisterScoutWithoutGasConfig();

  // Status checking hooks
  const { isAgent, isScout, isRegistered, isLoading } =
    useCheckUserRegistrationStatus(walletAddress);
  const { data: agentData } = useGetAgent(walletAddress);
  const { data: scoutData } = useGetScout(walletAddress);

  // Form state
  const [agentForm, setAgentForm] = useState({
    name: "Test Agent",
    email: "test@example.com",
    serviceType: "Security Assessment",
    priceInPAS: "0.1",
    location: "Test Location",
  });

  const [scoutForm, setScoutForm] = useState({
    displayName: "Test Scout",
    email: "test@example.com",
    location: "Test Location",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAgentRegistration = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerAgent(
        agentForm.name,
        agentForm.email,
        agentForm.serviceType,
        agentForm.priceInPAS,
        agentForm.location
      );
      toast.success("Agent registration successful!");
    } catch (error: any) {
      console.error("Agent registration error:", error);
      toast.error(error?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScoutRegistration = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerScout(
        scoutForm.displayName,
        scoutForm.email,
        scoutForm.location
      );
      toast.success("Scout registration successful!");
    } catch (error: any) {
      console.error("Scout registration error:", error);
      toast.error(error?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Registration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300">
            Please connect your wallet to test registration.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Display */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Registration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-slate-300">
            <p>Wallet: {walletAddress}</p>
            <p>Loading: {isLoading ? "Yes" : "No"}</p>
            <p>Is Agent: {isAgent ? "Yes" : "No"}</p>
            <p>Is Scout: {isScout ? "Yes" : "No"}</p>
            <p>Is Registered: {isRegistered ? "Yes" : "No"}</p>
          </div>
          {agentData && (
            <div className="mt-4 p-4 bg-green-900/20 rounded border border-green-500/20">
              <h4 className="text-green-400 font-semibold">Agent Data:</h4>
              <pre className="text-green-300 text-sm mt-2">
                {JSON.stringify(agentData, null, 2)}
              </pre>
            </div>
          )}
          {scoutData && (
            <div className="mt-4 p-4 bg-blue-900/20 rounded border border-blue-500/20">
              <h4 className="text-blue-400 font-semibold">Scout Data:</h4>
              <pre className="text-blue-300 text-sm mt-2">
                {JSON.stringify(scoutData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agent Registration */}
      {!isAgent && !isScout && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              Test Agent Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="agentName" className="text-white">
                  Name
                </Label>
                <Input
                  id="agentName"
                  value={agentForm.name}
                  onChange={(e) =>
                    setAgentForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="agentEmail" className="text-white">
                  Email
                </Label>
                <Input
                  id="agentEmail"
                  value={agentForm.email}
                  onChange={(e) =>
                    setAgentForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="agentService" className="text-white">
                  Service Type
                </Label>
                <Input
                  id="agentService"
                  value={agentForm.serviceType}
                  onChange={(e) =>
                    setAgentForm((prev) => ({
                      ...prev,
                      serviceType: e.target.value,
                    }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="agentPrice" className="text-white">
                  Price (PAS)
                </Label>
                <Input
                  id="agentPrice"
                  value={agentForm.priceInPAS}
                  onChange={(e) =>
                    setAgentForm((prev) => ({
                      ...prev,
                      priceInPAS: e.target.value,
                    }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="agentLocation" className="text-white">
                  Location
                </Label>
                <Input
                  id="agentLocation"
                  value={agentForm.location}
                  onChange={(e) =>
                    setAgentForm((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <Button
                onClick={handleAgentRegistration}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Registering..." : "Register as Agent"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scout Registration */}
      {!isAgent && !isScout && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              Test Scout Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="scoutName" className="text-white">
                  Display Name
                </Label>
                <Input
                  id="scoutName"
                  value={scoutForm.displayName}
                  onChange={(e) =>
                    setScoutForm((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="scoutEmail" className="text-white">
                  Email
                </Label>
                <Input
                  id="scoutEmail"
                  value={scoutForm.email}
                  onChange={(e) =>
                    setScoutForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="scoutLocation" className="text-white">
                  Location
                </Label>
                <Input
                  id="scoutLocation"
                  value={scoutForm.location}
                  onChange={(e) =>
                    setScoutForm((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <Button
                onClick={handleScoutRegistration}
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Registering..." : "Register as Scout"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Already Registered Message */}
      {(isAgent || isScout) && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Already Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              You are already registered as {isAgent ? "an agent" : "a scout"}.
              Registration test completed successfully!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
