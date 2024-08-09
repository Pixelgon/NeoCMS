'use client';
import Link from 'next/link';
import Image from 'next/image';
import { NavItem } from "@/Components/Navbar/navitem";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";

const pages = [
    { name: "Domů", href: "/" },
    { name: "O nás", href: "/onas" },
    { name: "Projekty", href: "/projekty" },
    { name: "Grafika", href: "/grafika" },
];

export const Navbar = () => {   
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            setMenuOpen(false);
        }
    }, [pathName]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    }, [menuOpen]);

    const navItems = useMemo(() => 
        pages.map((page, index) => (
            <NavItem key={index} href={page.href} text={page.name} active={page.href === pathName} />
        )),
    [pathName]);

    return (
        <nav className={`fixed top-0 transition-all left-0 w-full h-16 ${menuOpen ? 'h-svh' : ''} md:h-12 z-50 bg-navbar md:justify-center md:flex justify-center items-center backdrop-blur-lg`}>
            <div className='flex items-center justify-between h-full max-h-16 p-3 pr-2'>
                <Link href="/" className='h-full'>
                    <Image src="/logo/Logo.svg" width={0} height={0} sizes="100vh" alt={"Pixelgon logo"} style={{ width: 'auto', height: '100%' }} priority />
                </Link>
                <button
                    className="relative h-[48px] aspect-square bg-transparent border-none md:hidden"
                    onClick={toggleMenu}
                >
                    <div className={`absolute w-[calc(100%-.75rem)] h-[2px] left-0 bg-pxlgn-gradient top-[40%] transition-transform rounded ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                    <div className={`absolute w-[calc(100%-.75rem)] h-[2px] left-0 bg-pxlgn-gradient bottom-[40%] transition-transform rounded ${menuOpen ? '-rotate-45 translate-y-[-4px]' : ''}`} />
                </button>
            </div>
            <menu
                className={`w-full transition-all overflow-hidden h-[calc(100svh-48px)] ${menuOpen ? 'max-h-[calc(100svh-48px)] menu--open' : 'max-h-0 menu--close'} flex flex-col items-center list-none p-0 m-0 md:relative md:flex-row md:w-auto md:max-h-none md:h-auto`}
            >
                {navItems}
            </menu>
        </nav>
    );
};
export default Navbar;