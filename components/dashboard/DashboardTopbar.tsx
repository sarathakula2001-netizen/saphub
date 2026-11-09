
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type DashboardTopbarProps = {
  name: string;
};

export default function DashboardTopbar({
  name,
}: DashboardTopbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b16]/90 backdrop-blur-xl">
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-5 sm:px-8">
        <div className="min-w-0">
          <p className="text-xs text-slate-500">SAPHub / Dashboard</p>
          <h2 className="mt-1 truncate text-lg font-semibold text-white">
            Overview
          </h2>
        </div>

        <div className="hidden max-w-sm flex-1 md:block">
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
            <span className="text-slate-500">⌕</span>
            <input
              type="search"
              placeholder="Search courses and lessons..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500">
              /
            </span>
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            title="Notifications coming soon"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/10"
          >
            ♧
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-400" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3 transition hover:border-blue-400/40 hover:bg-white/[0.08]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-300">
                {initials || "L"}
              </span>

              <span className="hidden max-w-[130px] truncate text-sm font-medium text-slate-200 sm:block">
                {name}
              </span>

              <span className="text-xs text-slate-400">
                {menuOpen ? "▲" : "⌄"}
              </span>
            </button>

            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close profile menu"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setMenuOpen(false)}
                />

                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-2 shadow-2xl shadow-black/40"
                >
                  <div className="border-b border-white/10 px-3 py-3">
                    <p className="truncate text-sm font-semibold text-white">
                      {name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      SAPHub Account
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <span>👤</span>
                    My Profile
                  </Link>

                  <Link
                    href="/account-settings"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <span>⚙️</span>
                    Account Settings
                  </Link>

                  <Link
                    href="/change-password"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <span>🔐</span>
                    Change Password
                  </Link>

                  <div className="my-2 border-t border-white/10" />

                  <button
                    type="button"
                    role="menuitem"
                    disabled={signingOut}
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    <span>↪</span>
                    {signingOut ? "Signing out..." : "Sign Out"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-white/5 px-5 py-2 lg:hidden">
        <Link
          href="/dashboard"
          className="whitespace-nowrap rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-300"
        >
          Overview
        </Link>

        <Link
          href="/courses/abap"
          className="whitespace-nowrap rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-white/5"
        >
          SAP ABAP
        </Link>

        <span className="whitespace-nowrap rounded-lg px-3 py-2 text-xs text-slate-600">
          SAP HANA · Coming soon
        </span>
      </nav>
    </header>
  );
}
