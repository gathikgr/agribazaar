"use client";

import { useTranslation } from "react-i18next";

import { useLanguage } from "@/components/language/useLanguage";

export function Header({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="flex items-center justify-between rounded-xl bg-white p-4 shadow ring-1 ring-slate-200">
      <h1 className="text-2xl font-semibold">{t(titleKey)}</h1>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "te")}
        className="rounded border border-slate-300 px-3 py-2"
      >
        <option value="en">{t("english")}</option>
        <option value="hi">{t("hindi")}</option>
        <option value="te">{t("telugu")}</option>
      </select>
    </header>
  );
}
