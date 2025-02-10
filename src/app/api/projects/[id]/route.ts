import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
   try {
      const project = await prisma.project.findUnique({
         where: { id: params.id },
         include: {
            tags: {
               include: {
                  tag: true,
               },
            },
         },
      });

      if (!project) {
         return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      // Převod tagů na požadovaný formát
      const formattedProject = {
         ...project,
         tags: project.tags.map((projectTag) => ({
            id: projectTag.tag.id,
            name: projectTag.tag.name,
         })),
      };

      return NextResponse.json(formattedProject);
   } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
};