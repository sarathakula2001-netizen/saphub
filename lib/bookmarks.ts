
import { createClient } from "@/lib/supabase/client";

export type Bookmark = {
  lesson_slug: string;
  lesson_title: string;
  course_name: string;
  created_at: string;
};

const GUEST_STORAGE_KEY = "saphub:guest:bookmarks";

function getLocalBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(GUEST_STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed as Bookmark[];
  } catch {
    return [];
  }
}

function saveLocalBookmarks(bookmarks: Bookmark[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    GUEST_STORAGE_KEY,
    JSON.stringify(bookmarks)
  );
}

// Check guest bookmarks only.
// Authenticated bookmark state should be loaded using getBookmarks().
export function isLessonBookmarked(slug: string): boolean {
  return getLocalBookmarks().some(
    (bookmark) => bookmark.lesson_slug === slug
  );
}

// Load bookmarks belonging to the current account or guest.
export async function getBookmarks(): Promise<Bookmark[]> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  // Guests only see guest bookmarks.
  if (!user) {
    return getLocalBookmarks();
  }

  // Authenticated users only see their own database records.
  const { data, error } = await supabase
    .from("bookmarks")
    .select("lesson_slug, lesson_title, course_name, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

// Save a bookmark for the current account or guest.
export async function addBookmark(
  lesson: Omit<Bookmark, "created_at">
): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  if (user) {
    const { error } = await supabase
      .from("bookmarks")
      .upsert(
        {
          user_id: user.id,
          ...lesson,
        },
        {
          onConflict: "user_id,lesson_slug",
        }
      );

    if (error) throw error;

    return;
  }

  const bookmarks = getLocalBookmarks();

  if (
    bookmarks.some(
      (item) => item.lesson_slug === lesson.lesson_slug
    )
  ) {
    return;
  }

  saveLocalBookmarks([
    {
      ...lesson,
      created_at: new Date().toISOString(),
    },
    ...bookmarks,
  ]);
}

// Remove a bookmark belonging to the current account or guest.
export async function removeBookmark(slug: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  if (user) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user.id)
      .eq("lesson_slug", slug);

    if (error) throw error;

    return;
  }

  saveLocalBookmarks(
    getLocalBookmarks().filter(
      (bookmark) => bookmark.lesson_slug !== slug
    )
  );
}

// Guest bookmarks are deliberately NOT imported into user accounts.
export async function syncGuestBookmarks(): Promise<void> {
  return;
}
