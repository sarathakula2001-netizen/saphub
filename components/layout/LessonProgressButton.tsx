
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  isLessonCompleted,
  markLessonCompleted,
  PROGRESS_EVENT,
} from "@/lib/progress";

export default function LessonProgressButton() {
  const pathname = usePathname();

  const [completed, setCompleted] = useState(false);

  // Identify the current lesson
  const isLessonPage = pathname.startsWith(
    "/courses/abap/lessons/"
  );

  const lessonId = pathname
    .split("/")
    .filter(Boolean)
    .pop() ?? "";

  // Load and listen for progress updates
  useEffect(() => {
    if (!isLessonPage || !lessonId) {
      setCompleted(false);
      return;
    }

    const updateProgress = () => {
      setCompleted(isLessonCompleted(lessonId));
    };

    updateProgress();

    window.addEventListener(
      PROGRESS_EVENT,
      updateProgress
    );

    window.addEventListener(
      "storage",
      updateProgress
    );

    return () => {
      window.removeEventListener(
        PROGRESS_EVENT,
        updateProgress
      );

      window.removeEventListener(
        "storage",
        updateProgress
      );
    };
  }, [isLessonPage, lessonId]);

  // Hide on the ABAP course overview
  if (!isLessonPage || !lessonId) {
    return null;
  }

  // Complete the current lesson
  function handleComplete() {
    markLessonCompleted(lessonId);
    setCompleted(true);
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
              {completed
                ? "Great work! This lesson is saved as completed."
                : "Finished studying this lesson? Mark it as complete."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleComplete}
            disabled={completed}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
              completed
                ? "cursor-default bg-emerald-500/15 text-emerald-400"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {completed
              ? "✓ Completed"
              : "✓ Mark as Complete"}
          </button>

        </div>
      </div>
    </div>
  );
}
