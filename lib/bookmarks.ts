
import { createClient } from "@/lib/supabase/client";

export type Bookmark = {
  lesson_slug: string;
  lesson_title: string;
  course_name: string;
  created_at: string;
};

const STORAGE_KEY = "saphub:bookmarks";

function getLocalBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalBookmarks(bookmarks: Bookmark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function isLessonBookmarked(slug: string): boolean {
  return getLocalBookmarks().some(
    (bookmark) => bookmark.lesson_slug === slug
  );
}

export async function getBookmarks(): Promise<Bookmark[]> {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    const { data, error: bookmarkError } = await supabase
      .from("bookmarks")
      .select("lesson_slug, lesson_title, course_name, created_at")
      .order("created_at", { ascending: false });

    if (bookmarkError) throw bookmarkError;

    return data ?? [];
  }

  return getLocalBookmarks();
}

export async function addBookmark(
  lesson: Omit<Bookmark, "created_at">
): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    const { error: insertError } = await supabase
      .from("bookmarks")
      .upsert(
        {
          user_id: user.id,
          ...lesson,
        },
        { onConflict: "user_id,lesson_slug" }
      );

    if (insertError) throw insertError;
    return;
  }

  const bookmarks = getLocalBookmarks();

  if (bookmarks.some((item) => item.lesson_slug === lesson.lesson_slug)) {
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

export async function removeBookmark(slug: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    const { error: deleteError } = await supabase
      .from("bookmarks")
      .delete()
      .eq("lesson_slug", slug);

    if (deleteError) throw deleteError;
    return;
  }

  saveLocalBookmarks(
    getLocalBookmarks().filter(
      (bookmark) => bookmark.lesson_slug !== slug
    )
  );
}

export async function syncGuestBookmarks(): Promise<void> {
  const bookmarks = getLocalBookmarks();

  if (bookmarks.length === 0) return;

  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return;

  const { error: syncError } = await supabase
    .from("bookmarks")
    .upsert(
      bookmarks.map((bookmark) => ({
        user_id: user.id,
        lesson_slug: bookmark.lesson_slug,
        lesson_title: bookmark.lesson_title,
        course_name: bookmark.course_name,
      })),
      { onConflict: "user_id,lesson_slug" }
    );

  if (syncError) throw syncError;

  localStorage.removeItem(STORAGE_KEY);
}
