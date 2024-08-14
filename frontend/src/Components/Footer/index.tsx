'use client';
import Link from "next/link";
import Image from "next/image";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { useEffect } from "react";
import { Btn } from "../Layout/btn";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Modal } from "../Layout/modal";
import { cookieConsentConfig } from "@/config/cookieConsentConfig";


export const Footer = () => {
    const date = new Date();
    useEffect(() => {
        CookieConsent.run(
        cookieConsentConfig as CookieConsent.CookieConsentConfig
        ); 
    }, []);

    return (
        <footer className="bg-bg text-wh">
            <div className={'bg-sec-gradient'}>
                <div className={'flex justify-center max-w-7xl py-24 px-4 flex-col items-start gap-6 mx-auto'}>
                    <h2>Půjdete do toho s námi?</h2>
                    <div className={'flex gap-6 items-center'}>
                        <Btn onClick={() => console.log("kontaktovat")} className={'text-xl'} prim>Kontaktovat</Btn>
                        <a href="mailto:pixelgon@pixelgon.cz" className={'flex gap-2 relative'}><Image height={30} width={30} src={'/icons/envelope.svg'} alt={""}/><p className={'text-pxlgn'}>pixelgon@pixelgon.cz</p></a>
                    </div>
                </div>    
            </div>
            <div className="max-w-7xl flex justify-between mx-auto items-center flex-wrap gap-2 p-4">
                <div className={'relative'}>
                    <Link href="/" className={'relative'}>
                        <Image src="/Logo/LogoText.svg" fill className={'!relative w-full h-auto'} alt="Logo Pixelgon" priority={false}/>
                    </Link>
                    <p className="m-0 font-light text-xs mt-2">&copy;&nbsp;{date.getFullYear()}&nbsp;| Matěj Matějka | IČO: 21164720</p>
                </div>
                
                <menu className="flex justify-center items-center list-none gap-4 m-0 mt-4 bg-bg font-light text-xs">
                    <button data-cc="show-preferencesModal" className="text-wh transition-colors hover:text-prim">
                            Nastavení cookies
                    </button>
                    <Link href="/gdpr" className="text-wh transition-colors hover:text-prim">
                        Ochrana osobních údajů
                    </Link>
                </menu>    
            </div>
        </footer>
    );
}

export default Footer;