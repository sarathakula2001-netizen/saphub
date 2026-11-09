
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
      // Notify other tabs that this session has expired.
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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let loggingOut = false;
    let authenticated = false;
    let lastActivityWrite = 0;

    function clearTimer() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    }

    function scheduleLogout() {
      clearTimer();

      if (!authenticated || loggingOut) return;

      let lastActivity = Number(
        localStorage.getItem(ACTIVITY_KEY) || 0
      );

      if (!lastActivity || !Number.isFinite(lastActivity)) {
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
      if (!authenticated || loggingOut) return;

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
        authenticated = false;
        clearTimer();

        router.replace("/login?reason=session_expired");
        router.refresh();
        return;
      }

      if (event.key === ACTIVITY_KEY && authenticated) {
        scheduleLogout();
      }
    }

    // Listen for Supabase authentication state.
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        authenticated = true;

        // Start/resume the timer only for an authenticated user.
        scheduleLogout();
      } else if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_OUT"
      ) {
        authenticated = false;
        clearTimer();
      }
    });

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
      authenticated = false;
      clearTimer();

      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, recordActivity);
      });

      window.removeEventListener("storage", handleStorage);

      subscription.unsubscribe();
    };
  }, [logout, router]);

  return null;
}
