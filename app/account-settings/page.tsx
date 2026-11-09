
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AccountInfo = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  provider: string;
};

export default function AccountSettingsPage() {
  const router = useRouter();

  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAccount() {
      try {
        const supabase = createClient();
        const { data, error: authError } = await supabase.auth.getUser();

        if (authError || !data.user) {
          router.replace("/login");
          return;
        }

        const user = data.user;

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();

        if (!active) return;

        const provider =
          typeof user.app_metadata?.provider === "string"
            ? user.app_metadata.provider
            : "email";

        setAccount({
          id: user.id,
          email: user.email || "",
          fullName:
            profile?.full_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "SAPHub Student",
          createdAt: user.created_at,
          provider,
        });
      } catch (err) {
        console.error("Account loading failed:", err);
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load account information."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadAccount();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      router.replace("/login");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to sign out."
      );
      setSigningOut(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirmation !== "DELETE") {
      setError('Type DELETE exactly to confirm account deletion.');
      return;
    }

    const confirmed = window.confirm(
      "This action is permanent. Are you absolutely sure you want to delete your SAPHub account?"
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmation: deleteConfirmation,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to delete your account.");
      }

      const supabase = createClient();
      await supabase.auth.signOut();

      router.replace("/login?reason=account_deleted");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete your account."
      );
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b16] text-white">
        <p className="text-sm text-slate-400">
          Loading account settings...
        </p>
      </main>
    );
  }

  if (!account) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b16] px-5 text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold">Account unavailable</h1>
          <p className="mt-2 text-sm text-slate-400">
            {error || "Please sign in again."}
          </p>
          <Link
            href="/login"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold"
          >
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  const createdDate = new Date(account.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <main className="min-h-screen bg-[#070b16] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/profile"
          className="text-sm text-slate-400 transition hover:text-cyan-300"
        >
          ← Back to profile
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium text-cyan-400">
            SAPHub ACCOUNT
          </p>
          <h1 className="mt-2 text-3xl font-black">
            Account Settings<span className="text-cyan-400">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your account information and security.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300"
          >
            {message}
          </div>
        )}

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-xl">
              👤
            </div>
            <div>
              <h2 className="text-lg font-bold">Account information</h2>
              <p className="text-sm text-slate-400">
                Your registered SAPHub account details.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Full name
              </p>
              <p className="mt-2 font-medium">{account.fullName}</p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Registered email
              </p>
              <p className="mt-2 break-all font-medium">{account.email}</p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Sign-in method
              </p>
              <p className="mt-2 font-medium capitalize">
                {account.provider}
              </p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Account created
              </p>
              <p className="mt-2 font-medium">{createdDate}</p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Account ID
              </p>
              <p className="mt-2 break-all font-mono text-xs text-slate-400">
                {account.id}
              </p>
            </div>
          </div>

          <Link
            href="/profile"
            className="mt-7 inline-flex rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
          >
            Edit profile information
          </Link>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
              🛡️
            </div>
            <div>
              <h2 className="text-lg font-bold">Security</h2>
              <p className="text-sm text-slate-400">
                Protect your SAPHub account.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Password management</p>
              <p className="mt-1 text-xs text-slate-500">
                Verify your current password or use email verification.
              </p>
            </div>

            <Link
              href="/change-password"
              className="rounded-xl border border-cyan-400/30 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
            >
              Change password
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-xl">
              ↪
            </div>
            <div>
              <h2 className="text-lg font-bold">Sign out</h2>
              <p className="text-sm text-slate-400">
                Sign out of your SAPHub account on this browser.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </section>

        <section className="mt-6 rounded-3xl border border-red-400/20 bg-red-500/[0.04] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-xl">
              ⚠️
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-300">
                Delete account
              </h2>
              <p className="text-sm text-slate-400">
                Permanently remove your SAPHub account.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            Deleting your account is permanent. You will lose access to your
            account and profile. This action cannot be undone.
          </p>

          <div className="mt-6">
            <label
              htmlFor="deleteConfirmation"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Type DELETE to confirm
            </label>

            <input
              id="deleteConfirmation"
              type="text"
              value={deleteConfirmation}
              onChange={(event) =>
                setDeleteConfirmation(event.target.value)
              }
              placeholder="Type DELETE"
              autoComplete="off"
              className="h-12 w-full rounded-xl border border-red-400/20 bg-[#0b1424] px-4 text-sm text-white outline-none focus:border-red-400 sm:max-w-sm"
            />
          </div>

          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting || deleteConfirmation !== "DELETE"}
            className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {deleting ? "Deleting account..." : "Permanently delete account"}
          </button>
        </section>

        <footer className="py-8 text-center text-xs text-slate-600">
          SAPHub · Learn. Connect. Grow.
        </footer>
      </div>
    </main>
  );
}
