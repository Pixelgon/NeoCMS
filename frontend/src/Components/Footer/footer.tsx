'use client';
import Link from "next/link";
import Logo from "@/Components/Logo";

export const Footer = () => {
    const date = new Date();

    return (
        <footer className="flex bg-bg text-wh uppercase justify-center items-center max-h-12 p-4">
            <p className="m-0">&copy;&nbsp;{date.getFullYear()}&nbsp;|</p>
            <Link href="/" className="inline-block p-2.5">
                <Logo full={true} width={81} height={12} />
            </Link>
            <menu className="flex justify-center items-center list-none m-0 bg-bg uppercase">
                <Link href="/cookies" className="inline-block p-2.5 pr-1.5 text-wh transition-all hover:text-prim">
                        Cookies
                </Link>
                <Link href="/gdpr" className="inline-block p-2.5 pl-1.5 text-wh transition-all hover:text-prim">
                    Gdpr
                </Link>
            </menu>
        </footer>
    );
}

export default Footer;