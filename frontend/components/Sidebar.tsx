import Link from "next/link";

const links = [
  { href: "/dashboard/Farmer", label: "Farmer Dashboard" },
  { href: "/dashboard/Buyer", label: "Buyer Dashboard" },
  { href: "/dashboard/Storage%20Provider", label: "Storage Dashboard" },
  { href: "/marketplace", label: "Marketplace" }
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-5">
      <h2 className="mb-6 text-xl font-semibold text-brand">AgriLink</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
