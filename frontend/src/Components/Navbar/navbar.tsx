'use client';
import Link from 'next/link';
import Logo from "@/Components/Logo";
import { NavItem } from "@/Components/Navbar/navitem";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pages = [
    { name: "Domů", href: "/" },
    { name: "O nás", href: "/about" },
    { name: "Projekty", href: "/projects" },
    { name: "Grafika", href: "/graphics" },
];

export const Navbar = () => {
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    } , [pathName]);

    return (
        <nav className="fixed top-0 left-0 w-full max-h-10 z-50 flex items-center justify-between p-4 bg-navbar backdrop-blur-lg md:justify-center">
            <Link href="/" className={'pr-1'}>
                <Logo width={20} height={20} />
            </Link>
            <button
                className="relative w-7 h-5 p-2.5 bg-transparent border-none md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <div className={`absolute w-full h-[2px] left-0 bg-pxlgn-gradient top-[25%] rounded transition-transform ${menuOpen ? 'transform rotate-45 translate-y-[4px]' : ''}`} />
                <div className={`absolute w-full h-[2px] left-0 bg-pxlgn-gradient bottom-[25%] rounded transition-transform ${menuOpen ? 'transform -rotate-45 translate-y-[-4px]' : ''}`} />
            </button>
            <menu
                className={`fixed top-[100%] z-40 left-0 w-full transition-all overflow-hidden ${menuOpen ? 'max-h-[160px]' : 'max-h-0'} bg-menu flex flex-col items-center justify-center list-none p-0 m-0 md:relative md:flex-row md:w-auto md:max-h-none md:translate-y-0 md:bg-transparent`}
            >
                {pages.map((page, index) => (
                    <NavItem key={index} href={page.href} text={page.name} active={+(page.href === pathName)} />
                ))}
            </menu>
        </nav>
    );
};
export default Navbar;