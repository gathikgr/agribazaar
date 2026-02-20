import { Sidebar } from "@/components/Sidebar";
import { listings } from "@/lib/data";

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 space-y-6 p-8">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <div className="card grid gap-2 text-sm md:grid-cols-5">
          <input className="rounded border border-slate-300 p-2" placeholder="Crop Type" />
          <input className="rounded border border-slate-300 p-2" placeholder="Location" />
          <input className="rounded border border-slate-300 p-2" placeholder="Min Price" />
          <input className="rounded border border-slate-300 p-2" placeholder="Quality Grade" />
          <input className="rounded border border-slate-300 p-2" placeholder="Min Trust Score" />
        </div>

        <section className="grid gap-4 lg:grid-cols-2">
          {listings.map((listing) => (
            <article key={listing.id} className="card space-y-2">
              <h2 className="text-lg font-semibold">{listing.crop}</h2>
              <p className="text-sm text-slate-600">Location: {listing.location} · Quality: {listing.quality}</p>
              <p className="text-sm text-slate-600">Trust Score: {listing.trust}</p>
              <p className="text-xl font-bold text-brand">₹{listing.price}/ton</p>
              <div className="flex gap-2">
                <button className="rounded bg-brand px-3 py-2 text-xs text-white">Request Sample</button>
                <button className="rounded border border-slate-300 px-3 py-2 text-xs">Place Bid</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
