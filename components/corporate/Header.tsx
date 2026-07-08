"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Logomark } from "@/components/Logomark";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Escキーでメニューを閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        {/* ブランド */}
        <Link
          href="/"
          onClick={close}
          className="focus-ring flex items-center gap-2.5 rounded-sm"
          aria-label={`${site.name} トップページ`}
        >
          <Logomark className="h-7 w-7" />
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-bold tracking-tight text-ink">
              {site.wordmark}
            </span>
            <span className="mt-0.5 hidden text-[9.5px] uppercase tracking-[0.16em] text-muted sm:block">
              R&amp;D / Implementation
            </span>
          </span>
        </Link>

        {/* PCナビ */}
        <nav aria-label="メインナビゲーション" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring rounded-sm text-[13.5px] font-medium tracking-wide text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className="focus-ring rounded-sm bg-ai px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-ai-hover"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        {/* モバイル: ハンバーガー */}
        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <nav aria-label="モバイルナビゲーション" className="px-6 py-4">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  onClick={close}
                  className="focus-ring block rounded-sm py-3.5 text-[15px] font-medium text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/#contact"
                onClick={close}
                className="focus-ring block rounded-sm bg-ai px-4 py-3 text-center text-[14px] font-semibold text-white hover:bg-ai-hover"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
