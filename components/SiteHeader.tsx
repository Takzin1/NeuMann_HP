"use client";

import { useEffect, useState } from "react";
import { Logomark } from "./Logomark";
import { company, nav } from "@/lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <a
          href="#top"
          onClick={close}
          className="focus-ring -m-1 flex items-center gap-2.5 rounded-md p-1"
          aria-label={`${company.name} ホームへ`}
        >
          <Logomark className="h-7 w-7" />
          <span className="text-[17px] font-bold tracking-[0.04em] text-ink">
            {company.name}
          </span>
        </a>

        {/* PC ナビ */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.slice(0, -1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-sm text-[14px] text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="focus-ring rounded-md bg-ai px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-ai-hover"
          >
            お問い合わせ
          </a>
        </nav>

        {/* モバイル ハンバーガー */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring relative h-10 w-10 rounded-md md:hidden"
          aria-label="メニュー"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">メニューを開閉</span>
          <span
            className={`absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 bg-ink transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 bg-ink transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-line bg-paper/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-transparent"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-6 py-2 sm:px-8">
          {nav.slice(0, -1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="focus-ring rounded-sm border-b border-line py-3.5 text-[15px] text-ink last:border-b-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="focus-ring my-3 rounded-md bg-ai px-4 py-3 text-center text-[15px] font-semibold text-white"
          >
            お問い合わせ
          </a>
        </nav>
      </div>
    </header>
  );
}
