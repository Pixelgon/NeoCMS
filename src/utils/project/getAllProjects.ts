import { prisma } from "@/lib/prisma";

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
            lastModified: true,
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

export default getAllProjects;