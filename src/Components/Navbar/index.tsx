'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useContext } from "react";
import { NavItem } from './navitem';
import { LayoutContext } from "@/context/LayoutContext";


export const Navbar = () => {   
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const layoutData = useContext(LayoutContext);

    useEffect(() => {
        layoutData.setScroll(!menuOpen);
    }, [menuOpen, layoutData]);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathName]);

    const navItems = useMemo(() => 
        layoutData.pages.map((page, index) => (
            <NavItem key={index} href={page.href} text={page.name} active={page.href === pathName} />
        )),
    [layoutData.pages, pathName]);

    return (
        <nav className={`fixed top-0 transition-all left-0 w-full h-16 ${menuOpen ? 'h-svh' : ''} md:h-12 z-50 bg-navbar md:justify-center md:flex justify-center items-center backdrop-blur-lg`}>
            <div className='flex items-center justify-between h-full max-h-16'>
                <Link href="/" className='h-full p-4 md:p-3 md:pr-2'>
                    <Image src="/images/logo/Logo.svg" width={0} height={0} sizes="100vh" alt={"Pixelgon logo"} style={{ width: 'auto', height: '100%' }} priority />
                </Link>
                <button
                    className="relative h-full aspect-square bg-transparent border-none md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    rel='nofollow'
                    aria-label='Otevřít menu'
                >
                    <div className={`absolute w-[calc(100%-2*max(1rem,1svw))] h-[4px] left-4 bg-pxlgn-gradient top-[40%] transition-transform rounded ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                    <div className={`absolute w-[calc(100%-2*max(1rem,1svw))] h-[4px] left-4 bg-pxlgn-gradient bottom-[40%] transition-transform rounded ${menuOpen ? '-rotate-45 translate-y-[-4px]' : ''}`} />
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