
import { Suspense } from "react";
import type { ReactNode } from "react";
import DashboardAuthGate from "./DashboardAuthGate";
import SessionTimeout from "./SessionTimeout";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#070b16] text-white">
          <p>Verifying your SAPHub account...</p>
        </main>
      }
    >
      <DashboardAuthGate>
        <SessionTimeout />
        {children}
      </DashboardAuthGate>
    </Suspense>
  );
}
