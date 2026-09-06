import type { Config } from "tailwindcss";

// -----------------------------------------------------------------------------
// NeuMann LLC — Design tokens
// 仕様: NEUMANN_DESIGN.md
//
// 意図的に `extend` ではなく `theme` 直下で上書きしている項目があります。
// これは Tailwind 既定値（rounded-md=6px / font-bold=700 / shadow-* / text-sm 等）が
// 残ることでトークン外の値が再流入するのを防ぐためです。
// 既定値を復活させないでください。
// -----------------------------------------------------------------------------
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // 2xl(1536) は使わない。段階は 4 つに固定する。
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    // 正典 9 色 + 承認済み派生 2 色のみ。この外に色を足さない。
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",

      void: "#080808", // ページ基底
      carbon: "#111111", // 副次バンド（1 ページ最大 2 セクション）
      elevated: "#171717", // 入力欄 / secondary 面 / row hover

      line: {
        DEFAULT: "#2C2929", // 全 hairline（1px 専用）
        strong: "#3A3634", // 派生: hairline の hover のみ
      },

      fg: {
        DEFAULT: "#F3F1EE", // 見出し・本文
        muted: "#928B88", // 補足・メタ・mono ラベル
        faint: "#5C5654", // 派生: 非活性 / TBD / copyright のみ
      },

      red: {
        DEFAULT: "#781522", // brand signal: primary button の塗り
        deep: "#4D0B13", // 低彩度の面
        signal: "#A51F32", // 状態マーク / hover 昇格。文字色にしない(2.7:1)
      },
    },

    // 8px グリッド。1(4px) はアイコンと文字の間隔のみ、5(20px) はアイコン寸法のみ。
    // 11(44px) は control 高（button / input）専用。
    spacing: {
      0: "0px",
      px: "1px",
      1: "4px",
      2: "8px",
      4: "16px",
      5: "20px",
      6: "24px",
      8: "32px",
      10: "40px",
      11: "44px",
      12: "48px",
      16: "64px",
      20: "80px",
      24: "96px",
      30: "120px",
      40: "160px",
    },

    fontFamily: {
      // Geist を先に置くこと。ブラウザは字ごとにスタックを解決するため、
      // この順序でのみ ラテン字/数字=Geist・日本語=Noto Sans JP になる。
      sans: [
        "var(--font-geist-sans)",
        "Noto Sans JP",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "system-ui",
        "sans-serif",
      ],
      mono: [
        "var(--font-geist-mono)",
        "Noto Sans Mono",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "monospace",
      ],
    },

    // 素の text-sm / text-base 等を消し、7 ロールのみを残す。
    // 実装では原則 .type-* クラス（レスポンシブ段を内包）を使うこと。
    fontSize: {
      mono: ["12px", { lineHeight: "1", letterSpacing: "0.06em" }],
      secondary: ["14px", { lineHeight: "1.65" }],
      body: ["16px", { lineHeight: "1.75" }],
      lead: ["20px", { lineHeight: "1.75", letterSpacing: "-0.01em" }],
      h3: ["32px", { lineHeight: "1.45", letterSpacing: "-0.01em" }],
      h2: ["44px", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
      display: ["72px", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
    },

    // 700 を存在させない。
    fontWeight: {
      regular: "400",
      medium: "500",
      strong: "600",
    },

    // 見出しがラテン字のみの場合に使う詰め（日本語見出しには使わない）。
    letterSpacing: {
      none: "0em",
      mono: "0.06em",
      ja: "-0.01em",
      "latin-h3": "-0.02em",
      "latin-h2": "-0.025em",
      "latin-display": "-0.03em",
    },

    borderRadius: {
      none: "0px",
      button: "4px",
      card: "8px",
      panel: "12px",
      pill: "9999px", // status chip 専用
    },

    borderWidth: {
      0: "0px",
      DEFAULT: "1px",
      2: "2px", // Deep Red の強調罫のみ
    },

    maxWidth: {
      none: "none",
      full: "100%",
      container: "1200px",
      measure: "720px", // 長文の行長（日本語 16px で約 45 字）
    },

    // 影は存在しない。
    boxShadow: { none: "none" },
    dropShadow: { none: "0 0 #0000" },
    blur: { none: "0" },
    backdropBlur: { none: "0" },

    transitionDuration: {
      0: "0ms",
      micro: "120ms",
      state: "180ms",
    },
    transitionTimingFunction: {
      std: "cubic-bezier(0.2, 0, 0, 1)",
    },

    extend: {
      strokeWidth: {
        hairline: "1",
        icon: "1.5",
      },
    },
  },
  plugins: [],
};

export default config;
