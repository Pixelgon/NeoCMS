import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {
   const { searchParams } = new URL(req.url);

   const projects = await prisma.project.findMany({
      orderBy: { createdOn: "desc" }, // Seřazení od nejnovějších
      include: { tags: { select: { tag: true } } } // Včetně tagů
   });

   return NextResponse.json(projects);
};

export const POST = auth(async (req) => {
   if (!req.auth || !req.auth.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { name, body, description, background, photo, slug, tags } = await req.json();

   try {
      const project = await prisma.project.create({
         data: {
            name,
            body,
            description,
            background,
            photo,
            slug,
            userId: req.auth.user.id as string,
            tags: {
               create: tags.map((tagId: string) => ({
                  tag: { connect: { id: tagId } }
               }))
            }
         }
      });

      return NextResponse.json(project);
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
});

export const PUT = auth(async (req) => {
   if (!req.auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { id, name, body, description, background, photo, slug } = await req.json();

   if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
   }

   const projectExists = await prisma.project.findUnique({ where: { id } });
   if (!projectExists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
   }

   const project = await prisma.project.update({
      where: { id },
      data: { name, body, description, background, photo, slug },
   });

   return NextResponse.json(project);
});

export const DELETE = auth(async (req) => {
   if (!req.auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { id } = await req.json();

   if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
   }

   const projectExists = await prisma.project.findUnique({ where: { id } });
   if (!projectExists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
   }

   const project = await prisma.project.delete({
      where: { id },
   });

   return NextResponse.json({ message: "Project deleted successfully", project });
});