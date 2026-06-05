"use client";

import { cn } from "@/lib/utils";

interface AuthFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  options?: readonly string[];
}

export function AuthField({
  label,
  error,
  as = "input",
  options,
  className,
  id,
  ...props
}: AuthFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const baseClass = cn(
    "w-full rounded-xl bg-white/[0.04] border border-white/[0.1] px-4 py-3",
    "text-sm text-bellona-white placeholder:text-bellona-muted/60",
    "transition-all duration-300 outline-none",
    "focus:border-bellona-blue/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-bellona-blue/20",
    error && "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20",
    className
  );

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="block text-sm font-medium text-bellona-white font-body">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={fieldId} className={cn(baseClass, "min-h-[100px] resize-y")} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === "select" ? (
        <select id={fieldId} className={cn(baseClass, "cursor-pointer")} {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}>
          {options?.map((opt) => (
            <option key={opt} value={opt} className="bg-bellona-card text-bellona-white">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input id={fieldId} className={baseClass} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="text-xs text-red-400 font-body">{error}</p>}
    </div>
  );
}
