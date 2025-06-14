import { Header } from "@/components/header/Index";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import Image from "next/image";

async function getProject(slug: string) {
    const project = await prisma.project.findUnique({
        where: { slug },
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

export default async function ProjectDetail(props: { params: tParams }) {
    const { slug } = await props.params;
    const project = await getProject(slug);

    if (!project) {
        return <p>Projekt nenalezen</p>;
    }

    return (
        <>
            <Header bg={project.background} title={project.name} />
            <main>
                <Section isPrim>
                    <Image src={project.photo} alt={project.name} fill className={'!relative aspect-[4/3] rounded-3xl object-cover'}/>
                    <div dangerouslySetInnerHTML={{ __html: project.body }}></div>
                    <ul>
                        {project.tags.map((tag) => (
                            <li key={tag.tag.id}>{tag.tag.name}</li>
                        ))}
                    </ul>
                </Section>
            </main>
        </>
    );
}
