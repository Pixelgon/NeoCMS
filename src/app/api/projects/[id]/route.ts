import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async ( req: NextRequest, context: { params: { id: string } } ) => {
   const params = await context.params;   
   const id = params.id;
   try {
      const project = await prisma.project.findUnique({
         where: { id },
         include: {
            tags: {
               select: {
                  tag: {
                     select: {
                        id: true,
                        name: true,
                     },
                  },
               },
            },
         },
      });

      if (!project) {
         return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({
         ...project,
         tags: project.tags.map((t) => t.tag), // extrahuje jen { id, name }
      });   
} catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
};

export const PUT = async (req: NextRequest, context: { params: { id: string } }) => {
   const params = await context.params;
   const id = params.id;
   const session = await auth(); // Získání uživatelské session

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const { name, body, description, background, photo, slug, tags } = await req.json();

      if (!name || !body || !description || !background || !photo || !slug) {
         return NextResponse.json({ error: "Všechna pole jsou povinná." }, { status: 400 });
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
               deleteMany: {},
               create: tags.map((tagId: string) => ({
                  tag: {
                     connect: { id: tagId }
                  }
               }))
            },
         },
      });
      return NextResponse.json(project, { status: 200 }  );
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}