import { prisma } from "@/lib/prisma";

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

export default getAllTags; 