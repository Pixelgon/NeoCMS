import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

interface RouteParams {
  params: Promise<{ path: string[] }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { path: pathArray } = await params;
    const filePath = path.join(process.cwd(), 'uploads', ...pathArray);
    
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath).slice(1);
    
    const mimeTypes: { [key: string]: string } = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml'
    };

    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving upload:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}