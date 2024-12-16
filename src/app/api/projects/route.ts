import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async () => {
   const projects = await prisma.project.findMany();

   if(projects.length === 0)
   {
      return NextResponse.json({ error: "No projects found" }, { status: 404 });
   }
   return NextResponse.json(projects);
};

export const POST = auth(async (req) => {
   if (!req.auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { title, body, description, background, photo, slug } = await req.json();

   if (!title || !body || !slug) {
      return NextResponse.json({ error: "Title, body, and slug are required" }, { status: 400 });
   }

   const project = await prisma.project.create({
      data: {
         title,
         body,
         description,
         background,
         photo,
         slug,
      },
   });

   return NextResponse.json(project, { status: 201 });
});

export const PUT = auth(async (req) => {
   if (!req.auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { id, title, body, description, background, photo, slug } = await req.json();

   if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
   }

   const project = await prisma.project.update({
      where: { id },
      data: {
         title,
         body,
         description,
         background,
         photo,
         slug,
      },
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

   const project = await prisma.project.delete({
      where: { id },
   });

   return NextResponse.json(project);
});