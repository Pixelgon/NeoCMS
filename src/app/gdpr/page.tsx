import Block from "@/components/block/block";
import { Header } from "@/components/header";
import { Section } from "@/components/layout/section";
import { Metadata } from "next";
import Link from "next/link";


const metadata: Metadata = {
    title: 'GDPR | Pixelgon',
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