import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";

const title = `${site.name}｜研究と実証を、社会で使われる仕組みへ。`;

export const metadata: Metadata = {
  // 公開ドメインが決まったら下記を有効化してください
  // metadataBase: new URL("https://neumann-llc.jp"),
  title,
  description: site.description,
  keywords: [
    "NeuMann",
    "NeuMann合同会社",
    "R&D",
    "研究開発",
    "社会実装",
    "AI",
    "DX",
    "地域課題",
    "自治体DX",
    "防災",
    "見守り",
    "見守りくん",
    "福島",
  ],
  authors: [{ name: site.nameEn }],
  openGraph: {
    title,
    description: site.description,
    type: "website",
    locale: "ja_JP",
    siteName: site.nameEn,
  },
  twitter: {
    card: "summary",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* JS無効環境でもコンテンツが見えるようにする */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        {/* キーボード利用者向けスキップリンク */}
        <a
          href="#main"
          className="focus-ring sr-only rounded-sm bg-ai px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
