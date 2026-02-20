"use client";

import { useTranslation } from "react-i18next";

import { Header } from "@/components/dashboard/Header";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { Card } from "@/components/ui/Card";

export default function FarmerDashboard() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <Header titleKey="farmer" />
      <div className="grid gap-4 md:grid-cols-4">
        <Card><p>{t("daysToHarvest")}</p><p className="text-2xl font-bold">26</p></Card>
        <Card><p>{t("mandiPrice")}</p><p className="text-2xl font-bold">₹2,210</p></Card>
        <Card><p>{t("platformPrice")}</p><p className="text-2xl font-bold">₹2,340</p></Card>
        <Card><p>{t("profitEstimate")}</p><p className="text-2xl font-bold text-emerald-600">₹1,42,000</p></Card>
      </div>
      <PriceChart />
      <div className="grid gap-4 md:grid-cols-2">
        <WeatherWidget />
        <Card><h3 className="font-semibold">{t("storageDecision")}</h3><p className="mt-2 text-slate-600">{t("store")}</p></Card>
      </div>
    </section>
  );
}
