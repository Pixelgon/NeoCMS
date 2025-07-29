import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
   const { searchParams } = new URL(req.url);
   const page = parseInt(searchParams.get('page') || '1');
   const limit = parseInt(searchParams.get('limit') || '4');
   const skip = (page - 1) * limit;

   try {
      const [projects, totalCount] = await Promise.all([
         prisma.project.findMany({
            orderBy: { createdOn: "desc" },
            skip,
            take: limit,
            select: {
               id: true,
               name: true,
               slug: true,
               photo: true,
               description: true,
               tags: {
                  select: {
                     tag: {
                        select: {
                           id: true,
                           name: true
                        }
                     }
                  }
               }
            }
         }),
         prisma.project.count()
      ]);

      const hasMore = skip + limit < totalCount;

      return NextResponse.json({
         projects: projects.map(project => ({
            ...project,
            tags: project.tags.map((t) => t.tag)
         })),
         hasMore,
         totalCount,
         currentPage: page
      });
   } catch (error) {
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
   }
};

export const POST = async (req: NextRequest) => {
   const session = await auth(); // Získání uživatelské session

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const { name, body, description, background, photo, slug, tags } = await req.json();
      
      console.log('POST /api/projects - Data received:', { name, body, description, background, photo, slug, tags });
      
      if (!name || !body || !description || !background || !photo || !slug) {
         return NextResponse.json({ error: "Všechna pole jsou povinná." }, { status: 400 });
      }

      // Validace tags
      if (!Array.isArray(tags)) {
         console.error('Tags is not an array:', tags);
         return NextResponse.json({ error: "Tags musí být pole." }, { status: 400 });
      }

      // Ověř unikátnost slug
      const existingProject = await prisma.project.findUnique({
         where: { slug }
      });
      
      if (existingProject) {
         return NextResponse.json({ error: "Projekt s tímto slug již existuje." }, { status: 400 });
      }

      const project = await prisma.project.create({
         data: {
            name,
            body,
            description,
            background,
            photo,
            slug,
            tags: {
               create: tags.map((tagId: string) => ({
                  tag: {
                     connect: { id: tagId }
                  }
               }))
            }
         },
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
      
      return NextResponse.json({
         ...project,
         tags: project.tags.map((t) => t.tag),
      }, { status: 201 });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
};

