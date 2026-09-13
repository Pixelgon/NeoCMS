import {
  checkContactRateLimit,
  formatContactEmailHtml,
  getContactClientKey,
  validateContactInput,
} from '@/lib/contactSecurity';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const MAX_REQUEST_BYTES = 12 * 1024;

class RequestTooLargeError extends Error {}

const readLimitedJson = async (req: Request) => {
  const declaredLength = Number.parseInt(req.headers.get('content-length') || '0', 10);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    throw new RequestTooLargeError();
  }

  if (!req.body) throw new SyntaxError('Missing request body');

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new RequestTooLargeError();
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body)) as unknown;
};

const hasAllowedOrigin = (req: Request) => {
  const origin = req.headers.get('origin');
  if (!origin) return true;

  try {
    const allowedOrigins = new Set([new URL(req.url).origin]);
    const configuredBaseUrl = process.env.BASE_URL;

    if (configuredBaseUrl) {
      allowedOrigins.add(new URL(configuredBaseUrl).origin);
    }

    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
};

export async function POST(req: Request) {
  if (!hasAllowedOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 });
  }

  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
  }

  const rateLimit = checkContactRateLimit(getContactClientKey(req.headers));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  try {
    const formData = await readLimitedJson(req);
    const validation = validateContactInput(formData);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (validation.honeypot) {
      return NextResponse.json({ success: true });
    }

    const { name, address, message } = validation.fields;
    const transporter = nodemailer.createTransport({
      host: 'smtp.seznam.cz',
      port: 465,
      secure: true,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Pixelgon" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: address,
      subject: `Nová zpráva z kontaktního formuláře od ${name}`,
      text: `Jméno: ${name}\nEmail: ${address}\n\n${message}`,
      html: formatContactEmailHtml(validation.fields),
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    return NextResponse.json(
      { success: true },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    if (error instanceof RequestTooLargeError) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    if (error instanceof SyntaxError || error instanceof TypeError) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
