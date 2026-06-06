import { BRAND } from "@/lib/constants";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; _honey?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (body._honey) {
    return NextResponse.json({ ok: true });
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(BRAND.leadEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        _subject: "New Get Started lead — bellonaagency.com",
        _template: "table",
        _captcha: "false",
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
