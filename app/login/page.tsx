import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm, LoginFooter } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Bellona client dashboard and manage your AI automation systems.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your Bellona dashboard, track automations, and manage your AI systems."
      footer={<LoginFooter />}
    >
      <LoginForm />
    </AuthShell>
  );
}
