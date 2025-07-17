import type { DemoAgent } from "../demoAgents";

export function AgentCard({ agent }: { agent: DemoAgent }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-64">
      <img
        src={agent.avatar}
        alt={agent.name}
        className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-blue-500"
      />
      <h3 className="text-lg font-bold text-blue-700 mb-1">{agent.name}</h3>
      <div className="text-sm text-gray-600 mb-1">{agent.service}</div>
      <div className="text-xs text-gray-500 mb-1">{agent.location}</div>
      <div className="text-blue-600 font-semibold mb-2">
        {agent.price} PAS/hr
      </div>
      <p className="text-xs text-gray-700 text-center mb-2">
        {agent.description}
      </p>
      <button className="mt-auto bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm">
        Book Now
      </button>
    </div>
  );
}
