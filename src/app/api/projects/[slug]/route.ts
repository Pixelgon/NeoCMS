import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: { params: { slug: any; }; }) => {
   const project = await prisma.project.findUnique({
      where: { slug: req.params.slug },
   });

   if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
   }

   return NextResponse.json(project);
}