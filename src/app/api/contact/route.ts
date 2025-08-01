import { FormType } from '@/types/FormType';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const formData: FormType = await req.json();
  const { name, address, message, email } = formData;

  if (!formData.name || !formData.address || !formData.message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if(formData.email) {
    console.log("Honeypot field detected, ignoring email submission.");
    return NextResponse.json({ success : true });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.seznam.cz', 
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Pixelgon" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Nová zpráva z kontaktního formuláře od ${name}`,
      text: message,
      html: `<p><strong>Jméno:</strong> ${name}</p><p><strong>Email:</strong> ${address}</p><p><strong>Zpráva:</strong><br/>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}