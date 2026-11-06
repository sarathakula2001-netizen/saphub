
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const chapters = [
  {
    number: "01",
    title: "Introduction to SAP ABAP",
    lessons: [
      { title: "What is SAP?", slug: "what-is-sap" },
      { title: "Introduction to SAP ABAP", slug: "introduction-to-sap-abap" },
      { title: "SAP Architecture", slug: "sap-architecture" },
      { title: "Understanding the ABAP Workbench", slug: "understanding-abap-workbench" },
    ],
  },
  {
    number: "02",
    title: "ABAP Variables and Data Types",
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

const STORAGE_KEY = "saphub:abap:completed-lessons";

export default function AbapSidebar() {
  const pathname = usePathname();

  const activeSlug = pathname.split("/").filter(Boolean).pop();

  const currentChapter = chapters.find((chapter) =>
    chapter.lessons.some((lesson) => lesson.slug === activeSlug)
  );

  const [expandedChapter, setExpandedChapter] = useState(
    currentChapter?.number ?? "01"
  );

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const loadProgress = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];

        if (Array.isArray(parsed)) {
          setCompletedLessons(
            parsed.filter(
              (slug): slug is string =>
                typeof slug === "string" &&
                chapters.some((chapter) =>
                  chapter.lessons.some((lesson) => lesson.slug === slug)
                )
            )
          );
        }
      } catch {
        setCompletedLessons([]);
      }
    };

    loadProgress();

    window.addEventListener("storage", loadProgress);
    window.addEventListener("saphub-progress-updated", loadProgress);

    return () => {
      window.removeEventListener("storage", loadProgress);
      window.removeEventListener("saphub-progress-updated", loadProgress);
    };
  }, []);

  useEffect(() => {
    if (currentChapter) {
      setExpandedChapter(currentChapter.number);
    }
  }, [pathname]);

  const totalLessons = chapters.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0
  );

  return (
    <aside className="relative z-20 flex w-full shrink-0 flex-col border-b border-white/10 bg-[#0d1728] lg:sticky lg:top-0 lg:h-screen lg:w-[310px] lg:border-b-0 lg:border-r">

      {/* Sidebar heading */}
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/courses/abap" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 font-black text-blue-300">
            AB
          </div>

          <div>
            <p className="text-sm font-bold text-white">SAP ABAP</p>
            <p className="mt-1 text-xs text-slate-500">
              Beginner Learning Path
            </p>
          </div>
        </Link>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold tracking-[0.15em] text-slate-400">
            ABAP TUTORIAL
          </span>

          <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[10px] font-semibold text-blue-300">
            {totalLessons} LESSONS
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-slate-500">Your completed lessons</span>
          <span className="font-semibold text-teal-300">
            {completedLessons.length}/{totalLessons}
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-300 transition-all duration-700"
            style={{
              width: `${(completedLessons.length / totalLessons) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Scrollable chapter navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">

        {chapters.map((chapter) => {
          const isExpanded = expandedChapter === chapter.number;

          const completedCount = chapter.lessons.filter((lesson) =>
            completedLessons.includes(lesson.slug)
          ).length;

          const isChapterActive = chapter.lessons.some(
            (lesson) => lesson.slug === activeSlug
          );

          return (
            <div key={chapter.number} className="mb-2">

              {/* Chapter button */}
              <button
                type="button"
                onClick={() =>
                  setExpandedChapter(isExpanded ? "" : chapter.number)
                }
                aria-expanded={isExpanded}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition duration-200 ${
                  isExpanded || isChapterActive
                    ? "border border-blue-400/20 bg-blue-500/10"
                    : "border border-transparent hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    isExpanded || isChapterActive
                      ? "text-blue-300"
                      : "text-slate-500"
                  }`}
                >
                  {chapter.number}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold leading-5 text-slate-200">
                    {chapter.title}
                  </span>

                  <span className="mt-1 block text-[10px] text-slate-500">
                    {completedCount}/{chapter.lessons.length} completed
                  </span>
                </span>

                <span
                  className={`text-sm text-slate-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </span>
              </button>

              {/* Lesson submenu */}
              {isExpanded && (
                <div className="ml-5 mt-2 space-y-1 border-l border-white/10 pl-3">

                  {chapter.lessons.map((lesson, index) => {
                    const isActive = activeSlug === lesson.slug;
                    const isCompleted = completedLessons.includes(lesson.slug);

                    return (
                      <Link
                        key={lesson.slug}
                        href={`/courses/abap/lessons/${lesson.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex items-start gap-3 rounded-r-lg border-l-2 px-3 py-3 transition duration-200 ${
                          isActive
                            ? "border-blue-400 bg-blue-500/15 text-blue-200"
                            : "border-transparent text-slate-400 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span
                          className={`mt-0.5 text-[10px] font-semibold ${
                            isCompleted
                              ? "text-teal-300"
                              : isActive
                                ? "text-blue-300"
                                : "text-slate-600"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="min-w-0 flex-1 text-xs leading-5">
                          {lesson.title}
                        </span>

                        {isCompleted && (
                          <span className="text-xs text-teal-300">✓</span>
                        )}
                      </Link>
                    );
                  })}

                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* Sidebar footer */}
      <div className="hidden border-t border-white/10 px-5 py-4 lg:block">
        <Link
          href="/courses/abap"
          className="text-xs font-medium text-slate-400 transition hover:text-blue-300"
        >
          ← Back to course overview
        </Link>
      </div>

    </aside>
  );
}
