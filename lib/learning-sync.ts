import { createClient } from "@/lib/supabase/client";
import {
  getCompletedLessons,
  PROGRESS_EVENT,
} from "@/lib/progress";
import { syncGuestBookmarks } from "@/lib/bookmarks";

const PROGRESS_STORAGE_KEY = "saphub:abap:completed-lessons";

export async function syncLearningData(): Promise<void> {
  if (typeof window === "undefined") return;

  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return;

  // Sync guest bookmarks
  await syncGuestBookmarks();

  // Read guest progress
  const guestLessons = getCompletedLessons();

  // Fetch account progress
  const { data: savedProgress, error: fetchError } = await supabase
    .from("lesson_progress")
    .select("lesson_slug")
    .eq("user_id", user.id);

  if (fetchError) throw fetchError;

  const accountLessons = (savedProgress ?? []).map(
    (item) => item.lesson_slug
  );

  // Merge without duplicates
  const mergedLessons = Array.from(
    new Set([...accountLessons, ...guestLessons])
  );

  // Save merged progress
  if (mergedLessons.length > 0) {
    const { error: upsertError } = await supabase
      .from("lesson_progress")
      .upsert(
        mergedLessons.map((lesson_slug) => ({
          user_id: user.id,
          lesson_slug,
          course_name: "SAP ABAP",
        })),
        { onConflict: "user_id,lesson_slug" }
      );

    if (upsertError) throw upsertError;
  }

  // Update local progress
  localStorage.setItem(
    PROGRESS_STORAGE_KEY,
    JSON.stringify(mergedLessons)
  );

  window.dispatchEvent(new Event(PROGRESS_EVENT));
}