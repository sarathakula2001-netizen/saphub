"use client";

import { useEffect, useState } from "react";
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "@/lib/bookmarks";

type BookmarkButtonProps = {
  lessonSlug: string;
  lessonTitle: string;
  courseName?: string;
};

export default function BookmarkButton({
  lessonSlug,
  lessonTitle,
  courseName = "SAP ABAP",
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkBookmark() {
      try {
        const bookmarks = await getBookmarks();

        if (active) {
          setIsBookmarked(
            bookmarks.some(
              (bookmark) => bookmark.lesson_slug === lessonSlug
            )
          );
        }
      } catch (error) {
        console.error("Unable to load bookmark:", error);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    checkBookmark();

    return () => {
      active = false;
    };
  }, [lessonSlug]);

  async function handleBookmark() {
    if (isSaving) return;

    setIsSaving(true);

    try {
      if (isBookmarked) {
        await removeBookmark(lessonSlug);
        setIsBookmarked(false);
      } else {
        await addBookmark({
          lesson_slug: lessonSlug,
          lesson_title: lessonTitle,
          course_name: courseName,
        });
        setIsBookmarked(true);
      }

      window.dispatchEvent(new Event("saphub:bookmarks-updated"));
    } catch (error) {
      console.error("Bookmark action failed:", error);
      alert("Unable to update bookmark. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBookmark}
      disabled={isLoading || isSaving}
      aria-label={isBookmarked ? "Remove bookmark" : "Save bookmark"}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
        isBookmarked
          ? "border-blue-400/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
      }`}
    >
      <span className="text-lg">
        {isBookmarked ? "★" : "☆"}
      </span>

      {isLoading
        ? "Loading..."
        : isSaving
          ? "Saving..."
          : isBookmarked
            ? "Saved"
            : "Save lesson"}
    </button>
  );
}