
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "/dashboard";

  // Allow only safe, internal redirect paths.
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";

  const loginUrl = new URL("/login", origin);

  if (!code) {
    loginUrl.searchParams.set("error", "verification_failed");
    return NextResponse.redirect(loginUrl);
  }

  const supabase = await createClient();

  // Exchange the authorization code for a session.
  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    loginUrl.searchParams.set("error", "verification_failed");
    return NextResponse.redirect(loginUrl);
  }

  // Get the authenticated user.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut();

    loginUrl.searchParams.set("error", "verification_failed");
    return NextResponse.redirect(loginUrl);
  }

  // Reject an email account if its email is not verified.
  if (user.email && !user.email_confirmed_at) {
    await supabase.auth.signOut();

    loginUrl.searchParams.set("error", "email_not_verified");
    return NextResponse.redirect(loginUrl);
  }

  // Reject a phone account if its phone number is not verified.
  if (user.phone && !user.phone_confirmed_at) {
    await supabase.auth.signOut();

    loginUrl.searchParams.set("error", "phone_not_verified");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(new URL(next, origin));
}
