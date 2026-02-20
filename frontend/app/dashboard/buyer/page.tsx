"use client";

import { useTranslation } from "react-i18next";

import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";

export default function BuyerDashboard() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <Header titleKey="buyer" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card><h3 className="font-semibold">{t("marketTrends")}</h3></Card>
        <Card><h3 className="font-semibold">{t("orders")}</h3></Card>
        <Card><h3 className="font-semibold">{t("requestSample")}</h3></Card>
      </div>
    </section>
  );
}
