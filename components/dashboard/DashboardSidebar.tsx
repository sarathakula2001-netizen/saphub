
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getCompletedLessons,
  PROGRESS_EVENT,
} from "@/lib/progress";

const chapters = [
  {
    number: "01",
    title: "Introduction to SAP ABAP",
    lessons: [
      { title: "What is SAP?", slug: "what-is-sap" },
      { title: "Introduction to ABAP", slug: "introduction-to-sap-abap" },
      { title: "SAP Architecture", slug: "sap-architecture" },
      { title: "Understanding ABAP Workbench", slug: "understanding-abap-workbench" },
    ],
  },
  {
    number: "02",
    title: "Variables and Data Types",
    lessons: [
      { title: "Introduction to Variables", slug: "introduction-to-variables" },
      { title: "ABAP Data Types", slug: "abap-data-types" },
      { title: "Constants and Literals", slug: "constants-and-literals" },
      { title: "Practical Coding Examples", slug: "practical-coding-examples" },
    ],
  },
  {
    number: "03",
    title: "Operators and Expressions",
    lessons: [
      { title: "Arithmetic Operators", slug: "arithmetic-operators" },
      { title: "Comparison Operators", slug: "comparison-operators" },
      { title: "Logical Operators", slug: "logical-operators" },
      { title: "Working with Expressions", slug: "working-with-expressions" },
    ],
  },
  {
    number: "04",
    title: "Conditional Statements",
    lessons: [
      { title: "IF and ELSE", slug: "if-and-else" },
      { title: "ELSEIF Statements", slug: "elseif-statements" },
      { title: "CASE Statements", slug: "case-statements" },
      { title: "Practical Exercises", slug: "practical-exercises" },
    ],
  },
  {
    number: "05",
    title: "Loops and Iterations",
    lessons: [
      { title: "DO Loops", slug: "do-loops" },
      { title: "WHILE Loops", slug: "while-loops" },
      { title: "EXIT and CONTINUE", slug: "exit-and-continue" },
      { title: "Nested Loops", slug: "nested-loops" },
    ],
  },
  {
    number: "06",
    title: "Internal Tables",
    lessons: [
      { title: "Introduction to Internal Tables", slug: "introduction-to-internal-tables" },
      { title: "Work Areas", slug: "work-areas" },
      { title: "APPEND and INSERT", slug: "append-and-insert" },
      { title: "SORT, READ, MODIFY and DELETE", slug: "sort-read-modify-delete" },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const activeChapter = chapters.findIndex((chapter) =>
    chapter.lessons.some(
      (lesson) => pathname === `/courses/abap/lessons/${lesson.slug}`
    )
  );

  const [learningOpen, setLearningOpen] = useState(
    pathname.startsWith("/courses/abap")
  );

  const [openChapter, setOpenChapter] = useState<number | null>(
    activeChapter >= 0 ? activeChapter : null
  );

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    setCompletedLessons(getCompletedLessons());

    function updateProgress() {
      setCompletedLessons(getCompletedLessons());
    }

    window.addEventListener(PROGRESS_EVENT, updateProgress);
    window.addEventListener("storage", updateProgress);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, updateProgress);
      window.removeEventListener("storage", updateProgress);
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (active) setUserExists(!!user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUserExists(!!session?.user);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);

    if (pathname.startsWith("/courses/abap")) {
      setLearningOpen(true);
    }

    const chapterIndex = chapters.findIndex((chapter) =>
      chapter.lessons.some(
        (lesson) => pathname === `/courses/abap/lessons/${lesson.slug}`
      )
    );

    if (chapterIndex >= 0) {
      setOpenChapter(chapterIndex);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserExists(false);
    setMobileOpen(false);
    router.replace("/");
    router.refresh();
  }

  function renderSidebarContent() {
    return (
      <>
        {/* Logo */}
        <div className="shrink-0 border-b border-white/10 px-5 py-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black">
                S
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  SAP<span className="text-blue-400">Hub</span>
                </h1>
                <p className="mt-0.5 text-[10px] tracking-[0.2em] text-slate-500">
                  LEARN. CONNECT. GROW.
                </p>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-3 py-5">
          <p className="px-3 text-[10px] font-bold tracking-[0.18em] text-slate-500">
            MAIN MENU
          </p>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              pathname === "/dashboard"
                ? "border border-blue-400/20 bg-blue-500/10 text-blue-300"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <span className="text-lg">⌂</span>
            Dashboard / Overview
          </Link>

          {/* My Learning */}
          <div>
            <button
              type="button"
              onClick={() => setLearningOpen((value) => !value)}
              aria-expanded={learningOpen}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${
                pathname.startsWith("/courses/abap")
                  ? "text-blue-300"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">▤</span>
                My Learning
              </span>
              <span>{learningOpen ? "⌄" : "›"}</span>
            </button>

            {learningOpen && (
              <div className="mt-2 space-y-3 pl-3">
                {/* SAP ABAP */}
                <div>
                  <Link
                    href="/courses/abap"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${
                      pathname === "/courses/abap"
                        ? "bg-blue-500/10 text-blue-300"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15 text-xs text-blue-300">
                      A
                    </span>
                    SAP ABAP
                  </Link>

                  {/* Chapters */}
                  <div className="mt-2 space-y-1 border-l border-white/10 pl-3">
                    {chapters.map((chapter, index) => {
                      const chapterOpen = openChapter === index;

                      const completedCount = chapter.lessons.filter(
                        (lesson) => completedLessons.includes(lesson.slug)
                      ).length;

                      return (
                        <div key={chapter.number}>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenChapter(chapterOpen ? null : index)
                            }
                            aria-expanded={chapterOpen}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-semibold text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                          >
                            <span className="text-[10px] text-blue-400">
                              {chapterOpen ? "⌄" : "›"}
                            </span>

                            <span className="flex-1">
                              {chapter.number}. {chapter.title}
                            </span>

                            <span className="text-[9px] text-slate-600">
                              {completedCount}/4
                            </span>
                          </button>

                          {chapterOpen && (
                            <div className="mb-2 ml-2 space-y-1 border-l border-white/10 pl-3">
                              {chapter.lessons.map((lesson) => {
                                const href = `/courses/abap/lessons/${lesson.slug}`;
                                const active = pathname === href;
                                const completed = completedLessons.includes(
                                  lesson.slug
                                );

                                return (
                                  <Link
                                    key={lesson.slug}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    aria-current={active ? "page" : undefined}
                                    className={`flex items-start gap-2 rounded-lg px-2 py-2 text-[11px] leading-5 transition ${
                                      active
                                        ? "bg-blue-500/15 font-semibold text-blue-300"
                                        : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
                                    }`}
                                  >
                                    <span className="mt-0.5 shrink-0">
                                      {completed ? "✓" : "○"}
                                    </span>
                                    <span>{lesson.title}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SAP HANA */}
                <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-500/10 text-xs text-teal-300">
                      H
                    </span>
                    SAP HANA
                  </span>
                  <span className="text-[9px]">SOON</span>
                </div>
              </div>
            )}
          </div>

          {/* Personal features */}
          <div className="border-t border-white/10 pt-5">
            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-500">
              PERSONAL
            </p>

            <Link
              href="/bookmarks"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                pathname === "/bookmarks"
                  ? "border border-blue-400/20 bg-blue-500/10 font-semibold text-blue-300"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
                ☆
              </span>
              Bookmarks
            </Link>

            {[
              { label: "Quiz History", icon: "✓" },
              { label: "Community", icon: "◎" },
              { label: "My Profile", icon: "◉" },
            ].map((item) => (
              <div
                key={item.label}
                title="Coming soon"
                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 opacity-70"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
                  {item.icon}
                </span>
                {item.label}
                <span className="ml-auto text-[9px] text-slate-600">
                  SOON
                </span>
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <span>↗</span>
            Visit SAPHub website
          </Link>

          {userExists ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              <span>⇥</span>
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10"
            >
              <span>→</span>
              Log in
            </Link>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile top navigation */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0b1220] px-4 text-white lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-2xl transition hover:bg-white/10"
        >
          ☰
        </button>

        <Link href="/" className="text-xl font-bold">
          SAP<span className="text-blue-400">Hub</span>
        </Link>

        <Link
          href="/dashboard"
          aria-label="Dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-lg text-blue-300"
        >
          ⌂
        </Link>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile slide-in drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[min(85vw,340px)] flex-col border-r border-white/10 bg-[#0b1220] text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {renderSidebarContent()}
      </aside>

      {/* Permanent desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[290px] shrink-0 flex-col border-r border-white/10 bg-[#0b1220] text-white lg:flex">
        {renderSidebarContent()}
      </aside>
    </>
  );
}
