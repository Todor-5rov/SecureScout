import { Carousel } from "../components/Carousel";
import { AgentCard } from "../components/AgentCard";
import { demoAgents, DemoAgent } from "../demoAgents";
import { useReadContract } from "wagmi";
import {
  secureScoutSetupModuleUserRegistryAbi as userRegistryAbi,
  secureScoutSetupModuleUserRegistryAddress as userRegistryAddress,
} from "../generated";

export function ConsumerExplore() {
  const { data, isLoading, error } = useReadContract({
    abi: userRegistryAbi,
    address: userRegistryAddress[420420422],
    functionName: "getAllAgents",
  });

  // Map real agent data to DemoAgent shape for AgentCard
  const realAgents: DemoAgent[] = Array.isArray(data)
    ? data.map((agent: any) => ({
        id: agent.walletAddress,
        name: agent.name || "Unnamed Agent",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        service: agent.serviceType || "Security Expert",
        location: agent.location || "Unknown",
        price: Number(agent.priceInPAS) || 0,
        description: agent.serviceType || "",
      }))
    : [];

  const allAgents: DemoAgent[] = [...realAgents, ...demoAgents];

  if (isLoading)
    return (
      <div className="w-screen min-h-screen flex items-center justify-center">
        Loading agents...
      </div>
    );
  if (error)
    return (
      <div className="w-screen min-h-screen flex items-center justify-center text-red-500">
        Failed to load agents.
      </div>
    );

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 px-0 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center w-full pt-10">
        Explore Security Experts
      </h1>
      <Carousel>
        {allAgents.length > 0 ? (
          allAgents.map((agent) => <AgentCard key={agent.id} agent={agent} />)
        ) : (
          <div className="w-full text-gray-500 text-center flex justify-center items-center min-h-[120px]">
            No agents found.
          </div>
        )}
      </Carousel>
    </div>
  );
}
