
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "saphub:abap:completed-lessons";

export const PROGRESS_EVENT = "saphub:progress-updated";

// Get all completed lessons
export function getCompletedLessons(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (id): id is string => typeof id === "string"
    );
  } catch {
    return [];
  }
}

// Check whether a lesson is completed
export function isLessonCompleted(lessonId: string): boolean {
  return getCompletedLessons().includes(lessonId);
}

// Save completed lesson to the logged-in user's Supabase account
async function saveProgressToSupabase(
  lessonId: string
): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return;

  const { error } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: user.id,
        lesson_slug: lessonId,
        course_name: "SAP ABAP",
      },
      {
        onConflict: "user_id,lesson_slug",
      }
    );

  if (error) throw error;
}

// Mark a lesson as completed
export function markLessonCompleted(lessonId: string): void {
  if (typeof window === "undefined" || !lessonId) return;

  const completed = getCompletedLessons();

  if (!completed.includes(lessonId)) {
    completed.push(lessonId);

    // Save locally first so progress is never lost
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(completed)
    );
  }

  // Update the sidebar and dashboard immediately
  window.dispatchEvent(new Event(PROGRESS_EVENT));

  // Save to Supabase in the background
  void saveProgressToSupabase(lessonId).catch((error) => {
    console.error("Unable to save lesson progress to Supabase:", error);
  });
}

// Calculate ABAP course progress
export function getAbapProgress() {
  const completed = getCompletedLessons();

  const totalLessons = 24;
  const completedCount = Math.min(completed.length, totalLessons);

  return {
    completedCount,
    totalLessons,
    percentage: Math.round(
      (completedCount / totalLessons) * 100
    ),
  };
}
