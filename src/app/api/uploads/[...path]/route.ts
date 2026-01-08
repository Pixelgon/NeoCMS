import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ path: string[] }>;
}

const uploadDir = path.resolve(
  process.cwd(),
  process.env.UPLOAD_IMAGES_DIR || "public/uploads/images"
);

function resolveInUploads(parts: string[]) {
  const cleaned = parts
    .filter(Boolean)
    .map((p) => p.replace(/\\/g, "/"))
    .filter((p) => p !== "." && p !== "..");

  const base = path.resolve(uploadDir);
  const full = path.resolve(base, ...cleaned);

  if (!full.startsWith(base + path.sep) && full !== base) {
    throw new Error("Invalid path");
  }

  return full;
}

const mimeTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { path: pathArray } = await params;

    const filePath = resolveInUploads(pathArray);
    await fs.unlink(filePath);

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting upload:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
