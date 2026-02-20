"use client";

import type { LanguageCode } from "@/components/language/LanguageContext";

interface LanguageCardProps {
  greeting: string;
  languageName: string;
  code: LanguageCode;
  onSelect: (code: LanguageCode) => void;
}

export function LanguageCard({ greeting, languageName, code, onSelect }: LanguageCardProps) {
  return (
    <button
      onClick={() => onSelect(code)}
      className="h-56 w-56 rounded-2xl bg-white p-6 text-left shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <p className="text-4xl font-bold text-slate-900">{greeting}</p>
      <p className="mt-5 text-xl text-slate-600">{languageName}</p>
    </button>
  );
}
