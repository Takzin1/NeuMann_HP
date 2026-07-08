import Link from "next/link";
import { BackdropContours } from "@/components/BackdropContours";
import { hero } from "@/lib/site";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-line bg-paper"
      aria-labelledby="hero-heading"
    >
      {/* 背景: 等高線（地域・実証フィールドのメタファー）。可読性のため右側に薄く */}
      <BackdropContours className="pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-8 sm:pt-40 lg:px-10 lg:pb-20 lg:pt-44">
        <p className="flex items-center gap-3">
          <span className="h-px w-8 bg-ai/40" aria-hidden="true" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ai">
            {hero.eyebrow}
          </span>
        </p>

        <h1
          id="hero-heading"
          className="mt-7 font-display text-[34px] font-medium leading-[1.35] tracking-tight text-ink sm:text-[46px] lg:text-[54px]"
        >
          {hero.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-7 max-w-xl text-[15px] leading-[1.9] text-muted sm:text-base">
          {hero.sub}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={hero.ctaPrimary.href}
            className="focus-ring inline-flex items-center gap-2 rounded-sm bg-ai px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-ai-hover"
          >
            {hero.ctaPrimary.label}
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <Link
            href={hero.ctaSecondary.href}
            className="focus-ring inline-flex items-center rounded-sm border border-line bg-paper px-6 py-3.5 text-[14px] font-semibold text-ink transition-colors hover:border-ai/50 hover:text-ai"
          >
            {hero.ctaSecondary.label}
          </Link>
        </div>
      </div>

      {/* キーワードレール（さりげない配置） */}
      <div className="relative border-t border-line bg-paper/70">
        <ul
          className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 sm:px-8 lg:px-10"
          aria-label="事業キーワード"
        >
          {hero.keywords.map((kw) => (
            <li
              key={kw}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted/80"
            >
              {kw}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
