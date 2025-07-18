import {
  secureScoutSetupModuleSecureScoutHubAbi,
  secureScoutSetupModuleSecureScoutHubAddress,
  secureScoutSetupModuleUserRegistryAbi,
  secureScoutSetupModuleUserRegistryAddress,
  secureScoutSetupModuleJobRegistryAbi,
  secureScoutSetupModuleJobRegistryAddress,
  secureScoutSetupModulePaymentRegistryAbi,
  secureScoutSetupModulePaymentRegistryAddress,
  secureScoutSetupModuleRatingRegistryAbi,
  secureScoutSetupModuleRatingRegistryAddress,
} from "../generated";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";

// Contract addresses for the current chain (420420422)
const CHAIN_ID = 420420422;

// Gas configuration for Passet Hub testnet
// Target: 3 PAS tokens total fee
// Gas limit: 3,000,000
// Gas price needed: 3 PAS / 3,000,000 gas = 1 PAS per 1,000,000 gas = 1e18 wei per 1e6 gas = 1e12 wei per gas
const GAS_CONFIG = {
  gas: 3000000n, // 3M gas limit
  maxFeePerGas: 1000000000000n, // 1e12 wei per gas = 1 PAS per 1M gas
  maxPriorityFeePerGas: 1000000000000n, // 1e12 wei per gas = 1 PAS per 1M gas
};

// Main hub contract
export const HUB_CONTRACT = {
  address: secureScoutSetupModuleSecureScoutHubAddress[CHAIN_ID],
  abi: secureScoutSetupModuleSecureScoutHubAbi,
} as const;

// Individual contracts
export const USER_REGISTRY_CONTRACT = {
  address: secureScoutSetupModuleUserRegistryAddress[CHAIN_ID],
  abi: secureScoutSetupModuleUserRegistryAbi,
} as const;

export const JOB_REGISTRY_CONTRACT = {
  address: secureScoutSetupModuleJobRegistryAddress[CHAIN_ID],
  abi: secureScoutSetupModuleJobRegistryAbi,
} as const;

export const PAYMENT_REGISTRY_CONTRACT = {
  address: secureScoutSetupModulePaymentRegistryAddress[CHAIN_ID],
  abi: secureScoutSetupModulePaymentRegistryAbi,
} as const;

export const RATING_REGISTRY_CONTRACT = {
  address: secureScoutSetupModuleRatingRegistryAddress[CHAIN_ID],
  abi: secureScoutSetupModuleRatingRegistryAbi,
} as const;

// Types
export interface Agent {
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
}

export interface Scout {
  walletAddress: string;
  displayName: string;
  email: string;
  location: string;
  totalJobsPosted: bigint;
  totalSpent: bigint;
  averageRating: bigint;
  totalRatings: bigint;
  isActive: boolean;
}

export interface JobRequest {
  jobId: bigint;
  scout: string;
  assignedAgent: string;
  title: string;
  description: string;
  location: string;
  budget: bigint;
  escrowAmount: bigint;
  status: number; // JobStatus enum
  progress: number;
  createdAt: bigint;
  deadline: bigint;
  proofUrls: string[];
  isCompleted: boolean;
  isPaid: boolean;
}

export interface Review {
  reviewer: string;
  reviewee: string;
  jobId: bigint;
  rating: number;
  comment: string;
  timestamp: bigint;
}

// Hook for reading contract data
export function useContractRead(
  contract: any,
  functionName: string,
  args?: any[]
) {
  return useReadContract({
    ...contract,
    functionName,
    args,
  });
}

// Hook for writing to contract
export function useContractWrite() {
  return useWriteContract();
}

// Export useAccount directly from wagmi
export { useAccount } from "wagmi";

