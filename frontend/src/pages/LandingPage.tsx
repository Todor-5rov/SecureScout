import { Navbar } from "../components/Navbar";
import { Carousel } from "../components/Carousel";
import { AgentCard } from "../components/AgentCard";
import { demoAgents } from "../demoAgents";

export function LandingPage({
  isConnected,
  onConnect,
}: {
  isConnected: boolean;
  onConnect: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar isConnected={isConnected} onConnect={onConnect} />
      <header className="relative flex flex-col items-center justify-center h-[60vh] text-center">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
            SecureScout
          </h1>
          <p className="text-lg md:text-2xl text-blue-800 mb-6 max-w-2xl">
            The trusted platform to find, book, and manage top Web3 security
            experts.
          </p>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            onClick={onConnect}
          >
            {isConnected ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      </header>
      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Featured Agents
        </h2>
        <Carousel>
          {demoAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </Carousel>
      </section>
      <footer className="mt-16 py-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SecureScout. All rights reserved.
      </footer>
    </div>
  );
}
