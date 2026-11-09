
import { createClient } from "@/lib/supabase/client";

const GUEST_STORAGE_KEY = "saphub:guest:abap:completed-lessons";
const USER_STORAGE_PREFIX = "saphub:user:";

export const PROGRESS_EVENT = "saphub:progress-updated";

const TOTAL_ABAP_LESSONS = 24;
const COURSE_NAME = "SAP ABAP";

type AbapProgress = {
  completedCount: number;
  totalLessons: number;
  percentage: number;
};

function readStorage(key: string): string[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return [...new Set(
      parsed.filter(
        (id): id is string => typeof id === "string"
      )
    )];
  } catch {
    return [];
  }
}

function writeStorage(key: string, lessons: string[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    key,
    JSON.stringify([...new Set(lessons)])
  );
}

function userStorageKey(userId: string) {
  return `${USER_STORAGE_PREFIX}${userId}:abap:completed-lessons`;
}

/**
 * Get the current authenticated user.
 * No session means the learner is using public learning.
 */
async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error && error.name !== "AuthSessionMissingError") {
    throw error;
  }

  return user ?? null;
}

/**
 * Guest-only synchronous progress.
 */
export function getCompletedLessons(): string[] {
  return readStorage(GUEST_STORAGE_KEY);
}

/**
 * Load completed lessons for the current learner.
 *
 * Authenticated users:
 * Read only their own Supabase records.
 *
 * Guests:
 * Read guest localStorage.
 */
export async function loadCompletedLessons(): Promise<string[]> {
  if (typeof window === "undefined") return [];

  const user = await getCurrentUser();

  if (!user) {
    return getCompletedLessons();
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_slug")
    .eq("user_id", user.id)
    .eq("course_name", COURSE_NAME);

  if (error) {
    console.error("Unable to load lesson progress:", error);
    throw error;
  }

  const lessons = [
    ...new Set(
      (data ?? [])
        .map((item) => item.lesson_slug)
        .filter(
          (slug): slug is string =>
            typeof slug === "string"
        )
    ),
  ];

  // Keep a separate cache for this authenticated user.
  writeStorage(userStorageKey(user.id), lessons);

  return lessons;
}

/**
 * Load completion status for one lesson.
 * Use this for authenticated and guest lesson pages.
 */
export async function loadIsLessonCompleted(
  lessonId: string
): Promise<boolean> {
  const lessons = await loadCompletedLessons();
  return lessons.includes(lessonId);
}

/**
 * Guest-only synchronous compatibility helper.
 *
 * Do not use this for authenticated lesson pages.
 * Use loadIsLessonCompleted() instead.
 */
export function isLessonCompleted(lessonId: string): boolean {
  return getCompletedLessons().includes(lessonId);
}

/**
 * Mark a lesson complete for the current learner.
 */
export async function markLessonCompleted(
  lessonId: string
): Promise<void> {
  if (typeof window === "undefined" || !lessonId) return;

  const user = await getCurrentUser();

  if (!user) {
    // Public guest learning.
    const lessons = getCompletedLessons();

    if (!lessons.includes(lessonId)) {
      lessons.push(lessonId);
    }

    writeStorage(GUEST_STORAGE_KEY, lessons);
  } else {
    // Authenticated learning.
    const supabase = createClient();

    const { error } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          user_id: user.id,
          lesson_slug: lessonId,
          course_name: COURSE_NAME,
        },
        {
          onConflict: "user_id,lesson_slug",
        }
      );

    if (error) {
      console.error("Unable to save lesson progress:", error);
      throw error;
    }

    // Update only this user's local cache.
    const key = userStorageKey(user.id);
    const lessons = readStorage(key);

    if (!lessons.includes(lessonId)) {
      lessons.push(lessonId);
    }

    writeStorage(key, lessons);
  }

  // Notify dashboard and course components.
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

/**
 * Calculate progress for the current learner.
 * This is the single shared progress calculation.
 */
export async function loadAbapProgress(): Promise<AbapProgress> {
  const completedLessons = await loadCompletedLessons();

  const completedCount = Math.min(
    completedLessons.length,
    TOTAL_ABAP_LESSONS
  );

  return {
    completedCount,
    totalLessons: TOTAL_ABAP_LESSONS,
    percentage: Math.round(
      (completedCount / TOTAL_ABAP_LESSONS) * 100
    ),
  };
}

/**
 * Compatibility function.
 *
 * IMPORTANT:
 * This function is now asynchronous.
 * Use await getAbapProgress() or loadAbapProgress().
 */
export async function getAbapProgress(): Promise<AbapProgress> {
  return loadAbapProgress();
}

/**
 * Synchronous guest-only progress.
 * Use only when intentionally displaying guest progress.
 */
export function getGuestAbapProgress(): AbapProgress {
  const completedCount = Math.min(
    getCompletedLessons().length,
    TOTAL_ABAP_LESSONS
  );

  return {
    completedCount,
    totalLessons: TOTAL_ABAP_LESSONS,
    percentage: Math.round(
      (completedCount / TOTAL_ABAP_LESSONS) * 100
    ),
  };
}
