'use client';
import Link from 'next/link';
import Logo from "@/Components/Logo";
import { NavItem } from "@/Components/Navbar/navitem";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pages = [
    { name: "Domů", href: "/" },
    { name: "O nás", href: "/about" },
    { name: "Projekty", href: "/projects" },
    { name: "Grafika", href: "/graphics" },
];

export const Navbar = () => {
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full max-h-10 z-50 flex items-center justify-between p-4 bg-navbar backdrop-blur-lg md:justify-center">
            <Link href="/" className={'pr-1'}>
                <Logo width={20} height={20} />
            </Link>
            <button
                className="relative w-10 h-5 p-2.5 bg-transparent border-none md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className={`block w-full h-0.5 bg-white rounded ${menuOpen ? 'hidden' : ''}`} />
                <span className={`block w-full h-0.5 bg-white rounded ${menuOpen ? 'transform -rotate-45' : ''}`} />
            </button>
            <menu
                className={`fixed top-[100%] left-0 w-full transition-transform transform ${menuOpen ? 'translate-y-[-100%]' : ''} bg-bg-sec flex flex-col items-center justify-center list-none p-0 m-0 md:relative md:flex-row md:w-auto md:translate-y-0`}
            >
                {pages.map((page, index) => (
                    <NavItem key={index} href={page.href} text={page.name} active={+(page.href === pathName)} />
                ))}
            </menu>
        </nav>
    );
}

export default Navbar;