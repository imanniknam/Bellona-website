import { sendLeadEmails } from "@/lib/email";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; locale?: string; _honey?: string };

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

  const locale = body.locale === "fa" ? "fa" : "en";

  try {
    await sendLeadEmails({ customerEmail: email, locale });
  } catch (error) {
    console.error("Lead email failed:", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
