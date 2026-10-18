import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";

export const metadata: Metadata = {
  title: "Přihlášení | Pixelgon",
  description: "Přihlášení do administrace webu Pixelgon.",
  robots: { index: false },
  alternates: { canonical: `${baseUrl}/pxlgn` },
  openGraph: {
    title: "Přihlášení | Pixelgon",
    description: "Přihlášení do administrace webu Pixelgon.",
    url: `${baseUrl}/pxlgn`,
    type: "website",
    images: [{ url: "/images/og.webp", width: 1200, height: 630, alt: "Pixelgon" }],
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
