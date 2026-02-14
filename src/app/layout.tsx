import { Open_Sans, Quicksand } from "next/font/google";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./globals.css";
import { LayoutProvider } from "@/context/layoutContext";
import { MotionConfig } from "motion/react";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
import { AdminPanel } from "@/components/admin/adminPanel";
import { auth } from "@/lib/auth";
import { GA } from "@/components/layout/googleAnalytics";
import { NavbarItem } from "@/components/navbar/navbarItem";
import { AdminProjectProvider } from "@/context/adminProjectContext";
import { BlockProvider } from "@/context/blockContext";
import NextTopLoader from "nextjs-toploader";

const OpenSans = Open_Sans({
  variable: "--open-sans",
  subsets: ["latin-ext"],
});

const QuicksandFont = Quicksand({
  variable: "--quicksand",
  subsets: ["latin-ext"],
});

const baseUrl = new URL(process.env.BASE_URL || "https://pixelgon.cz");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: "Pixelgon - Your vision, our code",
  description:
    "Digitální parťák pro vaše projekty. Navrhujeme a vyvíjíme weby, aplikace a digitální řešení, která nejsou jen vizuálně přívětivá, ale efektivní a jedinečná.",
  keywords: [
    "web design",
    "app development",
    "digitální řešení",
    "progresivní webové aplikace",
    "e-commerce",
    "Pixelgon",
  ],
  openGraph: {
    title: "Pixelgon - Your vision, our code",
    description:
      "Digitální parťák pro vaše projekty. Navrhujeme a vyvíjíme weby, aplikace a digitální řešení, která nejsou jen vizuálně přívětivá, ale efektivní a jedinečná.",
    type: "website",
    url: baseUrl,
    images: [
      {
        url: "/images/og.webp",
        width: 1200,
        height: 630,
        alt: "Pixelgon",
      },
    ],
  },
  alternates: {
    canonical: baseUrl.toString(),
  },
};
const pages = [
  { name: "Domů", href: "/" },
  { name: "O nás", href: "/o-nas" },
  { name: "Projekty", href: "/projekty" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const content = (
    <>
      <Navbar>
        {pages.map((page, index) => (
          <NavbarItem key={index} href={page.href} text={page.name} />
        ))}
      </Navbar>
      {children}
      <Footer>
        <button
          data-cc="show-preferencesModal"
          className="text-wh transition-colors hover:text-prim"
        >
          Nastavení cookies
        </button>
        <Link
          href="/gdpr"
          className="text-wh transition-colors hover:text-prim"
        >
          Ochrana osobních údajů
        </Link>
      </Footer>
      {session && session.user && <AdminPanel />}
    </>
  );

  return (
    <>
      <html
        lang="cs"
        className={`${OpenSans.variable} ${QuicksandFont.variable}`}
        data-scroll-behavior="smooth"
      >
        <body className={`relative ${session && session.user ? "mb-14" : ""}`}>
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
          <SessionProvider>
            <MotionConfig transition={{ duration: 0.3 }}>
              {session && session.user ? (
                <AdminProjectProvider>
                  <BlockProvider>
                    <LayoutProvider>{content}</LayoutProvider>
                  </BlockProvider>
                </AdminProjectProvider>
              ) : (
                <LayoutProvider>{content}</LayoutProvider>
              )}
            </MotionConfig>
          </SessionProvider>
          <GA />
        </body>
      </html>
    </>
  );
}
