import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";

function sanitizeFilename(name: string) {
  // keep only safe chars
  const safe = name.replace(/[^a-zA-Z0-9._-]/g, "_");
  return safe.length ? safe : "file";
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    const safeOriginal = sanitizeFilename(file.name);
    const filename = `${Date.now()}-${safeOriginal}`;

    const uploadDir = path.resolve(
      process.cwd(),
      process.env.UPLOAD_IMAGES_DIR || "public/uploads/images"
    );
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return NextResponse.json(
      { url: `/uploads/images/${filename}` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
