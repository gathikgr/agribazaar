"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const items = [
  ["/dashboard/farmer", "farmer"],
  ["/dashboard/buyer", "buyer"],
  ["/dashboard/transporter", "transporter"],
  ["/dashboard/storage-provider", "storageProvider"],
  ["/dashboard/admin", "admin"]
] as const;

export function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="w-64 border-r bg-white p-5">
      <h2 className="mb-6 text-2xl font-bold text-emerald-700">{t("appName")}</h2>
      <nav className="space-y-2">
        {items.map(([href, key]) => (
          <Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-slate-100">
            {t(key)}
          </Link>
        ))}
      </nav>
      <Link href="/language" className="mt-4 block rounded px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50">
        {t("language")}
      </Link>
    </aside>
  );
}
