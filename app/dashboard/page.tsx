
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { loadAbapProgress, PROGRESS_EVENT } from "@/lib/progress";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardPage() {
  const router = useRouter();

  const [name, setName] = useState("Learner");
  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState({
    completedCount: 0,
    totalLessons: 24,
    percentage: 0,
  });

  const refreshProgress = useCallback(async () => {
    try {
      const latestProgress = await loadAbapProgress();
      setProgress(latestProgress);
    } catch (error) {
      console.error("Unable to load dashboard progress:", error);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !user) {
        router.replace("/login");
        return;
      }

      const fullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Learner";

      setName(fullName);

      try {
        const latestProgress = await loadAbapProgress();

        if (!active) return;

        setProgress(latestProgress);
      } catch (progressError) {
        console.error(
          "Unable to load dashboard progress:",
          progressError
        );
      }

      if (active) {
        setLoading(false);
      }
    }

    void loadUser();

    function updateProgress() {
      void refreshProgress();
    }

    window.addEventListener(PROGRESS_EVENT, updateProgress);
    window.addEventListener("storage", updateProgress);

    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => {
        void refreshProgress();
      }, 0);
    });

    return () => {
      active = false;

      window.removeEventListener(PROGRESS_EVENT, updateProgress);
      window.removeEventListener("storage", updateProgress);

      subscription.unsubscribe();
    };
  }, [router, refreshProgress]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b16] text-white">
        Loading your SAPHub dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b16] text-white lg:flex">
      <DashboardSidebar />

      <div className="min-w-0 flex-1">
        <DashboardTopbar name={name} />

        <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 lg:px-10">
          <section>
            <p className="text-sm font-medium tracking-wide text-blue-400">
              YOUR LEARNING WORKSPACE
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {name}! 👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Continue your SAP learning journey, track your progress,
              and build the skills needed for your next career opportunity.
            </p>
          </section>

          {/* Overview statistics */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Completed lessons
                </span>
                <span className="text-xl text-blue-400">▤</span>
              </div>

              <p className="mt-5 text-3xl font-bold">
                {progress.completedCount}
                <span className="ml-1 text-sm font-normal text-slate-500">
                  / {progress.totalLessons}
                </span>
              </p>

              <p className="mt-2 text-xs text-slate-500">
                ABAP lessons completed
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">ABAP progress</span>
                <span className="text-xl text-emerald-400">◉</span>
              </div>

              <p className="mt-5 text-3xl font-bold">
                {progress.percentage}%
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Quiz attempts</span>
                <span className="text-xl text-violet-400">✓</span>
              </div>

              <p className="mt-5 text-3xl font-bold">—</p>

              <p className="mt-2 text-xs text-slate-500">
                Quiz tracking coming soon
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Learning paths</span>
                <span className="text-xl text-amber-400">⌘</span>
              </div>

              <p className="mt-5 text-3xl font-bold">2</p>

              <p className="mt-2 text-xs text-slate-500">
                ABAP and HANA tracks planned
              </p>
            </div>
          </section>

          {/* Continue learning */}
          <section>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Continue learning</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Pick up where you left off.
                </p>
              </div>

              <Link
                href="/courses/abap"
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                View all courses →
              </Link>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-[#111827] p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-lg font-black text-blue-300">
                    AB
                  </div>

                  <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-blue-300">
                    AVAILABLE
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold">SAP ABAP</h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Learn ABAP programming, variables, operators, conditions,
                  loops and internal tables.
                </p>

                <div className="mt-6 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {progress.completedCount} of {progress.totalLessons} lessons
                  </span>

                  <span className="font-semibold text-blue-300">
                    {progress.percentage}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>

                <Link
                  href="/courses/abap"
                  className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Continue learning →
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-[#111827] p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-lg font-black text-violet-300">
                    H
                  </div>

                  <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-violet-300">
                    COMING SOON
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold">SAP HANA</h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Explore in-memory databases, data modeling, SQLScript
                  and SAP HANA architecture.
                </p>

                <p className="mt-6 text-xs text-slate-500">
                  This learning track is planned for a future release.
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-6 cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-500"
                >
                  Coming soon
                </button>
              </div>
            </div>
          </section>

          {/* Quick access */}
          <section>
            <h2 className="text-xl font-bold">Quick access</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your personal learning tools.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "My Bookmarks",
                  description: "Your saved lessons and resources.",
                  icon: "☆",
                },
                {
                  title: "Quiz History",
                  description: "Review your quiz attempts and scores.",
                  icon: "✓",
                },
                {
                  title: "Community",
                  description: "Connect and learn with others.",
                  icon: "◎",
                },
                {
                  title: "My Profile",
                  description: "Manage your student information.",
                  icon: "◉",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <span className="text-2xl text-blue-400">
                    {item.icon}
                  </span>

                  <h3 className="mt-4 font-semibold">{item.title}</h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-block text-[10px] font-semibold tracking-wider text-slate-600">
                    COMING SOON
                  </span>
                </div>
              ))}
            </div>
          </section>

          <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-600">
            SAPHub · Learn. Connect. Grow.
          </footer>
        </div>
      </div>
    </main>
  );
}
