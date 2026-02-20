import type { ReactNode } from "react";

import { Providers } from "@/app/providers";
import "@/styles/globals.css";

export const metadata = {
  title: "AgriSync",
  description: "Smart pre-harvest coordination platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
