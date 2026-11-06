
import { createClient } from "@/lib/supabase/client";

interface RegisterInput {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export async function registerUser({
  fullName,
  email,
  mobile,
  password,
}: RegisterInput) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        full_name: fullName,
        mobile_number: mobile,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
