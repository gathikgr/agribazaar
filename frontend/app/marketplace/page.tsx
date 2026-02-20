"use client";

import { useTranslation } from "react-i18next";

import { Sidebar } from "@/components/dashboard/Sidebar";

export default function MarketplacePage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">{t("marketTrends")}</h1>
      </main>
    </div>
  );
}
