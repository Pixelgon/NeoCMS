import { Open_Sans, Quicksand } from "next/font/google";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./globals.css";
import { LayoutProvider } from "@/context/LayoutContext";
import { MotionConfig } from "motion/react";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from '@next/third-parties/google'
import Link from "next/link";
import { NavItem } from "@/components/navbar/NavbarItem";
import Navbar from "@/components/navbar/Index";
import { Metadata } from "next";


const OpenSans = Open_Sans({
  variable: "--open-sans",
  subsets: ["latin-ext"],
});

const QuicksandFont = Quicksand({
  variable: "--quicksand",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: 'Pixelgon - Your vision, our code',
  description: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = [
        { name: "Domů", href: "/" },
        { name: "O nás", href: "/o-nas" },
        { name: "Projekty", href: "/projekty"},
  ]

  return (
      <>
        <html lang="cs" className={`${OpenSans.variable} ${QuicksandFont.variable}`}>
          <body className={'relative'}>
            <SessionProvider>
              <MotionConfig transition={{duration: .5}}>
                <LayoutProvider>
                  <GoogleAnalytics gaId={process.env.GA_ID || ""} />
                  <Navbar>
                    {pages.map((page, index) => (
                        <NavItem key={index} href={page.href} text={page.name} />
                    ))}
                  </Navbar>
                    {children}
                  <Footer>
                    <button data-cc="show-preferencesModal" className="text-wh transition-colors hover:text-prim">
                      Nastavení cookies
                    </button>
                    <Link href="/gdpr" className="text-wh transition-colors hover:text-prim">
                      Ochrana osobních údajů
                    </Link>
                  </Footer>
                </LayoutProvider>
              </MotionConfig>
            </SessionProvider>
          </body>
        </html>
      </>
  );
}
