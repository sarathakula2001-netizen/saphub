
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SupabaseTestPage() {
  const [status, setStatus] = useState("Testing connection...");

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();

        const { error } = await supabase
          .from("connection_test")
          .select("*")
          .limit(1);

        if (error && error.code !== "42P01" && error.code !== "PGRST205") {
          setStatus(`Connection error: ${error.message}`);
          return;
        }

        setStatus("Supabase connection successful!");
      } catch {
        setStatus("Unable to connect. Check your configuration.");
      }
    }

    testConnection();
  }, []);

  return (
    <main className="min-h-screen bg-[#070b16] flex items-center justify-center p-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">SAPHub Connection Test</h1>
        <p className="mt-4 text-gray-300">{status}</p>
      </div>
    </main>
  );
}
