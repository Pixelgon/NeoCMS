import { Header } from "@/Components/Header";
import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Section } from "@/Components/Layout/section";

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

  if (!project) {
    notFound();
  }

  // Převod tagů na požadovaný formát
  const formattedProject = {
    ...project,
    tags: project.tags.map((projectTag) => ({
      id: projectTag.tag.id,
      name: projectTag.tag.name,
    })),
  };

  return formattedProject;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: "Projekt nenalezen",
      description: "Projekt nenalezen",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  });

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    return <p>Projekt nenalezen</p>;
  }

  return (
    <>
      <Header bg={project.background} title={project.title} />
      <main>
        <Section isPrim>
         <div dangerouslySetInnerHTML={{ __html: project.body }}></div>
         <ul>
            {project.tags.map((tag: { id: string; name: string }) => (
               <li key={tag.id}>{tag.name}</li>
            ))}
         </ul>
        </Section>
      </main>
    </>
  );
}