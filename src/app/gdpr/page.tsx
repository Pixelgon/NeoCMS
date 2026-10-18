import Block from "@/components/block/block";
import { Header } from "@/components/header";
import { Section } from "@/components/layout/section";
import { Metadata } from "next";

const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";

export const metadata: Metadata = {
    title: 'GDPR | Pixelgon',
    description: 'Informace o zpracování a ochraně osobních údajů na webu Pixelgon.',
    alternates: { canonical: `${baseUrl}/gdpr` },
    openGraph: {
        title: 'GDPR | Pixelgon',
        description: 'Informace o zpracování a ochraně osobních údajů na webu Pixelgon.',
        url: `${baseUrl}/gdpr`,
        type: 'website',
        images: [{ url: '/images/og.webp', width: 1200, height: 630, alt: 'Pixelgon' }],
    },
    robots: {
        index: false,
    },
};

export default function GDPR() {
return (
    <>
        <Header bg="/images/headers/about-header.webp" title="GDPR"/>
        <main>
            <Section isPrim>
                <Block id="gdpr_desc"/>
            </Section>    
        </main>
    </>
);
}
