
"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import {
  loadCompletedLessons,
  markLessonCompleted,
  PROGRESS_EVENT,
} from "@/lib/progress";

export default function LessonProgressButton() {
  const pathname = usePathname();

  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isLessonPage = pathname.startsWith(
    "/courses/abap/lessons/"
  );

  const lessonId = pathname
    .split("/")
    .filter(Boolean)
    .pop() ?? "";

  const refreshProgress = useCallback(async () => {
    if (!isLessonPage || !lessonId) {
      setCompleted(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const lessons = await loadCompletedLessons();

      setCompleted(lessons.includes(lessonId));
    } catch (error) {
      console.error("Unable to load lesson progress:", error);
      setCompleted(false);
    } finally {
      setLoading(false);
    }
  }, [isLessonPage, lessonId]);

  useEffect(() => {
    void refreshProgress();

    function handleProgressUpdate() {
      void refreshProgress();
    }

    window.addEventListener(PROGRESS_EVENT, handleProgressUpdate);
    window.addEventListener("storage", handleProgressUpdate);

    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // Run outside the auth callback before requesting user data.
      window.setTimeout(() => {
        void refreshProgress();
      }, 0);
    });

    return () => {
      window.removeEventListener(PROGRESS_EVENT, handleProgressUpdate);
      window.removeEventListener("storage", handleProgressUpdate);
      subscription.unsubscribe();
    };
  }, [refreshProgress]);

  if (!isLessonPage || !lessonId) {
    return null;
  }

  async function handleComplete() {
    if (completed || saving || loading) return;

    try {
      setSaving(true);

      await markLessonCompleted(lessonId);

      setCompleted(true);
    } catch (error) {
      console.error("Unable to save lesson progress:", error);
      alert("Unable to save your progress. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-12">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Lesson completion
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {loading
                ? "Checking your lesson progress..."
                : completed
                  ? "Great work! This lesson is saved as completed."
                  : "Finished studying this lesson? Mark it as complete."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleComplete}
            disabled={completed || loading || saving}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
              completed
                ? "cursor-default bg-emerald-500/15 text-emerald-400"
                : "bg-blue-600 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            }`}
          >
            {loading
              ? "Loading..."
              : saving
                ? "Saving..."
                : completed
                  ? "✓ Completed"
                  : "✓ Mark as Complete"}
          </button>
        </div>
      </div>
    </div>
  );
}
