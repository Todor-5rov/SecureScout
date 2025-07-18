import { useState } from "react";
import type { AgentInfo } from "../types";
// import {
//   bookingEscrowModuleBookingEscrowAbi as bookingEscrowAbi,
//   bookingEscrowModuleBookingEscrowAddress as bookingEscrowAddress,
// } from "../generated";
import { useWriteContract } from "wagmi";

export function BookAgent({
  agent,
  onBook,
  onCancel,
}: {
  agent: AgentInfo;
  onBook: () => void;
  onCancel: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  async function handleBook() {
    setError(null);
    setPending(true);
    try {
      // await writeContractAsync({
      //   abi: bookingEscrowAbi,
      //   address: bookingEscrowAddress[420420422],
      //   functionName: "bookAgent",
      //   args: [agent.agent],
      // });
      // onBook();
      setError("Booking functionality not available with current contracts");
    } catch (err: any) {
      setError(err?.message || "Booking failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Book Agent</h2>
        <div className="mb-2">
          Platform: <span className="font-semibold">{agent.platform}</span>
        </div>
        <div className="mb-2">
          Address: <span className="font-mono text-xs">{agent.agent}</span>
        </div>
        <div className="mb-4">
          Price: <span className="font-bold">{agent.price.toString()}</span> PAS
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            onClick={handleBook}
            disabled={pending}
          >
            {pending ? "Booking..." : "Confirm Booking"}
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onCancel}
            disabled={pending}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
