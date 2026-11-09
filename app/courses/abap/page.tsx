
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import {
  loadCompletedLessons,
  PROGRESS_EVENT,
} from "@/lib/progress";

const lessons = [
  "what-is-sap",
  "introduction-to-sap-abap",
  "sap-architecture",
  "understanding-abap-workbench",
  "introduction-to-variables",
  "abap-data-types",
  "constants-and-literals",
  "practical-coding-examples",
  "arithmetic-operators",
  "comparison-operators",
  "logical-operators",
  "working-with-expressions",
  "if-and-else",
  "elseif-statements",
  "case-statements",
  "practical-exercises",
  "do-loops",
  "while-loops",
  "exit-and-continue",
  "nested-loops",
  "introduction-to-internal-tables",
  "work-areas",
  "append-and-insert",
  "sort-read-modify-delete",
];

const chapters = [
  {
    number: "01",
    icon: "🚀",
    title: "Introduction to SAP ABAP",
    description: "Understand SAP, ABAP and the Workbench.",
  },
  {
    number: "02",
    icon: "📦",
    title: "ABAP Variables and Data Types",
    description: "Learn variables, constants and data types.",
  },
  {
    number: "03",
    icon: "⚡",
    title: "Operators and Expressions",
    description: "Work with arithmetic and logical expressions.",
  },
  {
    number: "04",
    icon: "🔀",
    title: "Conditional Statements",
    description: "Control program flow with IF and CASE.",
  },
  {
    number: "05",
    icon: "🔄",
    title: "Loops and Iterations",
    description: "Understand repeated execution and nested loops.",
  },
  {
    number: "06",
    icon: "🗄️",
    title: "Internal Tables",
    description: "Manage and manipulate internal table records.",
  },
];

const TOTAL_LESSONS = lessons.length;

