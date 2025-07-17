import { useReadContract } from "wagmi";
import {
  bookingEscrowModuleUserRegistryAbi as userRegistryAbi,
  bookingEscrowModuleUserRegistryAddress as userRegistryAddress,
} from "../generated";
import type { AgentInfo } from "../types";

export function AgentList({ onBook }: { onBook: (agent: AgentInfo) => void }) {
  const { data, isLoading, error } = useReadContract({
    abi: userRegistryAbi,
    address: userRegistryAddress[420420422],
    functionName: "getAllAgents",
  });

  if (isLoading)
    return <div className="p-4 text-center">Loading agents...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-600">Failed to load agents</div>
    );
  const agents: AgentInfo[] =
    (data as any[] | undefined)?.map((a) => ({
      agent: a.agent,
      platform: a.platform,
      price: BigInt(a.price),
    })) ?? [];
  if (!agents.length) {
    return <div className="p-4 text-center">No agents registered yet.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Available Agents</h2>
      <ul className="space-y-4">
        {agents.map((agent) => (
          <li
            key={agent.agent}
            className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-semibold">{agent.platform}</div>
              <div className="text-sm text-gray-600">
                Address: {agent.agent}
              </div>
              <div className="text-sm">
                Price:{" "}
                <span className="font-bold">{agent.price.toString()}</span> PAS
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
