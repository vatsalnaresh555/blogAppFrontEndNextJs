// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 👇 matches your backend JSON
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Registration failed');
      }

      setSuccess(true);

      // After success, go to login
      setTimeout(() => router.push('/login'), 1200);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md border border-neutral-800 rounded-xl p-6 bg-neutral-900/50 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/30 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm text-green-400 bg-green-950/30 border border-green-800 rounded-lg px-3 py-2">
            Registered successfully! Redirecting to login…
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
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium py-2 mt-2"
          >
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-xs text-neutral-400 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-sky-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
