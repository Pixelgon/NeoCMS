'use client';
import Link from 'next/link';
import Logo from "@/Components/Logo";
import { NavItem } from "@/Components/Navbar/navitem";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";

const pages = [
    { name: "Domů", href: "/" },
    { name: "My", href: "/about" },
    { name: "Projekty", href: "/projects" },
    { name: "Grafika", href: "/graphics" },
];

export const Navbar = () => {
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathName]);

    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

    const navItems = useMemo(() => pages.map((page, index) => (
        <NavItem key={index} href={page.href} text={page.name} active={page.href === pathName} />
    )), [pathName]);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-navbar md:justify-center md:flex justify-center items-center backdrop-blur-lg">
            <div className='flex items-center justify-between'>
                <Link href="/" className='p-3 pr-2'>
                    <Logo width={24} height={24} />
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
                className={`w-full transition-all overflow-hidden ${menuOpen ? 'max-h-[160px]' : 'max-h-0'} flex flex-col items-center justify-center list-none p-0 m-0 md:relative md:flex-row md:w-auto md:max-h-none`}
            >
                {navItems}
            </menu>
        </nav>
    );
};
export default Navbar;

