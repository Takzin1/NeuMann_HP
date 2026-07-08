import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/corporate/Footer";
import { Header } from "@/components/corporate/Header";
import { privacy, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `プライバシーポリシー｜${site.name}`,
  description: `${site.name}の個人情報の取り扱いに関する方針を掲載しています。`,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper">
        <div className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 sm:px-8 sm:pt-36 lg:px-10">
          <p className="flex items-center gap-3">
            <span className="h-px w-8 bg-ai/40" aria-hidden="true" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ai">
              Privacy Policy
            </span>
          </p>
          <h1 className="mt-5 font-display text-[28px] font-medium tracking-tight text-ink sm:text-[34px]">
            {privacy.title}
          </h1>
          <p className="mt-6 text-[14.5px] leading-[1.95] text-muted">
            {privacy.intro}
          </p>

          <div className="mt-12 space-y-10">
            {privacy.sections.map((section) => (
              <section key={section.heading} aria-label={section.heading}>
                <h2 className="border-l-2 border-ai/40 pl-4 text-[16px] font-bold tracking-tight text-ink">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 pl-4">
                  {section.body.map((para) => (
                    <p
                      key={para}
                      className="text-[14px] leading-[1.95] text-muted"
                    >
                      {para}
                    </p>
                  ))}
                  {"list" in section && section.list && (
                    <ul className="space-y-1.5">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[14px] leading-relaxed text-muted"
                        >
                          <span
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ai/60"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-line pt-6 text-[12px] leading-relaxed text-muted">
            {privacy.note}
          </p>

          <p className="mt-10">
            <Link
              href="/"
              className="focus-ring inline-flex items-center gap-2 rounded-sm text-[13.5px] font-semibold text-ai hover:text-ai-hover"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M13 8H3M7 4L3 8l4 4" />
              </svg>
              トップページへ戻る
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
