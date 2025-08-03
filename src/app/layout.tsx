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
import { AdminPanel } from "@/components/admin/AdminPanel";
import { auth } from "@/lib/auth";


const OpenSans = Open_Sans({
  variable: "--open-sans",
  subsets: ["latin-ext"],
});

const QuicksandFont = Quicksand({
  variable: "--quicksand",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://pixelgon.cz'),
  title: 'Pixelgon - Your vision, our code',
  description: 'Digitální parťák pro vaše projekty. Navrhujeme a vyvíjíme weby, aplikace a digitální řešení, která nejsou jen vizuálně přívětivá, ale efektivní a jedinečná.',
  keywords: ['web design', 'app development', 'digitální řešení', 'progresivní webové aplikace', 'e-commerce', 'Pixelgon'],
  openGraph: {
    title: 'Pixelgon - Your vision, our code',
    description: 'Digitální parťák pro vaše projekty. Navrhujeme a vyvíjíme weby, aplikace a digitální řešení, která nejsou jen vizuálně přívětivá, ale efektivní a jedinečná.',
    type: 'website',
    url: 'https://pixelgon.cz',
    images: [
      {
        url: '/images/og.webp',
        width: 1200,
        height: 630,
        alt: 'Pixelgon',
      },
    ],
  },
  alternates: {
    canonical: 'https://pixelgon.cz',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = [
        { name: "Domů", href: "/" },
        { name: "O nás", href: "/o-nas" },
        { name: "Projekty", href: "/projekty"},
  ]
  const session = await auth();

  return (
      <>
        <html lang="cs" className={`${OpenSans.variable} ${QuicksandFont.variable}`} data-scroll-behavior="smooth">
          <body className={`relative ${session && session.user ? "mb-14" : ""}`}>
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
                    {session && session.user && (
                      <AdminPanel />
                    )}
                  </Footer>
                </LayoutProvider>
              </MotionConfig>
            </SessionProvider>
          </body>
        </html>
      </>
  );
}