export default function ABAPCoursePage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Load progress from the shared progress system.
  const refreshProgress = useCallback(async () => {
    try {
      const savedLessons = await loadCompletedLessons();

      const validLessons = [
        ...new Set(
          savedLessons.filter((slug) => lessons.includes(slug))
        ),
      ];

      setCompletedLessons(validLessons);
    } catch (error) {
      console.error("Unable to load course progress:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadProgress() {
      try {
        const savedLessons = await loadCompletedLessons();

        if (!active) return;

        const validLessons = [
          ...new Set(
            savedLessons.filter((slug) => lessons.includes(slug))
          ),
        ];

        setCompletedLessons(validLessons);
      } catch (error) {
        console.error("Unable to load course progress:", error);

        if (active) {
          setCompletedLessons([]);
        }
      } finally {
        if (active) {
          setLoaded(true);
        }
      }
    }

    function handleProgressUpdate() {
      void loadProgress();
    }

    void loadProgress();

    window.addEventListener(PROGRESS_EVENT, handleProgressUpdate);
    window.addEventListener("storage", handleProgressUpdate);

    // Refresh progress when the authentication state changes.
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => {
        if (active) {
          void loadProgress();
        }
      }, 0);
    });

    return () => {
      active = false;

      window.removeEventListener(PROGRESS_EVENT, handleProgressUpdate);
      window.removeEventListener("storage", handleProgressUpdate);

      subscription.unsubscribe();
    };
  }, []);

  const totalLessons = TOTAL_LESSONS;

  const completedCount = completedLessons.length;

  const progress = useMemo(
    () =>
      Math.round((completedCount / totalLessons) * 100),
    [completedCount, totalLessons]
  );

  const remainingLessons = totalLessons - completedCount;

  const nextLesson = lessons.find(
    (lesson) => !completedLessons.includes(lesson)
  );

  const courseCompleted = completedCount === totalLessons;

  // Reset progress for the current learner only.
  async function handleResetProgress() {
    if (!loaded || completedCount === 0 || resetting) return;

    const confirmed = window.confirm(
      "Are you sure you want to reset your SAP ABAP progress? All 24 lessons will be marked as incomplete."
    );

    if (!confirmed) return;

    try {
      setResetting(true);

      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError && authError.name !== "AuthSessionMissingError") {
        throw authError;
      }

      if (user) {
        // Delete only the current user's SAP ABAP progress.
        const { error } = await supabase
          .from("lesson_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("course_name", "SAP ABAP");

        if (error) {
          throw error;
        }

        // Clear this user's local cache.
        localStorage.removeItem(
          `saphub:user:${user.id}:abap:completed-lessons`
        );
      } else {
        // Clear guest progress only.
        localStorage.removeItem(
          "saphub:guest:abap:completed-lessons"
        );
      }

      setCompletedLessons([]);

      window.dispatchEvent(new Event(PROGRESS_EVENT));
    } catch (error) {
      console.error("Unable to reset course progress:", error);

      alert(
        "Unable to reset progress. Please check your connection and try again."
      );
    } finally {
      setResetting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080e1c] text-white">

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-96 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      {/* Top navigation */}
      <nav className="relative z-20 border-b border-white/10 bg-[#080e1c]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link href="/" className="text-2xl font-black tracking-tight">
            SAP<span className="text-blue-400">Hub</span>
          </Link>

          <div className="flex items-center gap-5 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <span className="text-white">SAP ABAP</span>
          </div>

        </div>
      </nav>

      {/* Main course content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="transition hover:text-blue-400">
            Home
          </Link>
          <span>/</span>
          <span>Courses</span>
          <span>/</span>
          <span className="text-blue-300">SAP ABAP</span>
        </div>

        {/* Welcome section */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#172947] via-[#111e35] to-[#101526] p-7 shadow-2xl shadow-blue-950/20 sm:p-10">

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" />

          <div className="relative z-10 max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-blue-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              BEGINNER LEARNING PATH
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Master SAP
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                ABAP Development.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
              Welcome to your SAP ABAP learning journey. Start with
              the fundamentals, understand programming concepts,
              practise code examples and build your confidence
              step by step.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              {courseCompleted ? (
                <a
                  href="#completion"
                  className="rounded-xl bg-teal-600 px-7 py-4 text-sm font-bold transition hover:bg-teal-500"
                >
                  View Completion ✓
                </a>
              ) : (
                <Link
                  href={`/courses/abap/lessons/${nextLesson ?? "what-is-sap"}`}
                  className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
                >
                  Continue Learning →
                </Link>
              )}

              <a
                href="#course-overview"
                className="rounded-xl border border-white/15 px-7 py-4 text-sm font-semibold text-slate-300 transition hover:border-blue-400/50 hover:text-white"
              >
                Course Overview
              </a>

            </div>

            <div className="mt-12 flex flex-wrap gap-10">
              <div>
                <p className="text-2xl font-bold">06</p>
                <p className="mt-1 text-xs text-slate-500">Chapters</p>
              </div>

              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="mt-1 text-xs text-slate-500">Lessons</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-teal-300">Free</p>
                <p className="mt-1 text-xs text-slate-500">Course access</p>
              </div>
            </div>

          </div>
        </section>

        {/* Optional account benefits */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-r from-[#122441] to-[#111d30] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold text-teal-300">
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                FREE LEARNING FOR EVERYONE
              </div>

              <h2 className="text-2xl font-bold text-white">
                Get more from your SAPHub experience.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Learn all 24 ABAP lessons without signing in. Create a free
                account to access your personal dashboard, save bookmarks and
                manage your learning activity.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
                <span>✓ Personal Dashboard</span>
                <span>✓ Bookmarks</span>
                <span>✓ Personal Profile</span>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Create Free Account →
              </Link>
              <p className="mt-2 text-center text-xs text-slate-500">
                Optional · No payment required
              </p>
            </div>
          </div>
        </section>

        {/* Progress dashboard */}
        <section className="mt-8 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">

          {/* Progress ring */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111d30] p-7 sm:p-8">

            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-blue-500/10 blur-[70px]" />

            <div className="relative flex flex-wrap items-center justify-between gap-8">

              <div className="max-w-xs">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-400">
                  YOUR PROGRESS
                </p>

                <h2 className="mt-4 text-2xl font-bold">
                  Your learning journey
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Keep learning consistently. Every completed lesson
                  takes you one step closer to mastering SAP ABAP.
                </p>

                <p className="mt-5 text-sm font-semibold text-teal-300">
                  {loaded
                    ? `${completedCount} of ${totalLessons} lessons completed`
                    : "Loading your progress..."}
                </p>
              </div>

              {/* Progress visualization */}
              <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">

                <div
                  className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    background: `conic-gradient(#3b82f6 ${progress * 3.6}deg, #26364f ${progress * 3.6}deg 360deg)`,
                    transform: "rotateX(15deg) rotateZ(-8deg)",
                    boxShadow: "0 15px 45px rgba(37,99,235,0.2)",
                  }}
                />

                <div className="absolute inset-3 rounded-full border border-white/10 bg-[#111d30] shadow-inner" />

                <div className="relative z-10 text-center">
                  <p className="text-4xl font-black">
                    {loaded ? progress : 0}%
                  </p>

                  <p className="mt-2 text-[10px] font-semibold tracking-wider text-slate-400">
                    COMPLETED
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-[#111d30] p-5 transition duration-300 hover:-translate-y-1 hover:border-teal-400/30">
              <div className="text-2xl">✓</div>
              <p className="mt-5 text-3xl font-black text-teal-300">
                {loaded ? completedCount : "—"}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Completed lessons
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111d30] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30">
              <div className="text-2xl">📘</div>
              <p className="mt-5 text-3xl font-black text-blue-300">
                {loaded ? remainingLessons : "—"}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Remaining lessons
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111d30] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30">
              <div className="text-2xl">📚</div>
              <p className="mt-5 text-3xl font-black text-violet-300">
                06
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Learning chapters
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111d30] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
              <div className="text-2xl">⚡</div>
              <p className="mt-5 text-3xl font-black text-cyan-300">
                Free
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Course access
              </p>
            </div>

          </div>
        </section>

        {/* Reset course progress */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleResetProgress}
            disabled={
              !loaded ||
              completedCount === 0 ||
              resetting
            }
            className="rounded-xl border border-red-400/30 px-5 py-3 text-sm font-semibold text-red-300 transition hover:border-red-400/60 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {resetting ? "Resetting..." : "Reset Progress"}
          </button>
        </div>

        {/* Course overview */}
        <section id="course-overview" className="mt-12">

          <div className="mb-7">
            <p className="text-xs font-bold tracking-[0.2em] text-blue-400">
              COURSE OVERVIEW
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Your SAP ABAP learning path
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Explore six structured chapters covering the fundamentals
              of ABAP programming. Use the chapter and lesson navigation
              in the left sidebar to start learning.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="group rounded-2xl border border-white/10 bg-[#111d30] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#15243b]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-2xl transition duration-300 group-hover:scale-110">
                    {chapter.icon}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-blue-400">
                      CHAPTER {chapter.number}
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-white">
                      {chapter.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-400">
                  {chapter.description}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* Course completion */}
        {courseCompleted && (
          <section
            id="completion"
            className="mt-12 rounded-3xl border border-teal-400/30 bg-gradient-to-br from-teal-500/10 to-blue-500/10 p-8 text-center sm:p-10"
          >
            <div className="text-6xl">🏆</div>

            <h2 className="mt-5 text-3xl font-black">
              Congratulations!
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
              You have completed all 24 lessons in the SAP ABAP
              learning path. Keep practising and continue growing
              your development skills.
            </p>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 py-8 text-center">
          <p className="text-sm font-semibold">
            SAP<span className="text-blue-400">Hub</span>
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Learn. Connect. Grow.
          </p>
        </footer>

      </div>
    </main>
  );
}
