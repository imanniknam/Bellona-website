"use client";

import { useState } from "react";
import Link from "next/link";
import { BellonaButton } from "@/components/bellona";
import { AuthField } from "@/components/auth/AuthField";
import { AUTOMATION_GOALS, COMPANY_SIZES, ROUTES } from "@/lib/constants";

export function GetStartedForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    size: COMPANY_SIZES[0],
    goal: AUTOMATION_GOALS[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.company.trim()) next.company = "Company name is required";

    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 rounded-full bg-bellona-cyan/15 border border-bellona-cyan/25 flex items-center justify-center mx-auto mb-4">
          <span className="text-bellona-cyan text-xl">✓</span>
        </div>
        <p className="font-display font-semibold text-bellona-white mb-2">You&apos;re on the list</p>
        <p className="text-prose text-sm">
          Our team will reach out within 24 hours to schedule your free AI strategy audit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <AuthField
        label="Full name"
        name="name"
        autoComplete="name"
        placeholder="Alex Morgan"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
      />
      <AuthField
        label="Work email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <AuthField
        label="Company"
        name="company"
        autoComplete="organization"
        placeholder="Acme Inc."
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
        error={errors.company}
      />
      <AuthField
        label="Company size"
        as="select"
        name="size"
        value={form.size}
        onChange={(e) => update("size", e.target.value)}
        options={COMPANY_SIZES}
      />
      <AuthField
        label="What do you need help with?"
        as="select"
        name="goal"
        value={form.goal}
        onChange={(e) => update("goal", e.target.value)}
        options={AUTOMATION_GOALS}
      />
      <AuthField
        label="Anything else? (optional)"
        as="textarea"
        name="message"
        placeholder="Tell us about your current workflows or pain points…"
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />

      <p className="text-xs text-bellona-muted font-body leading-relaxed">
        By submitting, you agree to be contacted about Bellona services. No spam — ever.
      </p>

      <BellonaButton type="submit" size="lg" className="w-full">
        Book Free Audit
      </BellonaButton>
    </form>
  );
}

export function GetStartedFooter() {
  return (
    <>
      Already a client?{" "}
      <Link href={ROUTES.login} className="text-bellona-cyan hover:text-bellona-white transition-colors font-medium">
        Sign in
      </Link>
    </>
  );
}
