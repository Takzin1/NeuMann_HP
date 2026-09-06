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
      <main id="main" className="bg-void">
        <div
          className="container-page pb-24 xl:pb-30"
          style={{ paddingTop: "calc(var(--header-h) + 64px)" }}
        >
          <div className="max-w-measure">
            <h1 className="type-h2 text-fg">{privacy.title}</h1>
            <p className="type-body mt-6 text-fg-muted">{privacy.intro}</p>

            <div className="mt-12 space-y-10">
              {privacy.sections.map((section) => (
                <section key={section.heading} aria-label={section.heading}>
                  <h2 className="type-lead border-l border-line pl-4 text-fg">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 pl-4">
                    {section.body.map((para) => (
                      <p key={para} className="type-secondary text-fg-muted">
                        {para}
                      </p>
                    ))}
                    {"list" in section && section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="type-secondary flex items-start gap-2 text-fg-muted"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 bg-fg-faint"
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

            <p className="type-secondary mt-12 border-t border-line pt-6 text-fg-muted">
              {privacy.note}
            </p>

            <p className="mt-10">
              <Link
                href="/"
                className="focus-ring type-secondary inline-flex items-center gap-2 text-fg underline underline-offset-4"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M13 8H3M7 4L3 8l4 4" />
                </svg>
                トップページへ戻る
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
