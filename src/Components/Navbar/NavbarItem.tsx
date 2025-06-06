'use client'
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinkProps {
    href: string;
    text: string;
}

export const NavItem: FC<NavlinkProps> = ({ href, text }) => {
    const pathName = usePathname();
    const active = pathName === href || (href === '/' && pathName === '/');

    return (
        <li className="w-full h-full transition-all overflow-hidden md:overflow-visible">
            <Link href={href} className={`uppercase text-2xl md:text-base transition-all inline-block py-4 px-12 md:p-2 md:py-3 w-full text-nowrap ${active ? 'text-prim' : 'text-wh'} hover:text-prim`}>
                    {text}
            </Link>
        </li>
    );
};