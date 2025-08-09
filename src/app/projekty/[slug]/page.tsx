import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Section } from "@/components/layout/section";
import { Btn } from "@/components/layout/btn";

const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";

async function getProject(slug: string) {
    const session = await auth(); 
    const whereCondition = session?.user 
        ? { slug } 
        : { slug, visible: true };

    const project = await prisma.project.findUnique({
        where: whereCondition,
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
        },
    });

    if (project) {
        return project;
    } else {
        notFound();
    }
}

type tParams = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: tParams }): Promise<Metadata> {
    const { slug } = await props.params;
    
    try {
        const project = await getProject(slug);
        
        const keywords = project.tags.map(tag => tag.tag.name).join(", ");

        return {
            metadataBase: new URL(baseUrl),
            title: `${project.name} | Pixelgon`,
            description: project.description,
            openGraph: {
                title: `${project.name} | Pixelgon`,
                description: project.description,
                type: "article",
                url: `${baseUrl}/projekty/${slug}`,
                images: [
                    {
                        url: project.photo,
                        width: 1200,
                        height: 630,
                        alt: project.name,
                    },
                ],
                publishedTime: project.createdOn.toISOString(),
                modifiedTime: project.lastModified.toISOString(),
                tags: project.tags.map(tag => tag.tag.name),
            },
            alternates: {
                canonical: `${baseUrl}/projekty/${slug}`,
            },
            keywords: keywords,
        };
    } catch (error) {
        return {
            title: "Projekt nenalezen | Pixelgon",
            description: "Požadovaný projekt nebyl nalezen.",
        };
    }
}

export default async function ProjectDetail(props: { params: tParams }) {
    const { slug } = await props.params;
    const project = await getProject(slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.name,
        "description": project.description,
        "image": project.photo,
        "url": `${baseUrl}/projekty/${slug}`,
        "dateCreated": project.createdOn.toISOString(),
        "dateModified": project.lastModified.toISOString(),
        "author": {
            "@type": "Organization",
            "name": "Pixelgon",
            "url": baseUrl
        },
        "keywords": project.tags.map(tag => tag.tag.name).join(", "),
        "creator": {
            "@type": "Organization",
            "name": "Pixelgon"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header bg={project.background} title={project.name} />
            <main>
                <Section isPrim>
                        <div dangerouslySetInnerHTML={{ __html: project.body }}></div>
                        <div className={'flex flex-wrap gap-4'}>
                            <Btn href={`/projekty`} prim>Zpět na projekty</Btn>
                            {project.tags.map((tag) => (
                                <Btn href={`/projekty?tag=${tag.tag.slug}`} key={tag.tag.id} className={'!w-auto'}>
                                    {tag.tag.name}
                                </Btn>
                            ))}
                        </div>
                </Section>
            </main>
        </>
    );
}
