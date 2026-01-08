import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";

const MAX_UPLOAD_BYTES = Number.parseInt(
  process.env.MAX_UPLOAD_BYTES || "10485760",
  10
);

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
]);

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg"]);

const UPLOAD_BASE_DIR = path.resolve(
  process.cwd(),
  process.env.UPLOAD_BASE_DIR || "public/uploads"
);

function sanitizePathSegment(segment: string) {
  const cleaned = segment.replace(/\\/g, "/").trim();
  if (!cleaned || cleaned === "." || cleaned === "..") return null;
  if (!/^[a-zA-Z0-9._-]+$/.test(cleaned)) return null;
  return cleaned;
}

function resolveInUploads(relativePath: string) {
  const raw = relativePath.replace(/\\/g, "/");
  const parts = raw.split("/").filter(Boolean);
  const cleanedParts: string[] = [];

  for (const part of parts) {
    const safe = sanitizePathSegment(part);
    if (!safe) throw new Error("Invalid path");
    cleanedParts.push(safe);
  }

  const base = path.resolve(UPLOAD_BASE_DIR);
  const full = path.resolve(base, ...cleanedParts);
  if (!full.startsWith(base + path.sep) && full !== base) {
    throw new Error("Invalid path");
  }

  return { full, cleanedParts };
}

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

    const uploadPathField = formData.get("path");
    if (typeof uploadPathField !== "string" || !uploadPathField.trim().length) {
      return NextResponse.json(
        { error: "Missing path" },
        { status: 400 }
      );
    }
    const uploadPath = uploadPathField.trim();

    if (Number.isFinite(MAX_UPLOAD_BYTES) && file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "File too large" },
        { status: 413 }
      );
    }

    const ext = path.extname(file.name).slice(1).toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 415 }
      );
    }

    if (file.type && !ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const safeOriginal = sanitizeFilename(file.name);
    const filename = `${Date.now()}-${crypto.randomUUID()}-${safeOriginal}`;

    const { full: uploadDir, cleanedParts } = resolveInUploads(uploadPath);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const urlPath = cleanedParts.join("/");

    return NextResponse.json(
      { url: `/api/uploads/${urlPath}/${filename}` },
      { status: 201 }
    );
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err?.message === "Invalid path") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
