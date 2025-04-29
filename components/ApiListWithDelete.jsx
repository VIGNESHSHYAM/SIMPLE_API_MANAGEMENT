"use client";

import { useState, useEffect } from "react";

export default function ApiListWithDelete() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null); // Track which API is being deleted

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/list");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load APIs");
        }
        setApis(data.apis || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this API?")) return;

    setDeleteLoading(id); // Set loading for this API
    try {
      const res = await fetch(`/api/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete API");
      }
      setApis((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteLoading(null); // Reset loading state after the operation
    }
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (apis.length === 0) return <p>No APIs found.</p>;

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Endpoint</th>
          <th className="px-4 py-2">Credits</th>
          <th className="px-4 py-2">API Key</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {apis.map((api) => (
          <tr key={api._id}>
            <td className="border px-4 py-2">{api.name}</td>
            <td className="border px-4 py-2">{api.endpoint}</td>
            <td className="border px-4 py-2">{api.remainingCredits}</td>
            <td className="border px-4 py-2">{api.apiKey}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => handleDelete(api._id)}
                disabled={deleteLoading === api._id} // Disable button if it's being deleted
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                {deleteLoading === api._id ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
