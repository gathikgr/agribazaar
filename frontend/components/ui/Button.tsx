import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`rounded-lg bg-emerald-600 px-4 py-2 text-white ${props.className ?? ""}`} />;
}
