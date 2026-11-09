
"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { createClient } from "@/lib/supabase/client";

const OTP_LENGTH = 8;

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "error"
  );

  const trimmedEmail = email.trim().toLowerCase();

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  const strengthLabels = [
    "Enter a password",
    "Weak",
    "Fair",
    "Good",
    "Strong",
  ];

  const strengthColors = [
    "bg-slate-700",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-emerald-500",
  ];

  function resetRegistration() {
    setOtpSent(false);
    setOtp("");
    setMessage("");
    setMessageType("error");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (loading) return;

    const supabase = createClient();

    try {
      setLoading(true);

      // STEP 1: REGISTER AND SEND EMAIL OTP
      if (!otpSent) {
        if (fullName.trim().length < 2) {
          throw new Error("Please enter your full name.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
          throw new Error("Please enter a valid email address.");
        }

        if (password !== confirmPassword) {
          throw new Error("Your passwords do not match.");
        }

        if (passwordStrength < 3) {
          throw new Error("Please create a stronger password.");
        }

        if (!acceptedTerms) {
          throw new Error(
            "Please accept the Terms of Service and Privacy Policy."
          );
        }

        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) throw error;

        if (
          data.user &&
          Array.isArray(data.user.identities) &&
          data.user.identities.length === 0
        ) {
          throw new Error(
            "This email may already be registered. Please log in or use Forgot Password."
          );
        }

        // With email confirmation enabled, signup should not
        // leave the user logged in before OTP verification.
        if (data.session) {
          await supabase.auth.signOut();
        }

        setOtpSent(true);
        setOtp("");
        setPassword("");
        setConfirmPassword("");

        setMessage(
          "If this is a new registration, check your email for the verification code."
        );
        setMessageType("success");

        return;
      }

      // STEP 2: VERIFY THE 8-DIGIT EMAIL OTP
      if (!new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp)) {
        throw new Error(`Please enter the ${OTP_LENGTH}-digit verification code.`);
      }

      const { data, error } = await supabase.auth.verifyOtp({
        email: trimmedEmail,
        token: otp,
        type: "signup",
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error(
          "Verification could not be completed. Please request a new code."
        );
      }

      // Registration verification must not automatically log in.
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      router.replace("/login?verified=1");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function resendOtp() {
    if (resending || loading) return;

    setMessage("");

    try {
      setResending(true);

      const supabase = createClient();

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: trimmedEmail,
      });

      if (error) throw error;

      setOtp("");
      setMessage("A new verification code has been requested. Check your inbox.");
      setMessageType("success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to resend the verification code. Please try again."
      );
      setMessageType("error");
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account."
      subtitle="Join SAPHub and start building your technology skills."
      footerText="Already a member?"
      footerLink="/login"
      footerLabel="Log in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!otpSent && (
          <>
            {/* FULL NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Full name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                required
                minLength={2}
                autoComplete="name"
                className="h-[56px] w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </>
        )}

        {/* EMAIL ADDRESS */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Email address
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (otpSent) resetRegistration();
            }}
            placeholder="Enter your email address"
            required
            disabled={otpSent}
            autoComplete="email"
            className="h-[56px] w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 disabled:opacity-60"
          />
        </div>

        {/* PASSWORD FIELDS */}
        {!otpSent && (
          <>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="h-[56px] w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 pr-16 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-cyan-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="mt-3">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        passwordStrength >= level
                          ? strengthColors[passwordStrength]
                          : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Password strength:{" "}
                  <span className="font-semibold text-slate-300">
                    {strengthLabels[passwordStrength]}
                  </span>
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Use 8+ characters, uppercase letters, numbers and symbols.
                </p>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Confirm password
              </label>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Re-enter your password"
                  required
                  autoComplete="new-password"
                  className="h-[56px] w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 pr-16 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-cyan-400"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>

              {confirmPassword && (
                <p
                  className={`mt-2 text-xs ${
                    password === confirmPassword
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* TERMS */}
            <label className="flex cursor-pointer items-start gap-3 py-2 text-xs leading-6 text-slate-400">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) =>
                  setAcceptedTerms(event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-cyan-500"
              />

              <span>
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </label>
          </>
        )}

        {/* EMAIL OTP */}
        {otpSent && (
          <>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5">
              <h3 className="font-bold text-cyan-300">
                Verify your email address
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter the 8-digit code sent to your email address.
              </p>
            </div>

            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={OTP_LENGTH}
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
              }
              placeholder="Enter 8-digit verification code"
              autoComplete="one-time-code"
              required
              className="h-[76px] w-full rounded-xl border border-cyan-400 bg-[#0a1424] px-4 text-center text-2xl font-bold tracking-[0.5em] text-white outline-none focus:border-cyan-300"
            />

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={resetRegistration}
                className="font-semibold text-slate-400 transition hover:text-white"
              >
                Change email
              </button>

              <button
                type="button"
                onClick={resendOtp}
                disabled={resending || loading}
                className="font-semibold text-cyan-400 transition hover:text-cyan-300 disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </>
        )}

        {/* MESSAGE */}
        {message && (
          <div
            role="status"
            className={`rounded-xl border p-3 text-sm leading-6 ${
              messageType === "success"
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                : "border-red-400/20 bg-red-500/10 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={
            loading ||
            (otpSent && otp.length !== OTP_LENGTH)
          }
          className="h-[56px] w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : otpSent
              ? "Verify Email & Continue"
              : "Create SAPHub Account"}
        </button>
      </form>
    </AuthLayout>
  );
}
