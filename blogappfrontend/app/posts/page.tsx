// src/app/posts/page.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const router = useRouter();

  // New Post Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  // Create New Post (POST only)
  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);
    setCreating(true);

    try {
      const res = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.push("/");
          return;
        }

        const text = await res.text();
        throw new Error(text || "Failed to create post");
      }

      // Reset form
      setTitle("");
      setContent("");
      setCreateSuccess("Post created successfully!");

    } catch (err: any) {
      setCreateError(err.message ?? "Something went wrong");
    } finally {
      setCreating(false);
    }
  }

  // Logout Handler
  async function handleLogout() {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

    router.push("/"); // back to home
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-4">
        <h1 className="text-3xl font-bold">Create Post</h1>

        <button
          onClick={handleLogout}
          className="rounded-xl border border-neutral-600 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
        >
          Logout
        </button>
      </div>

      {/* Create New Post Form */}
      <form
        onSubmit={handleCreatePost}
        className="mb-8 rounded-2xl border border-neutral-700 bg-neutral-900/50 p-5 shadow"
      >
        <h2 className="text-xl font-semibold mb-4">New Blog Post</h2>

        {createError && (
          <div className="mb-3 rounded-lg border border-red-800 bg-red-900/30 px-3 py-2 text-sm text-red-300">
            {createError}
          </div>
        )}

        {createSuccess && (
          <div className="mb-3 rounded-lg border border-emerald-700 bg-emerald-900/30 px-3 py-2 text-sm text-emerald-300">
            {createSuccess}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Post title"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your content here..."
            className="w-full min-h-[120px] rounded-xl border border-neutral-700 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={creating}
            className="mt-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-sky-400 disabled:opacity-60"
          >
            {creating ? "Posting…" : "Submit Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
