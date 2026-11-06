
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ProtectedFeatureProps = {
  children: React.ReactNode;
  featureName?: string;
};

export default function ProtectedFeature({
  children,
  featureName = "this feature",
}: ProtectedFeatureProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function checkAuth() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !user) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }

      setLoading(false);
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setAuthenticated(!!session?.user);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#080e1c] text-slate-300">
        Checking your account...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#080e1c] px-5 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#101a2e] p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="mb-3 text-2xl font-bold text-white">
            Login Required
          </h1>

          <p className="mb-2 text-slate-300">
            You need to log in to access {featureName}.
          </p>

          <p className="mb-7 text-sm text-slate-500">
            Sign in to continue your SAPHub learning journey.
          </p>

          <button
            onClick={() =>
              router.push(
                `/login?next=${encodeURIComponent(window.location.pathname)}`
              )
            }
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Log in
          </button>

          <button
            onClick={() =>
              router.push(
                `/register?next=${encodeURIComponent(window.location.pathname)}`
              )
            }
            className="mt-3 w-full rounded-lg border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Create an account
          </button>

          <button
            onClick={() => router.push("/")}
            className="mt-5 text-sm text-slate-500 transition hover:text-white"
          >
            Back to homepage
          </button>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
