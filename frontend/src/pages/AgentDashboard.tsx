import { useState } from "react";
import { demoAgents } from "../demoAgents";

const demoBookings = [
  {
    id: "b1",
    consumer: "Jane Smith",
    date: "2024-06-01",
    details: "Security audit for DeFi app.",
  },
  {
    id: "b2",
    consumer: "Bob Lee",
    date: "2024-06-03",
    details: "Incident response consultation.",
  },
];

export function AgentDashboard() {
  // For demo, use the first agent as the logged-in agent
  const [profile, setProfile] = useState(demoAgents[0]);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 pb-12">
      <div className="max-w-2xl mx-auto pt-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          My Agent Profile
        </h1>
        <form
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center mb-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
            <div className="flex-1">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Service
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="service"
                  value={profile.service}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price (PAS/hr)
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="price"
                  type="number"
                  min="0"
                  value={profile.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              name="description"
              value={profile.description}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            type="submit"
            disabled={pending}
          >
            {pending ? "Saving..." : "Update Profile"}
          </button>
          {success && (
            <div className="text-green-600 mt-2">Profile updated!</div>
          )}
        </form>
        <h2 className="text-xl font-bold text-blue-800 mb-2">My Bookings</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          {demoBookings.length === 0 ? (
            <div className="text-gray-500">No bookings yet.</div>
          ) : (
            <ul className="divide-y divide-blue-100">
              {demoBookings.map((b) => (
                <li
                  key={b.id}
                  className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-semibold text-blue-700">
                      {b.consumer}
                    </div>
                    <div className="text-xs text-gray-500">{b.date}</div>
                    <div className="text-sm text-gray-700">{b.details}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
