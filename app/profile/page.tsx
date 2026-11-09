
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  mobile_number: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
};

const PROFILE_COLUMNS =
  "id, full_name, email, mobile_number, avatar_url, bio, location, website, created_at";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarDisplayUrl, setAvatarDisplayUrl] = useState("");

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function getAvatarUrl(path: string | null) {
    if (!path) return "";

    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(path, 60 * 60);

    if (error) {
      console.error("Avatar URL error:", error);
      return "";
    }

    return data.signedUrl;
  }

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const supabase = createClient();

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace("/login");
          return;
        }

        const { data, error: profileError } = await supabase
          .from("profiles")
          .select(PROFILE_COLUMNS)
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;
        if (!active) return;

        const loadedProfile: Profile = {
          ...data,
          full_name:
            data.full_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "",
          email: user.email || data.email || "",
        };

        setProfile(loadedProfile);
        setFullName(loadedProfile.full_name || "");
        setBio(loadedProfile.bio || "");
        setLocation(loadedProfile.location || "");
        setWebsite(loadedProfile.website || "");

        const signedUrl = await getAvatarUrl(loadedProfile.avatar_url);

        if (active) setAvatarDisplayUrl(signedUrl);
      } catch (err) {
        console.error("Profile loading failed:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your profile."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleAvatarUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !profile) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your image must be smaller than 5 MB.");
      return;
    }

    setUploading(true);

    let uploadedPath = "";

    try {
      const supabase = createClient();

      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      uploadedPath = `${profile.id}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(uploadedPath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: uploadedPath,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (updateError) {
        await supabase.storage.from("avatars").remove([uploadedPath]);
        throw updateError;
      }

      const signedUrl = await getAvatarUrl(uploadedPath);

      setProfile({ ...profile, avatar_url: uploadedPath });
      setAvatarDisplayUrl(signedUrl);
      setMessage("Your profile picture has been uploaded successfully.");
    } catch (err) {
      console.error("Avatar upload failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload your profile picture."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleRemoveAvatar() {
    if (!profile?.avatar_url) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove your profile picture?"
    );

    if (!confirmed) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const supabase = createClient();
      const oldPath = profile.avatar_url;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([oldPath]);

      if (deleteError) {
        console.error("Old avatar cleanup failed:", deleteError);
      }

      setProfile({ ...profile, avatar_url: null });
      setAvatarDisplayUrl("");
      setMessage("Your profile picture has been removed.");
    } catch (err) {
      console.error("Avatar removal failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove your profile picture."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile) return;

    setError("");
    setMessage("");

    const trimmedName = fullName.trim();
    const trimmedBio = bio.trim();
    const trimmedLocation = location.trim();
    const trimmedWebsite = website.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (
      trimmedWebsite &&
      !/^https?:\/\/.+/i.test(trimmedWebsite)
    ) {
      setError(
        "Please enter a valid website URL starting with https:// or http://."
      );
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();

      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: trimmedName,
          bio: trimmedBio || null,
          location: trimmedLocation || null,
          website: trimmedWebsite || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)
        .select(PROFILE_COLUMNS)
        .single();

      if (updateError) throw updateError;

      setProfile(data);
      setFullName(data.full_name || "");
      setBio(data.bio || "");
      setLocation(data.location || "");
      setWebsite(data.website || "");

      setEditing(false);
      setMessage("Your profile has been updated successfully.");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  function cancelEditing() {
    if (!profile) return;

    setFullName(profile.full_name || "");
    setBio(profile.bio || "");
    setLocation(profile.location || "");
    setWebsite(profile.website || "");
    setEditing(false);
    setError("");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b16] text-white">
        <p className="text-sm text-slate-400">Loading your profile...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b16] px-5 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-center">
          <h1 className="text-xl font-bold">Profile unavailable</h1>
          <p className="mt-3 text-sm text-slate-400">
            {error || "We couldn't find your profile."}
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  const initials = (profile.full_name || profile.email || "S")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const accountCreated = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <main className="min-h-screen bg-[#070b16] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
            >
              ← Back to dashboard
            </Link>

            <h1 className="text-3xl font-black tracking-tight">
              My Profile<span className="text-cyan-400">.</span>
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage your SAPHub student information.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setError("");
                setEditing(true);
              }}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
          <div className="h-32 bg-gradient-to-r from-blue-700/60 via-cyan-600/30 to-violet-700/50" />

          <div className="px-6 pb-7 sm:px-9">
            <div className="-mt-12 flex flex-wrap items-end gap-5">
              {avatarDisplayUrl ? (
                <img
                  src={avatarDisplayUrl}
                  alt="Your profile picture"
                  className="h-28 w-28 rounded-2xl border-4 border-[#111827] object-cover shadow-xl"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-[#111827] bg-gradient-to-br from-blue-600 to-cyan-500 text-3xl font-black text-white shadow-xl">
                  {initials}
                </div>
              )}

              <div className="pb-1">
                <h2 className="text-2xl font-bold">
                  {profile.full_name || "SAPHub Student"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleAvatarUpload}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
              >
                {uploading
                  ? "Please wait..."
                  : avatarDisplayUrl
                    ? "📷 Change picture"
                    : "📷 Upload picture"}
              </button>

              {avatarDisplayUrl && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={uploading}
                  className="rounded-xl border border-red-400/30 px-5 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  Remove picture
                </button>
              )}

              <p className="w-full text-xs text-slate-500">
                PNG, JPG or WEBP · Maximum file size: 5 MB
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Account created
                </p>
                <p className="mt-3 font-semibold">{accountCreated}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Account email
                </p>
                <p className="mt-3 break-all font-semibold">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-9">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Personal information</h2>
              <p className="mt-2 text-sm text-slate-400">
                Your student details and introduction.
              </p>
            </div>

            {!editing && (
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setError("");
                  setEditing(true);
                }}
                className="rounded-lg border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
              >
                ✏️ Edit details
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                disabled={!editing || saving}
                required
                maxLength={100}
                className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 text-sm text-white outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={profile.email || ""}
                disabled
                className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 text-sm text-slate-400"
              />
              <p className="mt-2 text-xs text-slate-500">
                Your login email is managed by Supabase authentication.
              </p>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                About me
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                disabled={!editing || saving}
                rows={4}
                maxLength={500}
                placeholder="Tell us a little about yourself..."
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0b1424] p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
              />
              {editing && (
                <p className="mt-1 text-right text-xs text-slate-500">
                  {bio.length}/500
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  disabled={!editing || saving}
                  maxLength={100}
                  placeholder="City, Country"
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Website / Portfolio
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  disabled={!editing || saving}
                  placeholder="https://example.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </div>

            {editing && (
              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving changes..." : "Save changes"}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={cancelEditing}
                  className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-2">
          <Link
            href="/change-password"
            className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-cyan-400/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-cyan-300">
                🔐
              </span>
              <div>
                <h3 className="font-semibold">Change password</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Manage your login password.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/account-settings"
            className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-cyan-400/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-xl text-violet-300">
                ⚙️
              </span>
              <div>
                <h3 className="font-semibold">Account settings</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Manage your account preferences.
                </p>
              </div>
            </div>
          </Link>
        </section>

        <footer className="py-8 text-center text-xs text-slate-600">
          SAPHub · Learn. Connect. Grow.
        </footer>
      </div>
    </main>
  );
}
