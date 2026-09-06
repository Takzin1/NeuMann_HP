"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { NeuMannLockup } from "@/components/brand/NeuMannLockup";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // 全画面オーバーレイ表示中は背面をスクロールさせない
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    // 高さは --header-h と完全一致させる。border は box-border で内側に含める。
    // 背景は Void の不透明塗り。backdrop-blur は仕様上の禁止項目。
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line bg-void">
      <div className="container-page flex h-full items-center justify-between">
        {/* identity marker。会社名・肩書・所在地をヘッダー内で重ねない。 */}
        <Link
          href="/"
          onClick={close}
          className="focus-ring"
          aria-label={`${site.nameEn} トップページ`}
        >
          <NeuMannLockup />
        </Link>

        <nav aria-label="メインナビゲーション" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring type-secondary text-fg transition-colors duration-state ease-std hover:text-fg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {/* 赤が許されるのはこの CTA とロゴの角のみ。 */}
              <Link
                href="/#contact"
                className="focus-ring type-secondary inline-flex h-11 items-center rounded-button bg-red px-6 text-fg transition-colors duration-state ease-std hover:bg-red-signal"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="focus-ring -mr-1 inline-flex h-11 w-11 items-center justify-center rounded-button text-fg md:hidden"
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
            strokeWidth="1.5"
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

      {/* 全画面オーバーレイ。header(64px) の下を占有する。 */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-void md:hidden"
      >
        <nav aria-label="モバイルナビゲーション" className="container-page py-4">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={close}
                  className="focus-ring type-body flex h-11 items-center text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/#contact"
                onClick={close}
                className="focus-ring type-secondary flex h-11 items-center justify-center rounded-button bg-red text-fg"
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
