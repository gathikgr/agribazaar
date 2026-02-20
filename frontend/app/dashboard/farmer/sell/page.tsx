"use client";

import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/Card";

export default function FarmerSellPage() {
  const { t } = useTranslation();
  return <Card><h2 className="text-xl font-semibold">{t("sellNow")}</h2></Card>;
}
