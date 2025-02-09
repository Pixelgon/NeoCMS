import type { Metadata } from "next";
import { Open_Sans, Quicksand } from "next/font/google";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { LayoutProvider } from "@/context/LayoutContext";
import { MotionConfig } from "motion/react";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { SessionProvider } from "next-auth/react";

const OpenSans = Open_Sans({
  variable: "--open-sans",
  subsets: ["latin-ext"],
});

const QuicksandFont = Quicksand({
  variable: "--quicksand",
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <html lang="cs" className={`${OpenSans.variable} ${QuicksandFont.variable}`}>
          <body>
            <SessionProvider>
              <MotionConfig transition={{duration: .5}}>
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
              </MotionConfig>
            </SessionProvider>
          </body>
        </html>
      </>
  );
}
