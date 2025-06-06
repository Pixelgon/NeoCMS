import { Header } from "@/Components/Header/Index";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Projekty | Pixelgon',
    description: 'Prozkoumejte naše projekty a zjistěte, jak jsme pomohli našim klientům dosáhnout jejich cílů pomocí unikátních digitálních řešení.',
};

export default function Projetky() {
    return (
        <>
            <Header bg="/images/headers/projects-header.webp" title="Projekty"/>
            <main>
                
            </main>
        </>
    );
}