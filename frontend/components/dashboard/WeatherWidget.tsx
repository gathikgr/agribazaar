"use client";

import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/Card";

export function WeatherWidget() {
  const { t } = useTranslation();
  return (
    <Card>
      <h3 className="text-sm font-semibold">{t("weather")}</h3>
      <p className="mt-2 text-slate-600">28°C · Humidity 62% · Wind 11 km/h</p>
    </Card>
  );
}
