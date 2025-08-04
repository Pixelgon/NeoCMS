'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useContext, FC, PropsWithChildren } from "react";
import { LayoutContext } from '@/context/LayoutContext';


export const Navbar: FC<PropsWithChildren> = (props) => {   
    const pathName = "/" + usePathname().split('/')[1];
    const layoutData = useContext(LayoutContext);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        layoutData.setScroll(!menuOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuOpen]);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathName]);

    return (
        <nav className={`fixed top-0 transition-all left-0 w-full h-16 ${menuOpen ? 'h-svh' : ''} md:h-12 z-50 bg-navbar md:justify-center md:flex justify-center items-center backdrop-blur-md`}>
            <div className='flex items-center justify-between h-full max-h-16'>
                <Link href="/" className='h-full p-4 md:p-3 md:pr-2'>
                    <Image src="/images/logo/Logo.svg" width={0} height={0} sizes="100vh" alt={"Pixelgon logo"} style={{ width: 'auto', height: '100%' }} priority />
                </Link>
                <button
                    className="relative h-full aspect-square bg-transparent border-none md:hidden w-16"
                    onClick={() => setMenuOpen(!menuOpen)}
                    rel='nofollow'
                    aria-label='Otevřít menu'
                >
                    <div className={`absolute w-1/2 h-1 left-4 bg-pxlgn-gradient transition-transform rounded ${menuOpen ? 'rotate-45 top-1/2' : 'top-[40%]'}`}/>
                    <div className={`absolute w-1/2 h-1 left-4 bg-pxlgn-gradient transition-transform rounded ${menuOpen ? '-rotate-45 top-1/2' : 'bottom-[40%]'}`}/>
                </button>
            </div>
            <menu
                className={`w-full transition-all overflow-hidden h-[calc(100svh-48px)] ${menuOpen ? 'max-h-[calc(100svh-48px)] menu--open' : 'max-h-0 menu--close'} flex flex-col items-center list-none p-0 m-0 md:relative md:flex-row md:w-auto md:max-h-none md:h-auto`}
            >
                {props.children}
            </menu>
        </nav>
    );
};
export default Navbar;