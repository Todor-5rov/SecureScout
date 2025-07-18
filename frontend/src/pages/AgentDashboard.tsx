import { useAccount, useReadContract } from "wagmi";
import {
  secureScoutSetupModuleUserRegistryAbi as userRegistryAbi,
  secureScoutSetupModuleUserRegistryAddress as userRegistryAddress,
} from "../generated";

export function AgentDashboard() {
  const account = useAccount();
  const address =
    account.addresses?.[0] ?? "0x0000000000000000000000000000000000000000";
  const { data, isLoading, error } = useReadContract({
    abi: userRegistryAbi,
    address: userRegistryAddress[420420422],
    functionName: "getAgent",
    args: [address],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-0">
        <div className="text-xl text-blue-900">Loading your profile...</div>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-0">
        <div className="text-xl text-red-600">Failed to load your profile.</div>
      </div>
    );
  }

  // data is an Agent struct
  const agentData = data as {
    walletAddress: string;
    name: string;
    email: string;
    serviceType: string;
    priceInPAS: bigint;
    location: string;
    completedJobs: bigint;
    totalEarnings: bigint;
    averageRating: bigint;
    totalRatings: bigint;
    isAvailable: boolean;
    isActive: boolean;
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200 px-0">
      <div className="flex-1 flex flex-col items-center justify-center pt-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          My Agent Profile
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-xl flex flex-col items-center">
          <img
            src="/assets/polkadot-logo.svg"
            alt={agentData.name}
            className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4 object-cover"
          />
          <div className="w-full">
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700">
                Name
              </span>
              <div className="w-full border rounded px-3 py-2 bg-gray-50">
                {agentData.name}
              </div>
            </div>
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700">
                Service Type
              </span>
              <div className="w-full border rounded px-3 py-2 bg-gray-50">
                {agentData.serviceType}
              </div>
            </div>
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700">
                Location
              </span>
              <div className="w-full border rounded px-3 py-2 bg-gray-50">
                {agentData.location}
              </div>
            </div>
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700">
                Price (PAS/hr)
              </span>
              <div className="w-full border rounded px-3 py-2 bg-gray-50">
                {agentData.priceInPAS?.toString()}
              </div>
            </div>
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700">
                Email
              </span>
              <div className="w-full border rounded px-3 py-2 bg-gray-50">
                {agentData.email}
              </div>
            </div>
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700">
                Address
              </span>
              <div className="w-full border rounded px-3 py-2 bg-gray-50 font-mono text-xs">
                {agentData.walletAddress}
              </div>
            </div>
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700">
                Status
              </span>
              <div className="w-full border rounded px-3 py-2 bg-gray-50">
                {agentData.isActive ? "Active" : "Inactive"} -{" "}
                {agentData.isAvailable ? "Available" : "Unavailable"}
              </div>
            </div>
          </div>
        </div>
        {/* Bookings section can be implemented here if needed */}
      </div>
    </div>
  );
}
