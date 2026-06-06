import { Resend } from "resend";
import { BRAND } from "@/lib/constants";

type Locale = "en" | "fa";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL ??
    `${BRAND.name} <onboarding@resend.dev>`
  );
}

const customerCopy = {
  en: {
    subject: "We received your request — Bellona",
    heading: "Thanks for reaching out",
    body: "We received your request to get started with Bellona. Our team will review it and contact you shortly.",
    footer: `If you did not submit this, you can ignore this email.`,
  },
  fa: {
    subject: "درخواست شما ثبت شد — بلونا",
    heading: "ممنون از تماس شما",
    body: "درخواست شروع همکاری با بلونا ثبت شد. تیم ما به‌زودی با شما تماس می‌گیرد.",
    footer: "اگر این درخواست را شما ارسال نکرده‌اید، این ایمیل را نادیده بگیرید.",
  },
} as const;

function customerHtml(locale: Locale) {
  const copy = customerCopy[locale];
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 12px;">${copy.heading}</h2>
      <p style="margin: 0 0 16px;">${copy.body}</p>
      <p style="margin: 0; color: #666; font-size: 14px;">${copy.footer}</p>
    </div>
  `;
}

export async function sendLeadEmails({
  customerEmail,
  locale,
}: {
  customerEmail: string;
  locale: Locale;
}) {
  const resend = getResend();
  const from = getFromAddress();
  const submittedAt = new Date().toISOString();

  const teamResult = await resend.emails.send({
    from,
    to: BRAND.leadEmail,
    replyTo: customerEmail,
    subject: `New Get Started lead — ${BRAND.domain}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin: 0 0 12px;">New lead from ${BRAND.domain}</h2>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${customerEmail}</p>
        <p style="margin: 0 0 8px;"><strong>Locale:</strong> ${locale}</p>
        <p style="margin: 0;"><strong>Submitted at:</strong> ${submittedAt}</p>
      </div>
    `,
    text: `New lead from ${BRAND.domain}\nEmail: ${customerEmail}\nLocale: ${locale}\nSubmitted at: ${submittedAt}`,
  });

  if (teamResult.error) {
    throw new Error(teamResult.error.message);
  }

  const copy = customerCopy[locale];
  const customerResult = await resend.emails.send({
    from,
    to: customerEmail,
    replyTo: BRAND.leadEmail,
    subject: copy.subject,
    html: customerHtml(locale),
    text: `${copy.heading}\n\n${copy.body}\n\n${copy.footer}`,
  });

  if (customerResult.error) {
    throw new Error(customerResult.error.message);
  }
}
