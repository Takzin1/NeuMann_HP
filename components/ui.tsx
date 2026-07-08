import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

type EyebrowTone = "ai" | "light";

export function Eyebrow({
  children,
  tone = "ai",
  className = "",
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  className?: string;
}) {
  const lineColor = tone === "light" ? "bg-white/30" : "bg-ai/40";
  const textColor = tone === "light" ? "text-white/70" : "text-ai";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px w-8 ${lineColor}`} aria-hidden="true" />
      <span
        className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${textColor}`}
      >
        {children}
      </span>
    </div>
  );
}
