import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/lib/site";

const title = `${site.name}｜研究と実証を、社会で使われる仕組みへ。`;

export const metadata: Metadata = {
  // OGP 画像などの相対パスを絶対 URL に解決するための基準。
  // 値は NEXT_PUBLIC_SITE_URL → NEXT_PUBLIC_VERCEL_URL → localhost の順で決まる。
  metadataBase: new URL(site.url),
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
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: site.description,
    type: "website",
    locale: "ja_JP",
    siteName: site.nameEn,
    url: "/",
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
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/*
          日本語は Noto Sans JP を Google Fonts の css2 API から読み込む。
          この API は unicode-range でサブセット分割されるため、
          ブラウザは実際に使われる字だけを取得する（数十 KB 程度）。
          自己ホストへ切り替える場合は NEUMANN_DESIGN.md §8 の注記を参照。
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/*
          eslint-disable-next-line @next/next/no-page-custom-font --
          このルールは Pages Router の _document.js を対象としたもの。
          App Router の root layout は全ページに適用されるため該当しない。
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap"
        />
      </head>
      <body className="bg-void font-sans text-fg antialiased">
        {/* キーボード利用者向けスキップリンク */}
        <a
          href="#main"
          className="focus-ring type-mono sr-only bg-fg px-4 py-2 text-void focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100]"
        >
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
