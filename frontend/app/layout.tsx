import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AgriLink",
  description: "Agricultural marketplace for farmers, buyers, and storage providers"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
