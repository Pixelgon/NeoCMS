import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// save multiple blocks at once (used for "Save all" button)
export const POST = async (req: Request) => {
  const session = await auth(); // Získání uživatelské session

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blocks } = await req.json();

    // Validate input
    if (
      !Array.isArray(blocks) ||
      blocks.some((b) => typeof b.id !== "string" || typeof b.html !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid input format" },
        { status: 400 },
      );
    }

    // Perform batch update using Prisma's upsert
    const updatePromises = blocks.map(({ id, html }) =>
      prisma.block.upsert({
        where: { id },
        update: { html },
        create: { id, html },
      }),
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
