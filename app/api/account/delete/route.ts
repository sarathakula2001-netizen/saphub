
import { NextResponse } from "next/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.confirmation !== "DELETE") {
      return NextResponse.json(
        { error: "Account deletion confirmation is required." },
        { status: 400 }
      );
    }

    // Verify the current signed-in user using the server session.
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Your session has expired. Please sign in again." },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Supabase Admin environment variables are missing.");

      return NextResponse.json(
        { error: "Account deletion is not configured on the server." },
        { status: 500 }
      );
    }

    // Admin credentials are used only on the server.
    const admin = createSupabaseAdmin(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { error: deleteError } =
      await admin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error("Supabase account deletion failed:", deleteError);

      return NextResponse.json(
        { error: "Unable to delete your account. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your account has been deleted.",
    });
  } catch (error) {
    console.error("Account deletion API error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
