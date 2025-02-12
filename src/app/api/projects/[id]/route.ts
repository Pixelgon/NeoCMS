import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
   const { searchParams } = new URL(req.url);
   const id = searchParams.get("id");

   if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
   }

   try {
      const project = await prisma.project.findUnique({
         where: { id },
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