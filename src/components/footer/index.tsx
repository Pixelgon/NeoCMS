'use client';
import * as CookieConsent from "vanilla-cookieconsent";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, PropsWithChildren, FC } from "react";
import { Btn } from "../layout/btn";
import { Section } from "../layout/section";
import Image from "next/image";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsentConfig from "@/config/cookieConsentConfig";
import { useLayout } from "@/context/layoutContext";

const removeAnalyticsCookies = () => {
    document.cookie = "_ga=; Max-Age=0; path=/; SameSite=Lax";
    document.cookie = `_ga_${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}=; Max-Age=0; path=/; SameSite=Lax`;
}

export const Footer: FC<PropsWithChildren> = ({children}) => {
    const date = new Date();
    const ctaText = "Máte projekt v hlavě?".split(" ");
    const { openContactForm } = useLayout();

    useEffect(() => {
        CookieConsent.run({...CookieConsentConfig as CookieConsent.CookieConsentConfig, 
            onConsent: () => {
                if (!CookieConsent.acceptedCategory("analytics"))
                    removeAnalyticsCookies();
            },
            onChange: () => {
                if (!CookieConsent.acceptedCategory("analytics"))
                    removeAnalyticsCookies();
            },
            }
        );
    }, []);

    return (
        <>
            <footer className="bg-bg text-wh">
                <div className={'bg-sec-gradient'}>
                    <Section className="">
                        <p className={'text-[min(10vw,5rem)] font-quicksand leading-[1.15]'}>
                            {ctaText.map((word, wordIndex) => {
                                const characterOffset = ctaText
                                    .slice(0, wordIndex)
                                    .reduce((total, word) => total + Array.from(word).length + 1, 0);

                                return (
                                    <span key={wordIndex} className="inline-block whitespace-nowrap text-pxlgn font-semibold uppercase">
                                        {Array.from(word).map((character, characterIndex) => (
                                            <motion.span
                                                key={characterIndex}
                                                className="inline-block"
                                                initial={{ y: 10, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true, amount: 1 }}
                                                transition={{
                                                    duration: .3,
                                                    delay: (characterOffset + characterIndex) / 12,
                                                }}
                                            >
                                                {character}
                                            </motion.span>
                                        ))}
                                        {wordIndex < ctaText.length - 1 && "\u00a0"}
                                    </span>
                                );
                            })}
                        </p>
                        <div className={'flex gap-6 items-center flex-wrap'}>
                            <Btn onClick={() => openContactForm()} className={'text-xl'} prim>Poptat projekt</Btn>
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
                        {children}
                    </menu>    
                </div>
            </footer>
            {CookieConsent.acceptedCategory("analytics") && <GoogleAnalytics gaId={process.env.GA_ID || ""} />}
        </>
    );
}

export default Footer;
