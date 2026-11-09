
"use client";

import Link from "next/link";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");

  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const verified = searchParams.get("verified");
    const reason = searchParams.get("reason");
    const error = searchParams.get("error");

    if (verified === "1") {
      setSuccessMessage(
        "Your email has been verified successfully. Please log in."
      );
    }

    if (reason === "session_expired") {
      setMessage(
        "Your session expired due to 7 minutes of inactivity. Please log in again."
      );
    }

    if (error === "email_not_verified") {
      setMessage("Please verify your email before logging in.");
    } else if (error === "verification_failed") {
      setMessage(
        "Email verification failed. Please try again or request a new confirmation email."
      );
    }
  }, [searchParams]);

  // Called only after successful authentication.
  // Guest progress and bookmarks are never imported into an account.
  async function completeLogin() {
    localStorage.setItem(
      "saphub:last-activity",
      Date.now().toString()
    );

    localStorage.removeItem("saphub:session-logout");

    router.replace("/dashboard");
    router.refresh();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setMessage("");
    setSuccessMessage("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

      if (error) {
        if (
          error.message.toLowerCase().includes("email not confirmed")
        ) {
          throw new Error(
            "Please verify your email before logging in."
          );
        }

        throw error;
      }

      if (!data.user) {
        throw new Error(
          "Login failed. Please check your credentials and try again."
        );
      }

      if (!data.user.email_confirmed_at) {
        await supabase.auth.signOut();

        throw new Error(
          "Your email is not verified. Please check your inbox."
        );
      }

      await completeLogin();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(
    provider: "google" | "github"
  ) {
    if (oauthLoading || loading) return;

    setMessage("");
    setSuccessMessage("");
    setOauthLoading(provider);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Social sign-in failed."
      );

      setOauthLoading("");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -left-48 top-0 h-[550px] w-[550px] rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1450px] flex-col px-5 py-5 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <span className="text-3xl font-black tracking-tight">
              SAP<span className="text-cyan-400">Hub</span>
            </span>
          </Link>

          <Link
            href="/register"
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
          >
            Create account
          </Link>
        </header>

        {/* Main content */}
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Left section */}
          <section className="hidden max-w-xl lg:block">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-bold tracking-widest text-cyan-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              YOUR SAP LEARNING SPACE
            </div>

            <h1 className="text-5xl font-black leading-[1.15] tracking-tight xl:text-6xl">
              Learn today.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Build tomorrow.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">
              Discover SAP technologies, strengthen your technical
              knowledge and prepare for your next career opportunity.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                {
                  icon: "01",
                  title: "Structured learning",
                  description: "Learn SAP ABAP and HANA step by step.",
                },
                {
                  icon: "02",
                  title: "Interactive practice",
                  description: "Test your skills with quizzes and exercises.",
                },
                {
                  icon: "03",
                  title: "Interview preparation",
                  description: "Prepare with practical interview questions.",
                },
                {
                  icon: "04",
                  title: "Track your growth",
                  description: "Keep track of your learning progress.",
                },
              ].map((item) => (
                <div
                  key={item.icon}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <span className="text-sm font-black text-cyan-400">
                    {item.icon}
                  </span>

                  <h3 className="mt-4 text-sm font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-xs tracking-[0.3em] text-slate-600">
              LEARN. CONNECT. GROW.
            </p>
          </section>

          {/* Right section — Login */}
          <section className="mx-auto w-full max-w-[460px]">
            <div className="rounded-[28px] border border-white/10 bg-[#111827]/90 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10">
              <div className="mb-8">
                <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-cyan-300">
                  MEMBER ACCESS
                </div>

                <h2 className="text-3xl font-black tracking-tight">
                  Log into SAPHub<span className="text-cyan-400">.</span>
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Continue your learning journey.
                </p>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  className="h-[64px] w-full rounded-2xl border border-slate-600 bg-[#0b1424] px-5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-slate-300"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    className="h-[64px] w-full rounded-2xl border border-slate-600 bg-[#0b1424] px-5 pr-16 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-slate-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-cyan-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading || !!oauthLoading}
                  className="h-[56px] w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Please wait..." : "Log in"}
                </button>
              </form>

              {/* Error message */}
              {message && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  {message}
                </div>
              )}

              {/* Success message */}
              {successMessage && (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-green-400/20 bg-green-500/10 p-3 text-sm text-green-300"
                >
                  {successMessage}
                </div>
              )}

              {/* OR divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-700" />

                <span className="text-[10px] font-bold tracking-widest text-slate-500">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-700" />
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                disabled={!!oauthLoading || loading}
                className="flex h-[56px] w-full items-center justify-center gap-3 rounded-full border border-slate-700 bg-[#0b1424] text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
              >
                <svg viewBox="0 0 48 48" className="h-5 w-5">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.8 17.7 9.5 24 9.5Z"
                    transform="translate(0 4)"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24.5c0-1.6-.2-3.2-.5-4.7H24v9h12.6c-.6 2.9-2.3 5.4-4.8 7.1l7.4 5.7c4.6-4.3 7.3-10.3 7.3-17.1Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.5 0 12-2.1 16-5.7l-7.4-5.7c-2.1 1.4-4.9 2.2-8.6 2.2-6.3 0-11.7-4.3-13.6-10.1l-7.8 6.1C6.5 42.6 14.6 48 24 48Z"
                  />
                </svg>

                {oauthLoading === "google"
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>

              {/* GitHub login */}
              <button
                type="button"
                onClick={() => handleOAuth("github")}
                disabled={!!oauthLoading || loading}
                className="mt-3 flex h-[56px] w-full items-center justify-center gap-3 rounded-full border border-slate-700 bg-[#0b1424] text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.75 2.08 3.85 1.48.1-.74.4-1.25.7-1.54-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.13-1.44 3.08-1.14 3.08-1.14.61 1.53.23 2.67.11 2.95.72.78 1.16 1.77 1.16 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.06c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
                </svg>

                {oauthLoading === "github"
                  ? "Connecting..."
                  : "Continue with GitHub"}
              </button>

              {/* Create account */}
              <div className="mt-8 rounded-full border border-cyan-500 px-5 py-4 text-center">
                <Link
                  href="/register"
                  className="text-sm font-bold text-cyan-400 hover:text-cyan-300"
                >
                  Create new account
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] tracking-wide text-slate-600">
              SECURE ACCESS · LEARN. CONNECT. GROW.
            </p>
          </section>
        </div>

        <footer className="py-4 text-center text-xs text-slate-600">
          © 2026 SAPHub. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#070B16] text-white">
          <p>Loading login page...</p>
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
