import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
   const projects = await prisma.project.findMany({
      orderBy: { createdOn: "desc" },
      include: { tags: { select: { tag: true } } },
   });

   return NextResponse.json(projects);
};

export const POST = async (req: NextRequest) => {
   const session = await auth(); // Získání uživatelské session

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const { name, body, description, background, photo, slug, tags } = await req.json();

      if (!name || !slug) {
         return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
      }

      if(session.user.id) {
         const project = await prisma.project.create({
            data: {
               name,
               body,
               description,
               background,
               photo,
               slug,
               tags: {
                  connect: tags.map((tagId: string) => ({ id: tagId }))
               }
            }
         });
         return NextResponse.json(project, { status: 201 });
      }
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
};

export const PUT = async (req: NextRequest) => {
   const session = await auth();
   
   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const { id, name, body, description, background, photo, slug, tags } = await req.json();

      if (!id) {
         return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }

      const projectExists = await prisma.project.findUnique({ where: { id } });
      if (!projectExists) {
         return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      const project = await prisma.project.update({
         where: { id },
         data: {
            name,
            body,
            description,
            background,
            photo,
            slug,
            tags: {
               set: tags.map((tagId: string) => ({ id: tagId }))
            }
         },
      });

      return NextResponse.json(project);
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
};

export const DELETE = async (req: NextRequest) => {
   const session = await auth();
   
   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
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
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
};