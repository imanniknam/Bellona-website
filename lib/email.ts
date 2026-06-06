import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { Resend } from "resend";
import { BRAND } from "@/lib/constants";

type Locale = "en" | "fa";

const customerCopy = {
  en: {
    subject: "Your Bellona inquiry",
    text: [
      "Hi,",
      "",
      `We received your request on ${BRAND.domain}.`,
      "A member of our team will follow up with you soon.",
      "",
      "If you did not submit this request, you can ignore this email.",
      "",
      "— Bellona",
      BRAND.leadEmail,
    ].join("\n"),
  },
  fa: {
    subject: "درخواست شما در بلونا",
    text: [
      "سلام،",
      "",
      `درخواست شما در ${BRAND.domain} ثبت شد.`,
      "به‌زودی یکی از اعضای تیم با شما تماس می‌گیرد.",
      "",
      "اگر این درخواست را شما ارسال نکرده‌اید، این ایمیل را نادیده بگیرید.",
      "",
      "— بلونا",
      BRAND.leadEmail,
    ].join("\n"),
  },
} as const;

function teamEmailText(customerEmail: string, locale: Locale, submittedAt: string) {
  return [
    "New website inquiry",
    "",
    `Email: ${customerEmail}`,
    `Locale: ${locale}`,
    `Submitted: ${submittedAt}`,
    `Website: ${BRAND.url}`,
  ].join("\n");
}

function canUseResend() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

function getGmailUser() {
  return (process.env.GMAIL_USER ?? BRAND.leadEmail).trim();
}

function getGmailPassword() {
  return process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "") ?? "";
}

function getGmailTransporter() {
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

async function sendViaResend({
  customerEmail,
  locale,
  submittedAt,
}: {
  customerEmail: string;
  locale: Locale;
  submittedAt: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL!;
  const copy = customerCopy[locale];

  const teamResult = await resend.emails.send({
    from,
    to: BRAND.leadEmail,
    replyTo: customerEmail,
    subject: `New inquiry: ${customerEmail}`,
    text: teamEmailText(customerEmail, locale, submittedAt),
  });

  if (teamResult.error) {
    throw new Error(teamResult.error.message);
  }

  const customerResult = await resend.emails.send({
    from,
    to: customerEmail,
    replyTo: BRAND.leadEmail,
    subject: copy.subject,
    text: copy.text,
  });

  if (customerResult.error) {
    throw new Error(customerResult.error.message);
  }

  console.info("Lead emails sent via Resend", {
    teamId: teamResult.data?.id,
    customerId: customerResult.data?.id,
    customerEmail,
  });
}

async function sendViaGmail({
  customerEmail,
  locale,
  submittedAt,
}: {
  customerEmail: string;
  locale: Locale;
  submittedAt: string;
}) {
  const transporter = getGmailTransporter();
  const from = getGmailUser();
  const copy = customerCopy[locale];

  await transporter.verify();

  const teamInfo = await transporter.sendMail({
    from: { name: BRAND.name, address: from },
    to: BRAND.leadEmail,
    replyTo: customerEmail,
    subject: `New inquiry: ${customerEmail}`,
    text: teamEmailText(customerEmail, locale, submittedAt),
    headers: {
      "X-Entity-Ref-ID": `lead-${Date.now()}`,
    },
  });
  assertSent(teamInfo, "Team notification");

  const customerInfo = await transporter.sendMail({
    from: { name: BRAND.name, address: from },
    to: customerEmail,
    replyTo: BRAND.leadEmail,
    subject: copy.subject,
    text: copy.text,
    headers: {
      "X-Entity-Ref-ID": `confirm-${Date.now()}`,
    },
  });
  assertSent(customerInfo, "Customer confirmation");

  console.info("Lead emails sent via Gmail", {
    teamMessageId: teamInfo.messageId,
    customerMessageId: customerInfo.messageId,
    customerEmail,
  });
}

export async function sendLeadEmails({
  customerEmail,
  locale,
}: {
  customerEmail: string;
  locale: Locale;
}) {
  const submittedAt = new Date().toISOString();

  if (canUseResend()) {
    await sendViaResend({ customerEmail, locale, submittedAt });
    return;
  }

  await sendViaGmail({ customerEmail, locale, submittedAt });
}
