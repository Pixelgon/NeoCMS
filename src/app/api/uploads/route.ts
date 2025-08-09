import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const session = await auth();
    
    if (!session || !session.user) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = Date.now() + "-" + file.name.replace(/\s/g, "_");
    const uploadDir = path.join(process.cwd(), ".", "uploads", "images");
    const filePath = path.join(uploadDir, filename);

    // Vytvoří složku, pokud neexistuje
    await mkdir(uploadDir, { recursive: true });
    
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/api/uploads/images/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}