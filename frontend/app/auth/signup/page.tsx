"use client";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto mt-20 max-w-lg rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">{t("signup")}</h1>
      <label className="mb-2 block text-sm">{t("email")}</label>
      <Input type="email" className="mb-4" />
      <label className="mb-2 block text-sm">{t("password")}</label>
      <Input type="password" className="mb-4" />
      <label className="mb-2 block text-sm">{t("role")}</label>
      <select className="mb-6 w-full rounded-lg border border-slate-300 px-3 py-2">
        <option>{t("farmer")}</option>
        <option>{t("buyer")}</option>
        <option>{t("transporter")}</option>
        <option>{t("storageProvider")}</option>
      </select>
      <Button className="w-full">{t("signup")}</Button>
    </main>
  );
}
