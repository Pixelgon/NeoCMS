'use client';
import NextTopLoader from "nextjs-toploader";
import Footer from "../footer";
import Navbar from "../Navbar/navbar";
import { useState } from "react";

export const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) =>{ 
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <>
            <div className={menuOpen ? 'overflow-hidden md:overflow-auto h-svh' : ''}>
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
                <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
                {children}
                <Footer />
            </div>
        </>
        
    );
}