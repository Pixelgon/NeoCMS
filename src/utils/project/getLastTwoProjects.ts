import { prisma } from "@/lib/prisma";

async function  GetLastTwoProjects() {
      const projects = await prisma.project.findMany({
         orderBy: { createdOn: "desc" },
         where: { visible: true },
         take: 2,
         select: {
               name: true,
               slug: true,
               photo: true,
               description: true,
         }
      });
      return projects;
}

export default GetLastTwoProjects;