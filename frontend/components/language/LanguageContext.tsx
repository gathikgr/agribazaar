"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import i18n from "@/lib/i18n";
import { supabase } from "@/lib/supabaseClient";

export type LanguageCode = "en" | "hi" | "te";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: profile } = await supabase.from("users").select("language").eq("id", data.user.id).single();
        const dbLang = (profile?.language as LanguageCode | undefined) ?? "en";
        setLanguageState(dbLang);
        localStorage.setItem("language", dbLang);
        await i18n.changeLanguage(dbLang);
        return;
      }
      const localLang = (localStorage.getItem("language") as LanguageCode | null) ?? "en";
      setLanguageState(localLang);
      await i18n.changeLanguage(localLang);
    };
    init();
  }, []);

  const setLanguage = async (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    await i18n.changeLanguage(lang);
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      await supabase.from("users").update({ language: lang }).eq("id", data.user.id);
    }
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within LanguageProvider");
  }
  return context;
};
