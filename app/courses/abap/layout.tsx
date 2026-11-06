
import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import LessonProgressButton from "@/components/layout/LessonProgressButton";

export default function ABAPLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080e1c] lg:flex">
      {/* Shared persistent SAPHub navigation */}
      <DashboardSidebar />

      {/* Course and lesson content */}
      <div className="min-w-0 flex-1">
        {children}

        {/* Lesson completion button */}
        <LessonProgressButton />
      </div>
    </div>
  );
}
