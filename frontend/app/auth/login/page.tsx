"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">{t("login")}</h1>
      <label className="mb-2 block text-sm">{t("email")}</label>
      <Input type="email" className="mb-4" />
      <label className="mb-2 block text-sm">{t("password")}</label>
      <Input type="password" className="mb-6" />
      <Button className="w-full">{t("login")}</Button>
      <Link href="/auth/signup" className="mt-4 block text-center text-sm text-emerald-700">
        {t("signup")}
      </Link>
    </main>
  );
}
