
"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const INACTIVITY_LIMIT = 7 * 60 * 1000;

const ACTIVITY_KEY = "saphub:last-activity";
const LOGOUT_KEY = "saphub:session-logout";

export default function SessionTimeout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    const supabase = createClient();

    try {
      localStorage.setItem(LOGOUT_KEY, Date.now().toString());
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Automatic logout failed:", error);
    } finally {
      localStorage.removeItem(ACTIVITY_KEY);
      router.replace("/login?reason=session_expired");
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let loggingOut = false;
    let lastActivityWrite = 0;

    function scheduleLogout() {
      clearTimeout(timeoutId);

      if (loggingOut) return;

      let lastActivity = Number(
        localStorage.getItem(ACTIVITY_KEY) || 0
      );

      // If there is no saved activity timestamp,
      // start a fresh inactivity period.
      if (!lastActivity) {
        lastActivity = Date.now();
        localStorage.setItem(
          ACTIVITY_KEY,
          lastActivity.toString()
        );
      }

      const elapsed = Date.now() - lastActivity;
      const remaining = INACTIVITY_LIMIT - elapsed;

      if (remaining <= 0) {
        loggingOut = true;
        void logout();
        return;
      }

      timeoutId = setTimeout(() => {
        scheduleLogout();
      }, remaining);
    }

    function recordActivity() {
      if (loggingOut) return;

      const now = Date.now();

      if (now - lastActivityWrite >= 1000) {
        localStorage.setItem(ACTIVITY_KEY, now.toString());
        lastActivityWrite = now;
      }

      scheduleLogout();
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === LOGOUT_KEY && event.newValue) {
        loggingOut = true;
        clearTimeout(timeoutId);

        router.replace("/login?reason=session_expired");
        router.refresh();
        return;
      }

      if (event.key === ACTIVITY_KEY) {
        scheduleLogout();
      }
    }

    // Start or resume the inactivity timer.
    scheduleLogout();

    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, recordActivity, {
        passive: true,
      });
    });

    window.addEventListener("storage", handleStorage);

    return () => {
      clearTimeout(timeoutId);

      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, recordActivity);
      });

      window.removeEventListener("storage", handleStorage);
    };
  }, [logout, router]);

  return null;
}
