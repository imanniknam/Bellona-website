"use client";

import { useState } from "react";
import Link from "next/link";
import { BellonaButton } from "@/components/bellona";
import { AuthField } from "@/components/auth/AuthField";
import { ROUTES } from "@/lib/constants";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Password must be at least 6 characters";

    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-400 text-xl">✓</span>
        </div>
        <p className="font-display font-semibold text-bellona-white mb-2">Welcome back</p>
        <p className="text-prose text-sm">Signing you in to your Bellona dashboard…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <AuthField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <AuthField
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <div className="flex items-center justify-between text-sm font-body">
        <label className="flex items-center gap-2 text-bellona-muted cursor-pointer">
          <input type="checkbox" className="rounded border-white/20 bg-white/5 text-bellona-blue focus:ring-bellona-blue/30" />
          Remember me
        </label>
        <button type="button" className="text-bellona-cyan hover:text-bellona-white transition-colors">
          Forgot password?
        </button>
      </div>

      <BellonaButton type="submit" size="lg" className="w-full">
        Sign In
      </BellonaButton>
    </form>
  );
}

export function LoginFooter() {
  return (
    <>
      Don&apos;t have an account?{" "}
      <Link href={ROUTES.getStarted} className="text-bellona-cyan hover:text-bellona-white transition-colors font-medium">
        Get Started
      </Link>
    </>
  );
}
