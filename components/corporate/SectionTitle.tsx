import type { ReactNode } from "react";

// セクション共通の見出し。
// 英語の小さなラベル（eyebrow）＋日本語の見出し（明朝）で「静かに強い」声をつくる。
export function SectionTitle({
  eyebrow,
  heading,
  lead,
  align = "left",
  tone = "default",
  id,
}: {
  eyebrow: string;
  heading?: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  id?: string;
}) {
  const isCenter = align === "center";
  const eyebrowText = tone === "light" ? "text-white/70" : "text-ai";
  const eyebrowLine = tone === "light" ? "bg-white/30" : "bg-ai/40";
  const headingText = tone === "light" ? "text-white" : "text-ink";
  const leadText = tone === "light" ? "text-white/75" : "text-muted";

  return (
    <div className={isCenter ? "flex flex-col items-center text-center" : ""}>
      <div className="flex items-center gap-3" id={id}>
        <span className={`h-px w-8 ${eyebrowLine}`} aria-hidden="true" />
        <span
          className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${eyebrowText}`}
        >
          {eyebrow}
        </span>
        {isCenter && <span className={`h-px w-8 ${eyebrowLine}`} aria-hidden="true" />}
      </div>
      {heading && (
        <h2
          className={`mt-5 font-display text-[26px] font-medium leading-snug tracking-tight sm:text-[32px] ${headingText}`}
        >
          {heading}
        </h2>
      )}
      {lead && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-relaxed ${leadText}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
