import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, context: { params: { id: string } }) => {
    const params = await context.params;   
    const id = params.id;
    try {
        const tag = await prisma.tag.findUnique({
            where: { id },
        });

        if (!tag) {
            return NextResponse.json({ error: "Tag not found" }, { status: 404 });
        }
        return NextResponse.json(tag);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}