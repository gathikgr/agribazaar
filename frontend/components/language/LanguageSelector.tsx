"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { LanguageCard } from "@/components/language/LanguageCard";
import { useLanguage } from "@/components/language/useLanguage";

export function LanguageSelector() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setLanguage } = useLanguage();

  const choose = async (code: "en" | "hi" | "te") => {
    await setLanguage(code);
    router.push("/auth/login");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-100 to-white p-10">
      <div className="mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-bold text-slate-900">{t("selectLanguage")}</h1>
        <div className="flex flex-wrap justify-center gap-10">
          <LanguageCard greeting={t("hello")} languageName={t("english")} code="en" onSelect={choose} />
          <LanguageCard greeting={t("namaste")} languageName={t("hindi")} code="hi" onSelect={choose} />
          <LanguageCard greeting={t("namaskaram")} languageName={t("telugu")} code="te" onSelect={choose} />
        </div>
      </div>
    </section>
  );
}
