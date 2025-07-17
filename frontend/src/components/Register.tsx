import { useState } from "react";
import { useAccount } from "wagmi";
import type { Role } from "../types";
import {
  bookingEscrowModuleUserRegistryAbi as userRegistryAbi,
  bookingEscrowModuleUserRegistryAddress as userRegistryAddress,
} from "../generated";
import { useWriteContract } from "wagmi";
import { fetchLocationSuggestions } from "../utils/geocode.ts";

export function Register({
  onRegister,
}: {
  onRegister: (
    role: Role,
    platform?: string,
    price?: bigint,
    location?: any
  ) => void;
}) {
  const [role, setRole] = useState<Role>("None");
  const [platform, setPlatform] = useState("");
  const [price, setPrice] = useState("");
  const [service, setService] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useAccount();
  const { writeContractAsync } = useWriteContract();

  async function handleLocationInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setLocationQuery(value);
    setSelectedLocation(null);
    if (value.length > 2) {
      const suggestions = await fetchLocationSuggestions(value);
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  }

  function handleLocationSelect(suggestion: any) {
    setSelectedLocation(suggestion);
    setLocationQuery(suggestion.label);
    setLocationSuggestions([]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (role === "Agent") {
        if (!selectedLocation) throw new Error("Please select a location.");
        await writeContractAsync({
          abi: userRegistryAbi,
          address: userRegistryAddress[420420422],
          functionName: "registerAsAgent",
          args: [platform, BigInt(price)],
        });
        onRegister(role, platform, BigInt(price), selectedLocation);
      } else if (role === "Consumer") {
        await writeContractAsync({
          abi: userRegistryAbi,
          address: userRegistryAddress[420420422],
          functionName: "registerAsConsumer",
        });
        onRegister(role);
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setPending(false);
    }
  }

  if (!account.addresses || account.addresses.length === 0) {
    return (
      <div className="p-4 text-center">Connect your wallet to register.</div>
    );
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <label className="block mb-1">Role</label>
        <select
          className="w-full border rounded p-2"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="None">Select...</option>
          <option value="Agent">Agent</option>
          <option value="Consumer">Consumer</option>
        </select>
      </div>
      {role === "Agent" && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Platform</label>
            <input
              className="w-full border rounded p-2"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Service</label>
            <input
              className="w-full border rounded p-2"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price (PAS)</label>
            <input
              className="w-full border rounded p-2"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Location</label>
            <input
              className="w-full border rounded p-2"
              value={locationQuery}
              onChange={handleLocationInput}
              placeholder="Type country, city, or address"
              required
            />
            {locationSuggestions.length > 0 && (
              <ul className="border rounded bg-white mt-1 max-h-40 overflow-y-auto z-10">
                {locationSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleLocationSelect(s)}
                  >
                    {s.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        type="submit"
        disabled={role === "None" || pending}
      >
        {pending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
