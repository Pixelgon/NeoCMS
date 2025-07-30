import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async ( req: NextRequest, context: { params: { id: string } } ) => {
   const params = await context.params;   
   const id = params.id;
   const session = await auth(); // Získání uživatelské session
   
   try {
      // Pokud je uživatel přihlášený, může vidět i skryté projekty
      const whereCondition = session?.user 
         ? { id } 
         : { id, visible: true };

      const project = await prisma.project.findUnique({
         where: whereCondition,
         include: {
            tags: {
               select: {
                  tag: {
                     select: {
                        id: true,
                        name: true,
                        slug: true,
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

      // Validace tags
      if (!Array.isArray(tags)) {
         console.error('Tags is not an array:', tags);
         return NextResponse.json({ error: "Tags musí být pole." }, { status: 400 });
      }

      // Ověř unikátnost slug (kromě aktuálního projektu)
      const existingProject = await prisma.project.findFirst({
         where: { 
            slug,
            NOT: { id }
         }
      });
      
      if (existingProject) {
         return NextResponse.json({ error: "Projekt s tímto slug již existuje." }, { status: 400 });
      }

      // Získej aktuální projekt pro porovnání obrázků
      const currentProject = await prisma.project.findUnique({
         where: { id },
         select: { photo: true, background: true }
      });

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
         include: {
            tags: {
               select: {
                  tag: {
                     select: {
                        id: true,
                        name: true,
                        slug: true,
                     },
                  },
               },
            },
         },
      });

      // Smaže staré obrázky, pokud byly změněny
      if (currentProject) {
         const fs = require('fs');
         const path = require('path');
         
         if (currentProject.photo !== photo && currentProject.photo.startsWith('/uploads/')) {
            const oldPhotoPath = path.join(process.cwd(), 'public', currentProject.photo);
            if (fs.existsSync(oldPhotoPath)) {
               fs.unlinkSync(oldPhotoPath);
            }
         }
         
         if (currentProject.background !== background && currentProject.background.startsWith('/uploads/')) {
            const oldBackgroundPath = path.join(process.cwd(), 'public', currentProject.background);
            if (fs.existsSync(oldBackgroundPath)) {
               fs.unlinkSync(oldBackgroundPath);
            }
         }
      }

      return NextResponse.json({
         ...project,
         tags: project.tags.map((t) => t.tag),
      }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}

export const DELETE = async (req: NextRequest, context: { params: { id: string } }) => {
   const params = await context.params;
   const id = params.id;
   const session = await auth(); // Získání uživatelské session

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      await prisma.projectTag.deleteMany({
         where: { projectId: id }
      });
      const projectImgs = await prisma.project.findUnique({
         where: { id },
         select: { photo: true, background: true }});
      const project = await prisma.project.delete({
         where: { id },
      });
      // Smaže soubory z public/uploads/images
      if (projectImgs) {
         const fs = require('fs');
         const path = require('path');
         const photoPath = path.join(process.cwd(), 'public', projectImgs.photo);
         const backgroundPath = path.join(process.cwd(), 'public', projectImgs.background);
         if (fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath);
         }
         if (fs.existsSync(backgroundPath)) {
            fs.unlinkSync(backgroundPath);
         }
      }
      return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
   } catch (error) {
      console.error("Error deleting project:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
};

// toggle visibility
export const PATCH = async (req: NextRequest, context: { params: { id: string } }) => {
   const params = await context.params;
   const id = params.id;
   const session = await auth(); // Získání uživatelské session

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const existingProject = await prisma.project.findUnique({
         where: { id },
         select: { visible: true }
      });
      
      if (!existingProject) {
         return NextResponse.json({ error: "Projekt nenaleze" }, { status: 404 });
      }

      const updatedProject = await prisma.project.update({
         where: { id },
         data: { visible: !existingProject.visible },
      });

      return NextResponse.json({ project: updatedProject }, { status: 200 });
   } catch (error) {
      console.error("Error updating project:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}