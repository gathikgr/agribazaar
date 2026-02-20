"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

export function useUserRole(userId: string | null) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    supabase.from("users").select("role").eq("id", userId).single().then(({ data }) => setRole(data?.role ?? null));
  }, [userId]);

  return role;
}
