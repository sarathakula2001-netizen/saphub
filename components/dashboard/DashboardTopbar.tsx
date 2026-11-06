"use client";

import Link from "next/link";

type DashboardTopbarProps = {
  name: string;
};

export default function DashboardTopbar({
  name,
}: DashboardTopbarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

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

          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3 transition hover:bg-white/[0.08]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-300">
              {initials || "L"}
            </span>
            <span className="hidden max-w-[130px] truncate text-sm font-medium text-slate-200 sm:block">
              {name}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-white/5 px-5 py-2 lg:hidden">
        <Link href="/dashboard" className="whitespace-nowrap rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-300">
          Overview
        </Link>
        <Link href="/courses/abap" className="whitespace-nowrap rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-white/5">
          SAP ABAP
        </Link>
        <span className="whitespace-nowrap rounded-lg px-3 py-2 text-xs text-slate-600">
          SAP HANA · Coming soon
        </span>
      </nav>
    </header>
  );
}
