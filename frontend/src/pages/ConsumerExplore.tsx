import { useState } from "react";
import { Carousel } from "../components/Carousel";
import { AgentCard } from "../components/AgentCard";
import { demoAgents } from "../demoAgents";

export function ConsumerExplore() {
  const [query, setQuery] = useState("");
  const filteredAgents = demoAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(query.toLowerCase()) ||
      agent.location.toLowerCase().includes(query.toLowerCase()) ||
      agent.service.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 pb-12">
      <div className="max-w-4xl mx-auto pt-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Find Your Security Expert
        </h1>
        <div className="mb-8 flex justify-center">
          <input
            className="w-full max-w-md border border-blue-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search by name, service, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Carousel>
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))
          ) : (
            <div className="text-gray-500 text-center w-full">
              No agents found.
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