// Agent Registration Functions
export function useRegisterAgent() {
  const { writeContractAsync } = useContractWrite();

  return async (
    name: string,
    email: string,
    serviceType: string,
    priceInPAS: string,
    location: string
  ) => {
    try {
      console.log("Starting agent registration with params:", {
        name,
        email,
        serviceType,
        priceInPAS,
        location,
        contractAddress: USER_REGISTRY_CONTRACT.address,
        gasConfig: GAS_CONFIG,
      });

      const priceInWei = parseEther(priceInPAS);
      console.log("Price in Wei:", priceInWei.toString());

      const result = await writeContractAsync({
        ...USER_REGISTRY_CONTRACT,
        functionName: "registerAgent",
        args: [name, email, serviceType, priceInWei, location],
        ...GAS_CONFIG,
      });

      console.log("Registration transaction hash:", result);
      return result;
    } catch (error: any) {
      console.error("Agent registration error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        data: error.data,
        stack: error.stack,
      });

      // Provide more specific error messages
      if (error.message?.includes("insufficient funds")) {
        throw new Error("Insufficient PAS balance for registration");
      } else if (error.message?.includes("user rejected")) {
        throw new Error("Transaction was rejected by user");
      } else if (error.message?.includes("gas")) {
        throw new Error("Gas estimation failed. Please try again.");
      } else if (error.message?.includes("already registered")) {
        throw new Error("This wallet is already registered as an agent");
      } else if (error.message?.includes("Internal JSON-RPC error")) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      } else {
        throw new Error(
          `Registration failed: ${error.message || "Unknown error"}`
        );
      }
    }
  };
}

// Alternative registration function without explicit gas config
export function useRegisterAgentWithoutGasConfig() {
  const { writeContractAsync } = useContractWrite();

  return async (
    name: string,
    email: string,
    serviceType: string,
    priceInPAS: string,
    location: string
  ) => {
    try {
      console.log("Starting agent registration (no gas config) with params:", {
        name,
        email,
        serviceType,
        priceInPAS,
        location,
        contractAddress: USER_REGISTRY_CONTRACT.address,
      });

      const priceInWei = parseEther(priceInPAS);
      console.log("Price in Wei:", priceInWei.toString());

      const result = await writeContractAsync({
        ...USER_REGISTRY_CONTRACT,
        functionName: "registerAgent",
        args: [name, email, serviceType, priceInWei, location],
        // No gas config - will use MetaMask's settings
      });

      console.log("Registration transaction hash:", result);
      return result;
    } catch (error: any) {
      console.error("Agent registration error (no gas config):", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        data: error.data,
        stack: error.stack,
      });

      // Provide more specific error messages
      if (error.message?.includes("insufficient funds")) {
        throw new Error("Insufficient PAS balance for registration");
      } else if (error.message?.includes("user rejected")) {
        throw new Error("Transaction was rejected by user");
      } else if (error.message?.includes("gas")) {
        throw new Error("Gas estimation failed. Please try again.");
      } else if (error.message?.includes("already registered")) {
        throw new Error("This wallet is already registered as an agent");
      } else if (error.message?.includes("Internal JSON-RPC error")) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      } else {
        throw new Error(
          `Registration failed: ${error.message || "Unknown error"}`
        );
      }
    }
  };
}

// Registration function with transaction confirmation
export function useRegisterAgentWithConfirmation() {
  const { writeContractAsync } = useContractWrite();

  return async (
    name: string,
    email: string,
    serviceType: string,
    priceInPAS: string,
    location: string
  ) => {
    try {
      console.log("Starting agent registration with confirmation:", {
        name,
        email,
        serviceType,
        priceInPAS,
        location,
        contractAddress: USER_REGISTRY_CONTRACT.address,
        gasConfig: GAS_CONFIG,
      });

      const priceInWei = parseEther(priceInPAS);
      console.log("Price in Wei:", priceInWei.toString());

      // Submit transaction
      const hash = await writeContractAsync({
        ...USER_REGISTRY_CONTRACT,
        functionName: "registerAgent",
        args: [name, email, serviceType, priceInWei, location],
        ...GAS_CONFIG,
      });

      console.log("Transaction submitted with hash:", hash);

      // Wait for confirmation
      const { waitForTransactionReceipt } = await import("viem/actions");
      const receipt = await waitForTransactionReceipt(window.ethereum, {
        hash,
      });

      console.log("Transaction receipt:", receipt);

      if (receipt.status === "success") {
        console.log("Transaction confirmed successfully!");
        return hash;
      } else {
        throw new Error("Transaction failed on blockchain");
      }
    } catch (error: any) {
      console.error("Agent registration error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        data: error.data,
        stack: error.stack,
      });

      // Provide more specific error messages
      if (error.message?.includes("insufficient funds")) {
        throw new Error("Insufficient PAS balance for registration");
      } else if (error.message?.includes("user rejected")) {
        throw new Error("Transaction was rejected by user");
      } else if (error.message?.includes("gas")) {
        throw new Error("Gas estimation failed. Please try again.");
      } else if (error.message?.includes("already registered")) {
        throw new Error("This wallet is already registered as an agent");
      } else if (error.message?.includes("Internal JSON-RPC error")) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      } else if (error.message?.includes("Transaction failed on blockchain")) {
        throw new Error(
          "Transaction failed on the blockchain. Please try again with higher gas."
        );
      } else {
        throw new Error(
          `Registration failed: ${error.message || "Unknown error"}`
        );
      }
    }
  };
}

