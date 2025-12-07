// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        // IMPORTANT: needed to receive HttpOnly cookie
        credentials: 'include',

        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Login failed');
      }

      // Cookie from backend is now stored automatically.

      router.push('/'); // Redirect to homepage
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md border border-neutral-800 rounded-xl p-6 bg-neutral-900/50 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/30 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full rounded-lg bg-neutral-950 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-lg bg-neutral-950 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium py-2 mt-2"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-xs text-neutral-400 text-center">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-sky-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
