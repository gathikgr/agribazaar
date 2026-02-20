import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <article className="rounded-xl bg-white p-4 shadow ring-1 ring-slate-200">{children}</article>;
}