export function useGetAgent(agentAddress?: string) {
  return useContractRead(
    USER_REGISTRY_CONTRACT,
    "getAgent",
    agentAddress ? [agentAddress] : undefined
  );
}

export function useCheckIfAgentExists(agentAddress?: string) {
  return useContractRead(
    USER_REGISTRY_CONTRACT,
    "registeredAgents",
    agentAddress ? [agentAddress] : undefined
  );
}

// Scout Registration Functions
export function useRegisterScout() {
  const { writeContractAsync } = useContractWrite();

  return async (displayName: string, email: string, location: string) => {
    try {
      return await writeContractAsync({
        ...USER_REGISTRY_CONTRACT,
        functionName: "registerScout",
        args: [displayName, email, location],
        ...GAS_CONFIG,
      });
    } catch (error: any) {
      console.error("Scout registration error:", error);

      // Provide more specific error messages
      if (error.message?.includes("insufficient funds")) {
        throw new Error("Insufficient PAS balance for registration");
      } else if (error.message?.includes("user rejected")) {
        throw new Error("Transaction was rejected by user");
      } else if (error.message?.includes("gas")) {
        throw new Error("Gas estimation failed. Please try again.");
      } else if (error.message?.includes("already registered")) {
        throw new Error("This wallet is already registered as a scout");
      } else {
        throw new Error(
          `Registration failed: ${error.message || "Unknown error"}`
        );
      }
    }
  };
}

// Alternative scout registration function without explicit gas config
export function useRegisterScoutWithoutGasConfig() {
  const { writeContractAsync } = useContractWrite();

  return async (displayName: string, email: string, location: string) => {
    try {
      console.log("Starting scout registration (no gas config) with params:", {
        displayName,
        email,
        location,
        contractAddress: USER_REGISTRY_CONTRACT.address,
      });

      const result = writeContractAsync({
        ...USER_REGISTRY_CONTRACT,
        functionName: "registerScout",
        args: [displayName, email, location],
      });

      console.log("Scout registration transaction hash:", result);
      return result;
    } catch (error: any) {
      console.error("Scout registration error (no gas config):", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        data: error.data,
        stack: error.stack,
      });

      // Provide more specific error messages
      if (error.message?.includes("insufficient funds")) {
        throw new Error("Insufficient PAS balance for registration");
      } else if (error.message?.includes("user rejected")) {
        throw new Error("Transaction was rejected by user");
      } else if (error.message?.includes("gas")) {
        throw new Error("Gas estimation failed. Please try again.");
      } else if (error.message?.includes("already registered")) {
        throw new Error("This wallet is already registered as a scout");
      } else if (error.message?.includes("Internal JSON-RPC error")) {
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      } else {
        throw new Error(
          `Registration failed: ${error.message || "Unknown error"}`
        );
      }
    }
  };
}

export function useGetScout(scoutAddress?: string) {
  return useContractRead(
    USER_REGISTRY_CONTRACT,
    "getScout",
    scoutAddress ? [scoutAddress] : undefined
  );
}

export function useCheckIfScoutExists(scoutAddress?: string) {
  return useContractRead(
    USER_REGISTRY_CONTRACT,
    "registeredScouts",
    scoutAddress ? [scoutAddress] : undefined
  );
}

