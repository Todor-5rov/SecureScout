import React, { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { USER_REGISTRY_CONTRACT } from "../services/contractService";
import { parseEther } from "viem";

export function ContractDebugger() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Read contract state
  const { data: isPaused, isLoading: pauseLoading } = useReadContract({
    ...USER_REGISTRY_CONTRACT,
    functionName: "paused",
  });

  const { data: isScout, isLoading: scoutLoading } = useReadContract({
    ...USER_REGISTRY_CONTRACT,
    functionName: "registeredScouts",
    args: address ? [address] : undefined,
  });

  const { data: isAgent, isLoading: agentLoading } = useReadContract({
    ...USER_REGISTRY_CONTRACT,
    functionName: "registeredAgents",
    args: address ? [address] : undefined,
  });

  const testRegistration = async () => {
    if (!address) return;

    setLoading(true);
    try {
      console.log("Testing agent registration...");

      const result = await writeContractAsync({
        ...USER_REGISTRY_CONTRACT,
        functionName: "registerAgent",
        args: [
          "Test Agent",
          "test@example.com",
          "Security Audit",
          parseEther("100"),
          "Test Location",
        ],
      });

      setDebugInfo({
        type: "success",
        message: "Registration successful!",
        hash: result,
        timestamp: new Date().toISOString(),
      });

      console.log("Registration result:", result);
    } catch (error: any) {
      setDebugInfo({
        type: "error",
        message: error.message,
        details: error,
        timestamp: new Date().toISOString(),
      });
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const testScoutRegistration = async () => {
    if (!address) return;

    setLoading(true);
    try {
      console.log("Testing scout registration...");

      const result = await writeContractAsync({
        ...USER_REGISTRY_CONTRACT,
        functionName: "registerScout",
        args: ["Test Scout", "test@example.com", "Test Location"],
      });

      setDebugInfo({
        type: "success",
        message: "Scout registration successful!",
        hash: result,
        timestamp: new Date().toISOString(),
      });

      console.log("Scout registration result:", result);
    } catch (error: any) {
      setDebugInfo({
        type: "error",
        message: error.message,
        details: error,
        timestamp: new Date().toISOString(),
      });
      console.error("Scout registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔧 Contract Debugger</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Contract Info</h3>
        <div className="bg-gray-50 p-3 rounded">
          <p>
            <strong>UserRegistry Address:</strong>{" "}
            {USER_REGISTRY_CONTRACT.address}
          </p>
          <p>
            <strong>Connected Address:</strong> {address || "Not connected"}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Contract State</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="font-medium">Paused</p>
            <p className="text-lg">
              {pauseLoading ? "Loading..." : isPaused ? "Yes" : "No"}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <p className="font-medium">Registered as Scout</p>
            <p className="text-lg">
              {scoutLoading ? "Loading..." : isScout ? "Yes" : "No"}
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <p className="font-medium">Registered as Agent</p>
            <p className="text-lg">
              {agentLoading ? "Loading..." : isAgent ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Test Actions</h3>
        <div className="flex gap-4">
          <button
            onClick={testRegistration}
            disabled={loading || !address}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Agent Registration"}
          </button>
          <button
            onClick={testScoutRegistration}
            disabled={loading || !address}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Scout Registration"}
          </button>
        </div>
      </div>

      {debugInfo && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
          <div
            className={`p-3 rounded ${
              debugInfo.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p className="font-medium">{debugInfo.message}</p>
            {debugInfo.hash && (
              <p className="text-sm text-gray-600 mt-1">
                Hash: {debugInfo.hash}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">{debugInfo.timestamp}</p>
            {debugInfo.details && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm">
                  Error Details
                </summary>
                <pre className="text-xs mt-1 overflow-auto">
                  {JSON.stringify(debugInfo.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Connect your wallet first</li>
          <li>Check the contract state above</li>
          <li>If "Paused" is "Yes", the contract needs to be unpaused</li>
          <li>Try the test registration to see if it works</li>
          <li>Check the debug info for any errors</li>
        </ul>
      </div>
    </div>
  );
}
