
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  getBookmarks,
  removeBookmark,
  type Bookmark,
} from "@/lib/bookmarks";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookmarks = useCallback(async () => {
    try {
      setError("");
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.error("Unable to load bookmarks:", err);
      setError("Unable to load your bookmarks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookmarks();

    const handleUpdate = () => {
      loadBookmarks();
    };

    window.addEventListener("saphub:bookmarks-updated", handleUpdate);

    return () => {
      window.removeEventListener("saphub:bookmarks-updated", handleUpdate);
    };
  }, [loadBookmarks]);

  async function handleRemove(slug: string) {
    try {
      await removeBookmark(slug);
      setBookmarks((current) =>
        current.filter((bookmark) => bookmark.lesson_slug !== slug)
      );
    } catch (err) {
      console.error("Unable to remove bookmark:", err);
      setError("Unable to remove this bookmark. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080e1c] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/courses/abap"
            className="text-sm text-slate-400 transition hover:text-blue-400"
          >
            ← Back to SAP ABAP
          </Link>

          <div className="mt-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-400">
              YOUR LEARNING LIBRARY
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              My Bookmarks
            </h1>

            <p className="mt-3 text-slate-400">
              Your saved SAP lessons, all in one place.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-[#111c30] p-10 text-center">
            <p className="text-slate-400">Loading your bookmarks...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
            <button
              onClick={loadBookmarks}
              className="ml-2 underline hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && bookmarks.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#111c30] px-6 py-14 text-center">
            <div className="text-5xl text-blue-400">☆</div>

            <h2 className="mt-5 text-xl font-semibold">
              No bookmarks yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
              Save your favourite SAP lessons using the bookmark button.
              They will appear here so you can easily revisit them.
            </p>

            <Link
              href="/courses/abap"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              Explore ABAP lessons
            </Link>
          </div>
        )}

        {/* Bookmark List */}
        {!loading && bookmarks.length > 0 && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Saved Lessons
              </h2>

              <span className="rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs text-blue-300">
                {bookmarks.length} saved
              </span>
            </div>

            <div className="space-y-4">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.lesson_slug}
                  className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111c30] p-5 transition hover:border-blue-400/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-2xl text-blue-300">
                      ☆
                    </div>

                    <div>
                      <p className="text-xs font-medium text-blue-400">
                        {bookmark.course_name}
                      </p>

                      <h3 className="mt-1 font-semibold text-white">
                        {bookmark.lesson_title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-500">
                        Saved{" "}
                        {new Date(bookmark.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/courses/abap/lessons/${bookmark.lesson_slug}`}
                      className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
                    >
                      Open Lesson →
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRemove(bookmark.lesson_slug)}
                      className="rounded-lg border border-red-400/20 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-400/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
