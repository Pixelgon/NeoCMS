import { Header } from "@/components/header/Index";
import { Section } from "@/components/layout/Section";
import ProjectsList from "@/components/layout/ProjectList";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Projekty | Pixelgon",
    description: "Portfolio projektů společnosti Pixelgon - webové aplikace, e-shopy a další digitální řešení.",
};

async function getAllProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { createdOn: "desc" },
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
    searchParams: { [key: string]: string | string[] | undefined };
}

export const Projekty: FC<PageProps> = async ({ searchParams }) => {
    const [allProjects, availableTags] = await Promise.all([
        getAllProjects(),
        getAllTags()
    ]);
    const tagParam = searchParams.tag;
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
                    <p></p>
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