// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-3">Welcome to BlogApp</h1>
      <p className="text-neutral-400 mb-8">
        A simple blogging platform built with Next.js + Spring Boot.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-xl bg-sky-500 px-6 py-2.5 text-white text-sm font-medium hover:bg-sky-400"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-xl border border-neutral-600 px-6 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-800"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
