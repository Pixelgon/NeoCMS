import type { Metadata } from "next";
import { Open_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import { Layout } from "@/Components/Layout/layout";


export const metadata: Metadata = {
  title: "Pixelgon - Your vision, our code",
  description: "Tvorba webu jinak. Mojí prioritou při tvorbě webových stránek je neotřelí funkční design, technické zpracování a efektivní SEO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <html lang="cs">
          <body>
            <Layout>
              {children}
            </Layout>
          </body>
        </html>
      </>
  );
}
