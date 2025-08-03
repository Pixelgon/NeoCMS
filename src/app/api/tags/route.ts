import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import createTagSlug from "@/utils/tag/createTagSlug";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
      try {
         const tags = await prisma.tag.findMany({
               orderBy: { name: "asc" },
               select: {
                  id: true,
                  name: true,
               }
         });
         return NextResponse.json(tags);
      } catch (error) {
         return NextResponse.json({ error: "Failed to fetch tags." }, { status: 500 });
      }
}

export const POST = async (req: NextRequest) => {
   const session = await auth();

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const { name } = await req.json();
      if (!name) {
         return NextResponse.json({ error: "Tag name is required." }, { status: 400 });
      }

      const tag = await prisma.tag.create({
         data: { name, slug: createTagSlug(name) },
      });

      return NextResponse.json(tag, { status: 201 });
   } catch (error) {
      return NextResponse.json({ error: "Failed to create tag." }, { status: 500 });
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
         return NextResponse.json({ error: "Tag ID is required." }, { status: 400 });
      }

      const tag = await prisma.tag.delete({
         where: { id },
      });

      return NextResponse.json(tag, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: "Failed to delete tag." }, { status: 500 });
   }
}

export const PUT = async (req: NextRequest) => {
   const session = await auth();

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const { id, name } = await req.json();
      if (!id || !name) {
         return NextResponse.json({ error: "Tag ID and name are required." }, { status: 400 });
      }

      const tag = await prisma.tag.update({
         where: { id },
         data: { name, slug: createTagSlug(name) },
      });

      return NextResponse.json(tag, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: "Failed to update tag." }, { status: 500 });
   }
};
