import { FC } from "react";
import Link from "next/link";

interface NavlinkProps {
    href: string;
    text: string;
    active: boolean;
}

export const NavItem: FC<NavlinkProps> = ({ href, text, active }) => {
    return (
        <li className="w-full transition-all overflow-hidden md:overflow-visible">
            <Link href={href} className={`uppercase text-2xl md:text-base transition-all inline-block py-4 px-12 md:p-2 w-full text-nowrap ${active ? 'text-prim' : 'text-wh'} hover:text-prim`}>
                    {text}
            </Link>
        </li>
    );
};