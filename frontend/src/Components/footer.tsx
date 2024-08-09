'use client';
import Link from "next/link";
import Image from "next/image";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { useEffect } from "react";

export const Footer = () => {
    const date = new Date();
    useEffect(() => {
        CookieConsent.run({
            guiOptions: {
                consentModal: {
                    layout: "box",
                    position: "bottom right",
                    equalWeightButtons: true,
                    flipButtons: false
                },
                preferencesModal: {
                    layout: "box",
                    position: "right",
                    equalWeightButtons: true,
                    flipButtons: true
                }
            },
            categories: {
                necessary: {
                    readOnly: true
                },
                functionality: {},
                analytics: {}
            },
            language: {
                default: "cs",
                translations: {
                    en: {
                        consentModal: {
                            title: "Hello traveller, it's cookie time!",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject all",
                            showPreferencesBtn: "Manage preferences",
                            footer: "<a href=\"#link\">Privacy Policy</a>\n<a href=\"#link\">Terms and conditions</a>"
                        },
                        preferencesModal: {
                            title: "Consent Preferences Center",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject all",
                            savePreferencesBtn: "Save preferences",
                            closeIconLabel: "Close modal",
                            serviceCounterLabel: "Service|Services",
                            sections: [
                                {
                                    title: "Cookie Usage",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                },
                                {
                                    title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    linkedCategory: "necessary"
                                },
                                {
                                    title: "Functionality Cookies",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    linkedCategory: "functionality"
                                },
                                {
                                    title: "Analytics Cookies",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    linkedCategory: "analytics"
                                },
                                {
                                    title: "More information",
                                    description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"#yourdomain.com\">contact me</a>."
                                }
                            ]
                        }
                    },
                    cs: {
                        consentModal: {
                            title: "Vítejte, je čas na cookies!",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
                            acceptAllBtn: "Přijmout vše",
                            acceptNecessaryBtn: "Odmítnout vše",
                            showPreferencesBtn: "Spravovat preference",
                            footer: "<a href=\"#link\">Zásady ochrany osobních údajů</a>\n<a href=\"#link\">Podmínky použití</a>"
                        },
                        preferencesModal: {
                            title: "Centrum preferencí souhlasu",
                            acceptAllBtn: "Přijmout vše",
                            acceptNecessaryBtn: "Odmítnout vše",
                            savePreferencesBtn: "Uložit preference",
                            closeIconLabel: "Zavřít",
                            serviceCounterLabel: "Služba|Služby",
                            sections: [
                                {
                                    title: "Použití cookies",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                },
                                {
                                    title: "Nezbytně nutné cookies <span class=\"pm__badge\">Vždy povoleno</span>",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    linkedCategory: "necessary"
                                },
                                {
                                    title: "Funkční cookies",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    linkedCategory: "functionality"
                                },
                                {
                                    title: "Analytické cookies",
                                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    linkedCategory: "analytics"
                                },
                                {
                                    title: "Více informací",
                                    description: "Pro jakékoliv dotazy týkající se mé politiky cookies a vašich možností prosím <a class=\"cc__link\" href=\"#yourdomain.com\">kontaktujte mě</a>."
                                }
                            ]
                        }
                    }
                },
                autoDetect: "browser"
            }
        }); 
    }, []);

    return (
        <footer className="bg-bg text-wh p-4 ">
            <div className="max-w-7xl flex justify-between mx-auto items-center flex-wrap gap-2">
                <div>
                    <Link href="/">
                        <Image src="/Logo/LogoText.svg" width={137} height={21} alt="Logo Pixelgon"/>
                    </Link>
                    <p className="m-0 font-light text-xs mt-2">&copy;&nbsp;{date.getFullYear()}&nbsp;| Matěj Matějka | IČO: 21164720</p>
                </div>
                
                <menu className="flex justify-center items-center list-none gap-2 m-0 bg-bg font-light text-xs">
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