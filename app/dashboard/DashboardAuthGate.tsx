import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ReactNode } from "react";

export default async function DashboardAuthGate({
  children,
}: {
  children: ReactNode;
}) {
  // Start request-time rendering inside the Suspense boundary
  await connection();

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <>{children}</>;
}
