import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Readable } from "stream";

interface RouteParams {
  params: Promise<{ path: string[] }>;
}

const uploadDir = path.resolve(
  process.cwd(),
  process.env.UPLOAD_BASE_DIR || "public/uploads"
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

function buildWeakEtag(stat: { size: number; mtimeMs: number }) {
  return `W/\"${stat.size}-${Math.floor(stat.mtimeMs)}\"`;
}

function isNotModified(req: NextRequest, etag: string, lastModified: string) {
  const inm = req.headers.get("if-none-match");
  if (inm && inm.split(",").map((v) => v.trim()).includes(etag)) return true;

  const ims = req.headers.get("if-modified-since");
  if (ims && ims === lastModified) return true;

  return false;
}

async function serveFile(req: NextRequest, filePath: string) {
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) {
    return new NextResponse("File not found", { status: 404 });
  }

  const ext = path.extname(filePath).slice(1).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  const etag = buildWeakEtag(stat);
  const lastModified = new Date(stat.mtimeMs).toUTCString();

  const headers: HeadersInit = {
    "Content-Type": contentType,
    "Content-Length": String(stat.size),
    ETag: etag,
    "Last-Modified": lastModified,
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  if (isNotModified(req, etag, lastModified)) {
    return new Response(null, { status: 304, headers });
  }

  if (req.method === "HEAD") {
    return new Response(null, { status: 200, headers });
  }

  const nodeStream = createReadStream(filePath);
  const body = Readable.toWeb(nodeStream) as unknown as ReadableStream;
  return new Response(body, { status: 200, headers });
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { path: pathArray } = await params;

    const filePath = resolveInUploads(pathArray);
    return await serveFile(req, filePath);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err?.message === "Invalid path") {
      return new NextResponse("Invalid path", { status: 400 });
    }
    if (err?.code !== "ENOENT") {
      console.error("Error serving upload:", error);
    }
    return new NextResponse("File not found", { status: 404 });
  }
}

export async function HEAD(req: NextRequest, ctx: RouteParams) {
  return GET(req, ctx);
}

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
    const err = error as NodeJS.ErrnoException;
    if (err?.message === "Invalid path") {
      return new NextResponse("Invalid path", { status: 400 });
    }
    if (err?.code !== "ENOENT") {
      console.error("Error deleting upload:", error);
    }
    return new NextResponse("File not found", { status: 404 });
  }
}
