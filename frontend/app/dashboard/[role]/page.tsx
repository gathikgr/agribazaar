import { Sidebar } from "@/components/Sidebar";
import { DashboardCharts } from "@/components/DashboardCharts";

const cardsByRole: Record<string, string[]> = {
  Farmer: ["Crop Listings", "Yield Analytics", "Profit Estimator", "Storage Requests", "Transport Availability", "Orders"],
  Buyer: ["Market Projections", "Price Trends", "Yield Projections", "Quality Scores", "Sample Requests", "Bidding Options"],
  "Storage Provider": ["Storage Capacity", "Pricing", "Supported Crops", "Availability", "Storage Bids"]
};

export default function DashboardPage({ params }: { params: { role: string } }) {
  const role = decodeURIComponent(params.role);
  const cards = cardsByRole[role] || cardsByRole.Farmer;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold">{role} Dashboard</h1>
          <p className="text-sm text-slate-500">AI insights, operations, and marketplace intelligence in one view.</p>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((item) => (
            <article key={item} className="card">
              <h2 className="text-sm font-semibold">{item}</h2>
              <p className="mt-2 text-xs text-slate-600">Dummy data enabled for local-first demo with Supabase-ready workflows.</p>
            </article>
          ))}
        </section>

        <DashboardCharts />
        <section className="card">
          <h3 className="text-sm font-semibold">Google Maps Location View (placeholder)</h3>
          <div className="mt-3 rounded-lg border border-dashed border-slate-300 p-8 text-sm text-slate-500">
            Integrate Google Maps API key in NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to render farm and storage locations.
          </div>
        </section>
      </main>
    </div>
  );
}
