import Link from "next/link";
import { hero } from "@/lib/site";

export function Hero() {
  return (
    // 静止して完成していること。entrance animation は持たせない。
    // 背景は Void 一色。装飾的な抽象グラフィックは置かない。
    <section className="border-b border-line bg-void" aria-labelledby="hero-heading">
      {/* 上端余白は header 実高（--header-h）を加算して算出する */}
      <div
        className="container-page pb-16 md:pb-24 xl:pb-30"
        style={{ paddingTop: "calc(var(--header-h) + 64px)" }}
      >
        <p className="type-mono flex flex-wrap items-center gap-x-2 gap-y-1 text-fg-muted">
          <span>{hero.eyebrow[0]}</span>
          <span aria-hidden="true" className="text-fg-faint">
            /
          </span>
          <span>{hero.eyebrow[1]}</span>
        </p>

        <h1 id="hero-heading" className="type-display mt-8 text-fg">
          {hero.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* 補足ではなく主張なので Primary Text で組む */}
        <p className="type-lead mt-10 max-w-measure text-fg">
          {hero.lead.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        {/* 円ではなく正方形。汎用ステータスドットではなく「地点」を指すマーク。
            赤の予算は ロゴの角 と Header CTA の 2 箇所で使い切っているため、
            ここは Primary Text で置く。 */}
        <p className="type-mono mt-8 flex items-center gap-2 text-fg-muted">
          <span
            className="shrink-0 bg-fg"
            style={{ height: "6px", width: "6px" }}
            aria-hidden="true"
          />
          {hero.origin}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {/* 赤は Header CTA とロゴの角に限る。Hero は neutral light fill。 */}
          <Link
            href={hero.ctaPrimary.href}
            className="focus-ring type-secondary inline-flex h-11 items-center rounded-button bg-fg px-6 text-void transition-colors duration-state ease-std hover:bg-fg-muted"
          >
            {hero.ctaPrimary.label}
          </Link>
          <Link
            href={hero.ctaSecondary.href}
            className="focus-ring type-secondary inline-flex h-11 items-center gap-2 rounded-button border border-line px-6 text-fg transition-colors duration-state ease-std hover:border-line-strong"
          >
            {hero.ctaSecondary.label}
            {/* 矢印はセクションを離れる導線にのみ付ける */}
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* capability rail */}
      <div className="border-t border-line">
        <ul
          className="container-page flex flex-wrap items-center gap-x-8 gap-y-2 py-4"
          aria-label="事業領域"
        >
          {hero.capabilities.map((c) => (
            <li key={c} className="type-mono text-fg-muted">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
