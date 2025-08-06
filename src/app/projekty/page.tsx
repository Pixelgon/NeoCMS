import { Header } from "@/components/header/Index";
import { Section } from "@/components/layout/Section";
import ProjectsList from "@/components/project/ProjectList";
import getAllProjects from "@/utils/project/getAllProjects";
import getAllTags from "@/utils/project/getAllTags";
import { Metadata } from "next";
import { FC } from "react";

const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";

export const metadata: Metadata = {
    title: "Projekty | Pixelgon",
    description: "Podívejte se na naše nejnovější projekty - weby, webové aplikace, grafický design a další digitální řešení.",
    openGraph: {
        title: "Projekty | Pixelgon",
        description: "Podívejte se na naše nejnovější projekty - weby, webové aplikace, grafický design a další digitální řešení.",
        type: "website",
        url: `${baseUrl}/projekty`,
        images: [
            {
                url: "/images/og.webp",
                width: 1200,
                height: 630,
                alt: "Pixelgon",
            },
        ],
    },
    alternates: {
        canonical: `${baseUrl}/projekty`,
    },
};


interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Projekty: FC<PageProps> = async ({ searchParams }) => {
    const [allProjects, availableTags, resolvedSearchParams] = await Promise.all([
        getAllProjects(),
        getAllTags(),
        searchParams
    ]);
    const tagParam = resolvedSearchParams.tag;
    const tagSlugs = Array.isArray(tagParam) ? tagParam : tagParam ? [tagParam] : [];
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Pixelgon Projekty",
        "description": "Portfolio projektů společnosti Pixelgon",
        "numberOfItems": allProjects.length,
        "itemListElement": allProjects.map((project, index) => ({
            "@type": "CreativeWork",
            "position": index + 1,
            "name": project.name,
            "description": project.description,
            "url": `https://pixelgon.cz/projekty/${project.slug}`,
            "image": project.photo,
            "keywords": project.tags.map(tag => tag.name).join(", ")
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header bg="/images/headers/projects-header.webp" title="Projekty"/>
            <main>
                <Section isPrim>
                    <h2>Naše práce</h2>
                    <p>Tvoříme věci, co nám dávají smysl. Navrhujeme, vyvíjíme, ladíme do detailu. Když něco stavíme, chceme, aby to bylo chytrý, praktický a mělo svou tvář.<br/> Tohle je naše práce na kterou jsme patřičně hrdí.</p>
                    <ProjectsList 
                        projects={allProjects} 
                        availableTags={availableTags}
                        initialTagSlugs={tagSlugs} 
                    />
                </Section>
            </main>
        </>
    );
};

export default Projekty;