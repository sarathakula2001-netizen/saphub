
import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  mobile_number: string | null;
  mobile_verified: boolean;
  created_at: string;
  updated_at: string;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as UserProfile;
}
