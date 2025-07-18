import { useReadContract } from "wagmi";
import {
  secureScoutSetupModuleUserRegistryAbi as userRegistryAbi,
  secureScoutSetupModuleUserRegistryAddress as userRegistryAddress,
} from "../generated";
import type { AgentInfo } from "../types";
import type { DemoAgent } from "../demoAgents";

interface AgentListProps {
  onBook: (agent: AgentInfo | DemoAgent) => void;
  agents?: (AgentInfo | DemoAgent)[];
}

export function AgentList({ onBook, agents }: AgentListProps) {
  // If agents prop is not provided, fetch from contract
  const shouldFetch = !agents;
  const { data, isLoading, error } = useReadContract({
    abi: userRegistryAbi,
    address: userRegistryAddress[420420422],
    functionName: "getAllAgents",
    enabled: shouldFetch,
  });

  let agentList: (AgentInfo | DemoAgent)[] = [];
  if (agents) {
    agentList = agents;
  } else if (data) {
    agentList = (data as any[]).map((a) => ({
      agent: a.walletAddress,
      platform: a.name,
      price: a.priceInPAS,
      description: a.serviceType || "",
      avatar: undefined,
      location: a.location,
    }));
  }

  if (shouldFetch && isLoading)
    return <div className="p-4 text-center">Loading agents...</div>;
  if (shouldFetch && error)
    return (
      <div className="p-4 text-center text-red-600">Failed to load agents</div>
    );
  if (!agentList.length) {
    return <div className="p-4 text-center">No agents registered yet.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Available Agents</h2>
      <ul className="space-y-4">
        {agentList.map((agent, idx) => (
          <li
            key={"agent-" + ("agent" in agent ? agent.agent : agent.id || idx)}
            className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">
              {"avatar" in agent && agent.avatar && (
                <img
                  src={agent.avatar}
                  alt={"name" in agent ? agent.name : agent.platform}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
              )}
              <div>
                <div className="font-semibold">
                  {"name" in agent ? agent.name : agent.platform}
                </div>
                {"agent" in agent && (
                  <div className="text-sm text-gray-600">
                    Address: {agent.agent}
                  </div>
                )}
                {"location" in agent && (
                  <div className="text-xs text-gray-500">{agent.location}</div>
                )}
                <div className="text-sm">
                  Price:{" "}
                  <span className="font-bold">{String(agent.price)}</span> PAS
                </div>
                {"description" in agent && agent.description && (
                  <div className="text-xs text-gray-700 mt-1">
                    {agent.description}
                  </div>
                )}
              </div>
            </div>
            <button
              className="mt-2 md:mt-0 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => onBook(agent)}
            >
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
