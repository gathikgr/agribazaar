"use client";

import { useTranslation } from "react-i18next";

import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";

export default function StorageProviderDashboard() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <Header titleKey="storageProvider" />
      <Card><h3 className="font-semibold">{t("bookings")}</h3></Card>
      <Card><h3 className="font-semibold">{t("earnings")}</h3></Card>
    </section>
  );
}
