import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { BRAND } from "@/lib/constants";

type Locale = "en" | "fa";

function getGmailUser() {
  return (process.env.GMAIL_USER ?? BRAND.leadEmail).trim();
}

function getGmailPassword() {
  return process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "") ?? "";
}

function getTransporter() {
  const user = getGmailUser();
  const pass = getGmailPassword();

  if (!pass) {
    throw new Error("GMAIL_APP_PASSWORD is not configured");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  } satisfies SMTPTransport.Options);
}

function assertSent(info: SMTPTransport.SentMessageInfo, label: string) {
  if (info.rejected?.length) {
    throw new Error(`${label} rejected: ${info.rejected.join(", ")}`);
  }
  if (!info.messageId) {
    throw new Error(`${label} failed: no message id returned`);
  }
}

const customerCopy = {
  en: {
    subject: "We received your request — Bellona",
    heading: "Thanks for reaching out",
    body: "We received your request to get started with Bellona. Our team will review it and contact you shortly.",
    footer: "If you did not submit this, you can ignore this email.",
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
  const transporter = getTransporter();
  const from = getGmailUser();
  const submittedAt = new Date().toISOString();

  await transporter.verify();

  const teamInfo = await transporter.sendMail({
    from: { name: BRAND.name, address: from },
    to: BRAND.leadEmail,
    replyTo: customerEmail,
    subject: `[Bellona Lead] ${customerEmail}`,
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
  assertSent(teamInfo, "Team notification");

  const copy = customerCopy[locale];
  const customerInfo = await transporter.sendMail({
    from: { name: BRAND.name, address: from },
    to: customerEmail,
    replyTo: BRAND.leadEmail,
    subject: copy.subject,
    html: customerHtml(locale),
    text: `${copy.heading}\n\n${copy.body}\n\n${copy.footer}`,
  });
  assertSent(customerInfo, "Customer confirmation");

  console.info("Lead emails sent", {
    teamMessageId: teamInfo.messageId,
    customerMessageId: customerInfo.messageId,
    customerEmail,
  });
}
