
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "password" | "otp" | "reset" | "success";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      setEmail(data.user.email || "");
    }

    void loadUser();
  }, [router]);

  function validateNewPassword() {
    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return false;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setError("Include at least one uppercase letter.");
      return false;
    }

    if (!/[a-z]/.test(newPassword)) {
      setError("Include at least one lowercase letter.");
      return false;
    }

    if (!/[0-9]/.test(newPassword)) {
      setError("Include at least one number.");
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setError("Include at least one special character.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return false;
    }

    return true;
  }

  async function sendRecoveryCode() {
    if (!email) {
      setError("Your registered email could not be found.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const supabase = createClient();

      const { error: recoveryError } =
        await supabase.auth.resetPasswordForEmail(email);

      if (recoveryError) throw recoveryError;

      setMode("otp");
      setMessage(`A verification code has been sent to ${email}.`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send the verification code."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCurrentPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password: currentPassword,
        });

      if (loginError) {
        if (
          loginError.message.toLowerCase().includes("invalid login credentials")
        ) {
          setCurrentPassword("");
          await sendRecoveryCode();
          return;
        }

        throw loginError;
      }

      setMode("reset");
      setMessage("Current password verified. You can set a new password.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify your current password."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{8}$/.test(otp)) {
      setError("Enter the 8-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "recovery",
      });

      if (verifyError) throw verifyError;

      setMode("reset");
      setOtp("");
      setMessage("Email verified successfully. Set your new password.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid or expired verification code."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!validateNewPassword()) return;

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      setMode("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your password."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 text-sm text-white outline-none transition focus:border-cyan-400";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070b16] px-5 py-10 text-white">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] p-7 shadow-2xl sm:p-9">
        <Link
          href="/profile"
          className="text-sm text-slate-400 transition hover:text-cyan-300"
        >
          ← Back to profile
        </Link>

        <div className="mt-7">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-2xl">
            🔐
          </div>

          <h1 className="text-2xl font-black">
            Change Password<span className="text-cyan-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Secure your SAPHub account with a strong password.
          </p>
        </div>

        <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-slate-500">Registered email</p>
          <p className="mt-1 break-all text-sm font-medium text-white">
            {email || "Loading..."}
          </p>
        </div>

        {message && (
          <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            {message}
          </div>
        )}

        {error && (
          <div role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {mode === "password" && (
          <form onSubmit={handleCurrentPassword} className="mt-7 space-y-5">
            <div>
              <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-slate-300">
                Current password
              </label>
              <input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass}
                placeholder="Enter current password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify current password"}
            </button>

            <button
              type="button"
              onClick={sendRecoveryCode}
              disabled={loading || !email}
              className="w-full text-sm font-medium text-cyan-300 hover:text-cyan-200 disabled:opacity-50"
            >
              Forgot current password? Send email code
            </button>
          </form>
        )}

        {mode === "otp" && (
          <form onSubmit={handleVerifyOtp} className="mt-7 space-y-5">
            <div>
              <label htmlFor="otp" className="mb-2 block text-sm font-medium text-slate-300">
                8-digit email verification code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={8}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
                className={inputClass}
                placeholder="Enter verification code"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 8}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify email code"}
            </button>

            <button
              type="button"
              onClick={sendRecoveryCode}
              disabled={loading}
              className="w-full text-sm text-cyan-300 hover:text-cyan-200 disabled:opacity-50"
            >
              Resend verification code
            </button>
          </form>
        )}

        {mode === "reset" && (
          <form onSubmit={handleUpdatePassword} className="mt-7 space-y-5">
            <div>
              <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-slate-300">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                placeholder="Enter new password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-300">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-6 text-slate-400">
              Your password must contain:
              <ul className="mt-1 list-inside list-disc">
                <li>At least 8 characters</li>
                <li>One uppercase and one lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Updating password..." : "Update password"}
            </button>
          </form>
        )}

        {mode === "success" && (
          <div className="mt-7 space-y-5">
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-5 text-center">
              <div className="text-4xl">✓</div>
              <h2 className="mt-3 text-lg font-bold text-emerald-300">
                Password updated!
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Your SAPHub password has been changed successfully.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.replace("/profile")}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
            >
              Return to profile
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
