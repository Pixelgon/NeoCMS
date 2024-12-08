import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// priklad authorizace
export const GET = auth(async (req) => {
   if(req.auth)
   {
      const projects = await prisma.project.findMany();

      if(projects.length === 0)
      {
         return NextResponse.json({ error: "No projects found" }, { status: 404 });
      }
      return NextResponse.json(projects);
   }
   return NextResponse.json({ error: "You don't have permission" }, { status: 403 });
});