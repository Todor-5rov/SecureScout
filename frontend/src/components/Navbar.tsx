import { Link } from "react-router-dom";

export function Navbar({
  isConnected,
  onConnect,
}: {
  isConnected: boolean;
  onConnect: () => void;
}) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img
          src="/assets/polkadot-logo.svg"
          alt="SecureScout Logo"
          className="h-8 w-8"
        />
        <span className="font-bold text-xl text-blue-700">SecureScout</span>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Home
        </Link>
        <Link
          to="/explore"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Explore Agents
        </Link>
        {isConnected && (
          <Link
            to="/account"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            My Account
          </Link>
        )}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={onConnect}
      >
        {isConnected ? "Connected" : "Connect Wallet"}
      </button>
    </nav>
  );
}
