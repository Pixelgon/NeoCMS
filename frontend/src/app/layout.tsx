import type { Metadata } from "next";
import { Open_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { LayoutProvider } from "@/context/LayoutContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Pixelgon - Your vision, our code",
  description: "Tvorba webu jinak. Mojí prioritou při tvorbě webových stránek je neotřelí funkční design, technické zpracování a efektivní SEO.",
};

const OpenSans = Open_Sans({
  variable: "--open-sans",
});

const QuicksandFont = Quicksand({
  variable: "--quicksand",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <html lang="cs" className={`${OpenSans.variable} ${QuicksandFont.variable}`}>
              <LayoutProvider>
                <NextTopLoader
                  color="linear-gradient(90deg, #00CCFF 0%, #1CD2E6 57%, #58DEB1 80%, #91E97E 100%)"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={300}
                  shadow={false}
                />
                <Navbar />
                {children}
                <Footer />
              </LayoutProvider>
        </html>
      </>
  );
}
