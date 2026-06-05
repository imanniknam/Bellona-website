import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { GetStartedForm, GetStartedFooter } from "@/components/auth/GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Book your free AI strategy audit and start building your AI workforce with Bellona.",
};

export default function GetStartedPage() {
  return (
    <AuthShell
      title="Start your AI workforce"
      subtitle="Tell us about your business and we'll map out exactly where AI can save you time, money, and headaches."
      footer={<GetStartedFooter />}
    >
      <GetStartedForm />
    </AuthShell>
  );
}
