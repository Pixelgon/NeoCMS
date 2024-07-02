import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/Components/Navbar/navbar";
import {Footer} from "@/Components/Footer/footer";
import NextTopLoader from "nextjs-toploader";


export const metadata: Metadata = {
  title: "Pixelgon - Your vision, our code",
  description: "Tvorba webu jinak. Mojí prioritou při tvorbě webových stránek je neotřelí funkční design, technické zpracování a efektivní SEO.",
};

const open_sans = Open_Sans({
    weight: ["400", "600"],
    subsets: ["latin-ext"],

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <html lang="cs">
          <body className={open_sans.className}>
            <NextTopLoader
             color="#2299DD"
             initialPosition={0.08}
             crawlSpeed={200}
             height={3}
             crawl={true}
             showSpinner={false}
             easing="ease"
             speed={200}
             shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
      </>
  );
}
