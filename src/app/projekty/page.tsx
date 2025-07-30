import { Header } from "@/components/header/Index";
import { Section } from "@/components/layout/Section";
import ProjectsList from "@/components/layout/ProjectList";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Projekty | Pixelgon",
    description: "Portfolio projektů společnosti Pixelgon - webové aplikace, e-shopy a další digitální řešení.",
    openGraph: {
        title: "Projekty | Pixelgon",
        description: "Podívejte se na naše nejnovější projekty - weby, webové aplikace, grafický design a další digitální řešení.",
        type: "website",
        url: "https://pixelgon.cz/projekty",
        images: [
            {
                url: "/images/headers/projects-header.webp",
                width: 1200,
                height: 630,
                alt: "Pixelgon",
            },
        ],
    },
    alternates: {
        canonical: "https://pixelgon.cz/projekty",
    },
    keywords: ["webové aplikace", "e-shopy", "digitální řešení", "portfolio", "Pixelgon", "web development"],
};

async function getAllProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { createdOn: "desc" },
        where: { visible: true },
        select: {
            id: true,
            name: true,
            slug: true,
            photo: true,
            description: true,
            tags: {
                select: {
                    tag: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        }
                    }
                }
            }
        }
    });

    return projects.map(project => ({
        ...project,
        tags: project.tags.map((t) => t.tag)
    }));
}

async function getAllTags() {
    const tags = await prisma.tag.findMany({
        orderBy: { name: "asc" },
        select: {
            id: true,
            name: true,
            slug: true,
        }
    });

    return tags;
}

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const Projekty: FC<PageProps> = async ({ searchParams }) => {
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
                    <h2>Naše projekty</h2>
                    <p>Zde najdete portfolio našich nejnovějších projektů. Specializujeme se na tvorbu webových aplikací, e-shopů a dalších digitálních řešení na míru.</p>
                    <ProjectsList 
                        projects={allProjects} 
                        availableTags={availableTags}
                        initialTagSlugs={tagSlugs} 
                    />
                </Section>
            </main>
        </>
    );
}

export default Projekty;