// Agent Management Functions
export function useSetAgentAvailability() {
  const { writeContractAsync } = useContractWrite();

  return async (isAvailable: boolean) => {
    return writeContractAsync({
      ...USER_REGISTRY_CONTRACT,
      functionName: "setAgentAvailability",
      args: [isAvailable],
      ...GAS_CONFIG,
    });
  };
}

export function useUpdateAgentPrice() {
  const { writeContractAsync } = useContractWrite();

  return async (newPriceInPAS: string) => {
    const priceInWei = parseEther(newPriceInPAS);

    return writeContractAsync({
      ...USER_REGISTRY_CONTRACT,
      functionName: "updateAgentPrice",
      args: [priceInWei],
    });
  };
}

export function useUpdateAgentLocation() {
  const { writeContractAsync } = useContractWrite();

  return async (newLocation: string) => {
    return writeContractAsync({
      ...USER_REGISTRY_CONTRACT,
      functionName: "updateAgentLocation",
      args: [newLocation],
      ...GAS_CONFIG,
    });
  };
}

// Agent Data Functions
export function useGetAgentsPaginated(
  startIndex: number = 0,
  count: number = 10
) {
  return useContractRead(USER_REGISTRY_CONTRACT, "getAgentsPaginated", [
    startIndex,
    count,
  ]);
}

export function useGetAgentAtIndex(index: number) {
  return useContractRead(USER_REGISTRY_CONTRACT, "getAgentAtIndex", [index]);
}

export function useGetAvailableAgents() {
  return useContractRead(USER_REGISTRY_CONTRACT, "getAvailableAgents");
}

export function useGetAgentsByLocation(location?: string) {
  return useContractRead(
    USER_REGISTRY_CONTRACT,
    "getAgentsByLocation",
    location ? [location] : undefined
  );
}

export function useGetAgentsByService(serviceType?: string) {
  return useContractRead(
    USER_REGISTRY_CONTRACT,
    "getAgentsByService",
    serviceType ? [serviceType] : undefined
  );
}

// Keep the old function for backward compatibility but mark as deprecated
export function useGetAllAgents() {
  console.warn(
    "useGetAllAgents is deprecated. Use useGetAgentsPaginated instead."
  );
  return useGetAgentsPaginated(0, 10);
}

export function useGetAgentJobs(agentAddress?: string) {
  return useContractRead(
    HUB_CONTRACT,
    "getAgentJobs",
    agentAddress ? [agentAddress as `0x${string}`] : undefined
  );
}

export function useGetAgentEarnings(agentAddress?: string) {
  return useContractRead(
    HUB_CONTRACT,
    "getAgentEarnings",
    agentAddress ? [agentAddress as `0x${string}`] : undefined
  );
}

export function useGetAgentRating(agentAddress?: string) {
  return useContractRead(
    HUB_CONTRACT,
    "getAgentRating",
    agentAddress ? [agentAddress] : undefined
  );
}

// Scout Data Functions
export function useGetScoutJobs(scoutAddress?: string) {
  return useContractRead(
    HUB_CONTRACT,
    "getScoutJobs",
    scoutAddress ? [scoutAddress] : undefined
  );
}

export function useGetScoutRating(scoutAddress?: string) {
  return useContractRead(
    HUB_CONTRACT,
    "getScoutRating",
    scoutAddress ? [scoutAddress] : undefined
  );
}

// Job Functions
export function usePostJobRequest() {
  const { writeContractAsync } = useContractWrite();

  return async (
    title: string,
    description: string,
    location: string,
    budget: string,
    preferredAgent: string = "0x0000000000000000000000000000000000000000"
  ) => {
    const budgetInWei = parseEther(budget);

    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "postJobRequest",
      args: [
        title,
        description,
        location,
        budgetInWei,
        preferredAgent as `0x${string}`,
      ],
      value: budgetInWei, // Send budget as payment
      ...GAS_CONFIG,
    });
  };
}

export function useGetJobRequest(jobId?: bigint) {
  return useContractRead(
    HUB_CONTRACT,
    "getJobRequest",
    jobId ? [jobId] : undefined
  );
}

export function useApplyForJob() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "applyForJob",
      args: [jobId],
      ...GAS_CONFIG,
    });
  };
}

