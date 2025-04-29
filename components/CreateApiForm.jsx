"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateApiForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // to refresh list on success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ name }),
      });                                    // uses promise‐based fetch :contentReference[oaicite:2]{index=2}
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Create failed');
      setName('');                            // clear on success
      router.refresh();                       // revalidate Next.js data :contentReference[oaicite:3]{index=3}
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Create New API</h2>
      <input
        type="text"
        placeholder="API Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Creating…' : 'Create API'}
      </button>
    </form>
  );
}
