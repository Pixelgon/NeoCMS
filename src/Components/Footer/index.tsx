'use client';

import CookieConsentConfig from "@/config/CookieConsentConfig"
import * as CookieConsent from "vanilla-cookieconsent";
import { LayoutContext } from "@/context/LayoutContext";
import { motion } from "motion/react";
import Link from "next/link";
import { useContext, useState, useEffect, PropsWithChildren, FC } from "react";
import { Btn } from "../layout/Btn";
import Input from "../form/Input";
import { Modal } from "../layout/Modal";
import { Section } from "../layout/Section";
import Textarea from "../form/TextArea";
import Image from "next/image";
import { FormType } from "@/types/FormType";
import ContactForm from "../form/ContactForm";




export const Footer: FC<PropsWithChildren> = ({children}) => {
    const date = new Date();
    const ctaText = "Půjdete do toho s námi?".split(" ");
    const [ctaModal, setCtaModal] = useState(false);
    const [cookieModal, setCookieModal] = useState(false);
    const [formData, setFormData] = useState<FormType>({
        name: "",
        email: "",
        message: "",
        address: "",
    });


    useEffect(() => {
        CookieConsent.run({...CookieConsentConfig as CookieConsent.CookieConsentConfig, 
            onModalShow: () => {
                setCookieModal(true);
            },
            onModalHide: () => {
                setCookieModal(false);
            },
        });
    },);

    return (
        <>
            <ContactForm setModalState={setCtaModal} modalState={ctaModal}/>
            <footer className="bg-bg text-wh">
                <div className={'bg-sec-gradient'}>
                    <Section className="">
                        <p className={'text-[min(10vw,5rem)] font-quicksand leading-[1.15]'}>
                            {ctaText.map((el, i) => (
                            <motion.span className={'text-pxlgn font-semibold uppercase'}
                            initial={{ y: 10, opacity: 0}}
                            whileInView={{ y: 0, opacity: 1}}
                            viewport={{ once: true, amount: 1}}
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
                        {children}
                    </menu>    
                </div>
            </footer>
        </>
    );
}

export default Footer;