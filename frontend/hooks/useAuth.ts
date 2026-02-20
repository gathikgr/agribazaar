"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  return { userId };
}
