import { FC } from "react";
import Link from "next/link";

interface NavlinkProps {
    href: string;
    text: string;
    active: number;
}

export const NavItem: FC<NavlinkProps> = ({ href, text, active }) => {
    return (
        <li>
            <Link href={href} className={`uppercase transition-all inline-block py-2 px-1 ${active ? 'text-prim' : 'text-wh'} hover:text-prim`}>
                    {text}
            </Link>
        </li>
    );
};