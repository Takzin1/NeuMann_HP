import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { whatWeDo } from "@/lib/site";

// 各役割を表す細線アイコン（藍・1.5px stroke）
function RoleIcon({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "#1B3A5C",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-8 w-8",
    "aria-hidden": true,
  };

  if (id === "research-translation") {
    // 知見 → 構造への整理（散点が整列する）
    return (
      <svg {...common}>
        <circle cx="7" cy="8" r="1.4" fill="#1B3A5C" stroke="none" />
        <circle cx="12" cy="13" r="1.4" fill="#1B3A5C" stroke="none" opacity="0.7" />
        <circle cx="6" cy="18" r="1.4" fill="#1B3A5C" stroke="none" opacity="0.45" />
        <path d="M16 16h4" opacity="0.6" />
        <rect x="22" y="6" width="6" height="5" rx="0.5" />
        <rect x="22" y="14" width="6" height="5" rx="0.5" opacity="0.7" />
        <rect x="22" y="22" width="6" height="5" rx="0.5" opacity="0.45" />
      </svg>
    );
  }
  if (id === "product-development") {
    // 現場で使えるプロダクト（画面とコード）
    return (
      <svg {...common}>
        <rect x="4" y="6" width="24" height="17" rx="1.5" />
        <path d="M4 11h24" opacity="0.5" />
        <path d="M11 15l-3 3 3 3" />
        <path d="M17 15l3 3-3 3" />
        <path d="M12 27h8" opacity="0.6" />
      </svg>
    );
  }
  // public-implementation: 連携（結節点をつなぐ）
  return (
    <svg {...common}>
      <circle cx="16" cy="7" r="3" />
      <circle cx="7" cy="24" r="3" opacity="0.75" />
      <circle cx="25" cy="24" r="3" opacity="0.75" />
      <path d="M14.4 9.6L8.8 21.4M17.6 9.6l5.6 11.8M10 24h12" opacity="0.5" />
    </svg>
  );
}

export function WhatWeDo() {
  return (
    <section className="border-y border-line bg-mist py-24 lg:py-32" aria-label="What We Do">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <SectionTitle eyebrow={whatWeDo.eyebrow} heading={whatWeDo.heading} />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {whatWeDo.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 90}>
              <article className="flex h-full flex-col rounded-md border border-line bg-paper p-8 transition-colors hover:border-ai/40">
                <RoleIcon id={item.id} />
                <h3 className="mt-6 text-[16px] font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.9] text-muted">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
