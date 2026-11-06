
"use client";

import { useMemo, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { registerUser } from "@/features/auth/services/register";
import { syncLearningData } from "@/lib/learning-sync";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const mobile = String(formData.get("mobile") || "").trim();

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      setMessageType("error");
      return;
    }

    if (passwordStrength < 3) {
      setMessage("Please create a stronger password.");
      setMessageType("error");
      return;
    }

    if (!acceptedTerms) {
      setMessage("Please accept the Terms and Privacy Policy.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        fullName,
        email,
        mobile,
        password,
      });

      if (data.session) {
        // Synchronize guest data when registration creates a session
        try {
          await syncLearningData();
        } catch (syncError) {
          console.error("Registration data sync failed:", syncError);
        }

        setMessage(
          "Your account has been created successfully! Your learning data has been synchronized where possible."
        );
      } else {
        setMessage(
          "Registration successful! Please check your email and click the confirmation link to activate your SAPHub account. Your guest learning data will synchronize after confirmation."
        );
      }

      setMessageType("success");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account."
      subtitle="Join SAPHub and start building your technology skills."
      footerText="Already a member?"
      footerLink="/login"
      footerLabel="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Full name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            required
            minLength={2}
            autoComplete="name"
            className="w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Email address
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Mobile number
          </label>

          <input
            type="tel"
            name="mobile"
            placeholder="10-digit mobile number"
            required
            pattern="[0-9]{10}"
            maxLength={10}
            autoComplete="tel-national"
            title="Enter a valid 10-digit mobile number"
            className="w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400 hover:text-cyan-300"
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

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Confirm password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-700 bg-[#0a1424] px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400 hover:text-cyan-300"
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

        <label className="flex cursor-pointer items-start gap-3 py-2 text-xs leading-6 text-slate-400">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1 h-4 w-4 accent-blue-500"
          />

          <span>
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create SAPHub Account →"}
        </button>
      </form>
    </AuthLayout>
  );
}
