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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // needed for HttpOnly cookie
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
       
        throw new Error(text || 'Login failed');
      }

       router.push('/posts'); // go home after login
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800/70 bg-neutral-900/60 px-6 py-7 shadow-xl shadow-black/30 backdrop-blur">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mb-5 text-sm text-neutral-400">
          Log in to continue to your dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-800/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-200">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full rounded-xl border border-neutral-700/70 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-50 outline-none shadow-sm placeholder:text-neutral-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-xl border border-neutral-700/70 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-50 outline-none shadow-sm placeholder:text-neutral-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-sky-900/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-neutral-400">
          Don’t have an account?{' '}
          <a
            href="/register"
            className="font-medium text-sky-400 hover:text-sky-300 hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
