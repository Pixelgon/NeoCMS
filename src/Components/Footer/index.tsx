'use client';
import Link from "next/link";
import Image from "next/image";
import * as CookieConsent from "vanilla-cookieconsent";
import { use, useContext, useEffect, useState } from "react";
import { Btn } from "../Layout/btn";
import CookieConsentConfig from "@/config/CookieConsentConfig";
import { motion } from "framer-motion";
import { Section } from "../Layout/section";
import { LayoutContext } from "@/context/LayoutContext";
import { Modal } from "../Layout/modal";


export const Footer = () => {
    const date = new Date();
    const ctaText = "Půjdete do toho s námi?".split(" ");
    const layoutData = useContext(LayoutContext);
    const [ctaModal, setCtaModal] = useState(false);


    useEffect(() => {
        CookieConsent.run(CookieConsentConfig as CookieConsent.CookieConsentConfig);
    },);


    useEffect(() => {
        ctaModal ? layoutData.setScroll(false) : layoutData.setScroll(true);
    }, [ctaModal, layoutData]);

    return (
        <>
            <Modal modalState={ctaModal} setModalState={setCtaModal}>
                <h3>Kontaktujte nás</h3>
                <form className={'flex flex-col gap-4 justify-center'}>
                    <input type="text" placeholder="Vaše jméno"/>
                    <input type="email" placeholder="Váš email"/>
                    <textarea placeholder="Vaše zpráva"/>
                    <Btn prim type="submit">Odeslat</Btn>
                </form>
            </Modal>
            <footer className="bg-bg text-wh">
                <div className={'bg-sec-gradient'}>
                    <Section className="">
                        <p className={'text-[min(10vw,5rem)] font-quicksand leading-[1.15]'}>
                            {ctaText.map((el, i) => (
                            <motion.span className={'text-pxlgn font-semibold uppercase'}
                            initial={{ y: 10, opacity: 0}}
                            whileInView={{ y: 0, opacity: 1}}
                            transition={{
                                duration: .3,
                                delay: i / 12
                            }}
                            key={i}
                            >
                            {el}{" "}
                            </motion.span>
                        ))}
                        </p>
                        <div className={'flex gap-6 items-center flex-wrap'}>
                            <Btn onClick={() => setCtaModal(!ctaModal)} className={'text-xl'} prim>Kontaktovat</Btn>
                            <a href="mailto:pixelgon@pixelgon.cz" className={'w-full sm:w-auto flex gap-2 relative hover:brightness-50 transition-all duration-300'}><Image height={30} width={30} src={'/images/icons/envelope.svg'} alt={""}/><p className={'text-pxlgn'}>pixelgon@pixelgon.cz</p></a>
                        </div>
                    </Section>    
                </div>
                <div className="max-w-7xl flex justify-between mx-auto items-center flex-wrap gap-2 py-4 px-reg xl:px-0">
                    <div className={'relative'}>
                        <Link href="/" className={'relative'}>
                            <Image src="/images/logo/LogoText.svg" fill className={'!relative w-full h-auto max-w-[222px]'} alt="Logo Pixelgon" priority={false}/>
                        </Link>
                        <p className="m-0 font-light text-xs mt-2 w">&copy;&nbsp;{date.getFullYear()}&nbsp;| Matěj Matějka | IČO: 21164720</p>
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
        </>
    );
}

export default Footer;