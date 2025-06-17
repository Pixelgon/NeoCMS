import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
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
  const uploadDir = path.join(process.cwd(), "public", "uploads", "images");
  const filePath = path.join(uploadDir, filename);

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/images/${filename}` });
}