export function useAcceptAgent() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint, agent: string) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "acceptAgent",
      args: [jobId, agent as `0x${string}`],
    });
  };
}

export function useStartJob() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "startJob",
      args: [jobId],
    });
  };
}

export function useUpdateJobProgress() {
  const { writeContractAsync } = useContractWrite();

  return async (
    jobId: bigint,
    progressPercentage: number,
    updateMessage: string
  ) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "updateJobProgress",
      args: [jobId, progressPercentage, updateMessage],
    });
  };
}

export function useSubmitJobCompletion() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint, deliverables: string, proofUrls: string[]) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "submitJobCompletion",
      args: [jobId, deliverables, proofUrls],
    });
  };
}

export function useApproveJobCompletion() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "approveJobCompletion",
      args: [jobId],
    });
  };
}

export function useCancelJobRequest() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "cancelJobRequest",
      args: [jobId],
    });
  };
}

export function useDisputeJob() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint, reason: string) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "disputeJob",
      args: [jobId, reason],
    });
  };
}

export function useGetJobApplications(jobId?: bigint) {
  return useContractRead(
    HUB_CONTRACT,
    "getJobApplications",
    jobId ? [jobId] : undefined
  );
}

// Payment Functions
export function useWithdrawEarnings() {
  const { writeContractAsync } = useContractWrite();

  return async () => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "withdrawEarnings",
    });
  };
}

export function useGetEscrowBalance(jobId?: bigint) {
  return useContractRead(
    HUB_CONTRACT,
    "getEscrowBalance",
    jobId ? [jobId] : undefined
  );
}

export function useGetPendingPayments(agentAddress?: string) {
  return useContractRead(
    HUB_CONTRACT,
    "getPendingPayments",
    agentAddress ? [agentAddress] : undefined
  );
}

// Rating Functions
export function useRateAgent() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint, rating: number, review: string) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "rateAgent",
      args: [jobId, rating, review],
      ...GAS_CONFIG,
    });
  };
}

export function useRateScout() {
  const { writeContractAsync } = useContractWrite();

  return async (jobId: bigint, rating: number, review: string) => {
    return writeContractAsync({
      ...HUB_CONTRACT,
      functionName: "rateScout",
      args: [jobId, rating, review],
      ...GAS_CONFIG,
    });
  };
}

export function useGetJobReviews(jobId?: bigint) {
  return useContractRead(
    HUB_CONTRACT,
    "getJobReviews",
    jobId ? [jobId] : undefined
  );
}

export function useGetUserReviews(userAddress?: string) {
  return useContractRead(
    HUB_CONTRACT,
    "getUserReviews",
    userAddress ? [userAddress] : undefined
  );
}

// Utility Functions
export function formatPAS(amount: bigint): string {
  return formatEther(amount);
}

export function parsePAS(amount: string): bigint {
  return parseEther(amount);
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getJobStatusText(status: number): string {
  const statuses = [
    "Open",
    "In Progress",
    "Completed",
    "Cancelled",
    "Disputed",
  ];
  return statuses[status] || "Unknown";
}

export function getJobStatusColor(status: number): string {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-yellow-100 text-yellow-800",
    "bg-green-100 text-green-800",
    "bg-red-100 text-red-800",
    "bg-orange-100 text-orange-800",
  ];
  return colors[status] || "bg-gray-100 text-gray-800";
}

// Function to check if user is already registered (either as agent or scout)
export function useCheckUserRegistrationStatus(userAddress?: string) {
  const agentExists = useCheckIfAgentExists(userAddress);
  const scoutExists = useCheckIfScoutExists(userAddress);

  return {
    isAgent: agentExists.data,
    isScout: scoutExists.data,
    isLoading: agentExists.isLoading || scoutExists.isLoading,
    isRegistered: agentExists.data || scoutExists.data,
  };
}

// Function to get detailed registration status
export function useGetDetailedRegistrationStatus(userAddress?: string) {
  const agentData = useGetAgent(userAddress);
  const scoutData = useGetScout(userAddress);

  return {
    agentData: agentData.data,
    scoutData: scoutData.data,
    isLoading: agentData.isLoading || scoutData.isLoading,
    isAgent: !!agentData.data,
    isScout: !!scoutData.data,
  };
}
