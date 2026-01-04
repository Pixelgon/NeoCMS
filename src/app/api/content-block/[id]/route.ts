import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async ( 
   req: NextRequest, 
   { params }: { params: Promise<{ id: string }> }
) => {
   const { id } = await params;
   
   try {
      const block = await prisma.block.findUnique({
         where: { id },
      });

      if (!block) {
         return NextResponse.json({ error: "Content Block not found" }, { status: 404 });
      }

      return NextResponse.json(block);   
   } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
};

export const PUT = async (
   req: NextRequest, 
   { params }: { params: Promise<{ id: string }> }
) => {
   const { id } = await params;

   try {
      const { html } = await req.json();

      const updatedBlock = await prisma.block.upsert({
         where: { id },
         update: { html },
         create: { id, html },
      });

      return NextResponse.json(updatedBlock);   
   } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
};