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
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Registration failed');
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 1200);
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
          Create an account
        </h1>
        <p className="mb-5 text-sm text-neutral-400">
          Sign up to start writing and sharing your blogs.
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-800/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-emerald-700/70 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200">
            Registered successfully! Redirecting to login…
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
              className="w-full rounded-xl border border-neutral-700/70 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-50 outline-none shadow-sm placeholder:text-neutral-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
              placeholder="Choose a username"
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
              className="w-full rounded-xl border border-neutral-700/70 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-50 outline-none shadow-sm placeholder:text-neutral-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="text-xs text-neutral-500">
              At least 6 characters.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-sky-900/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-neutral-400">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-medium text-sky-400 hover:text-sky-300 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
