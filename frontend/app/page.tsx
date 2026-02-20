import Link from "next/link";
import { roleFeatures } from "@/lib/data";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <section className="mx-auto max-w-6xl py-20 text-center">
        <p className="mb-4 inline-flex rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-700">AI-powered Agri Marketplace</p>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">AgriLink</h1>
        <p className="mx-auto mt-5 max-w-2xl text-slate-600">
          Connect farmers, buyers, and storage providers in one trusted platform with live market intelligence, logistics, and AI insights.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/marketplace" className="rounded-md bg-brand px-5 py-3 text-white">Explore Marketplace</Link>
          <Link href="/dashboard/Farmer" className="rounded-md border border-slate-300 bg-white px-5 py-3">Open Demo Dashboard</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {Object.entries(roleFeatures).map(([role, items]) => (
          <div key={role} className="card">
            <h2 className="text-lg font-semibold">{role}</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
