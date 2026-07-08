import type { SVGProps } from "react";

// プロダクトごとのグリフ。currentColor で配色を継承。
export function ProductIcon({
  id,
  ...props
}: { id: string } & SVGProps<SVGSVGElement>) {
  const common = {
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor" as const,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (id === "mimamori") {
    // 人＋見守りの波紋（存在を見守るシグナル）
    return (
      <svg {...common} {...props}>
        <circle cx="20" cy="15" r="4" />
        <path d="M12.5 28c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" />
        <path d="M9 17a11 11 0 0 1 22 0" opacity="0.5" />
        <path d="M5.5 18.5a14.5 14.5 0 0 1 29 0" opacity="0.25" />
      </svg>
    );
  }

  if (id === "riskfix") {
    // 文書＋優先度（リスクの抽出と整理）
    return (
      <svg {...common} {...props}>
        <path d="M11 6h12l6 6v22H11z" />
        <path d="M23 6v6h6" />
        <path d="M15 19h7" />
        <path d="M15 23h10" opacity="0.7" />
        <path d="M15 27h6" opacity="0.45" />
        <circle cx="27.5" cy="27.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  // tancre — 葉＋葉脈（環境・循環）
  return (
    <svg {...common} {...props}>
      <path d="M30 8c0 12-7 20-18 20-1.5 0-3-.2-4.4-.6C8 16 16 9 30 8Z" />
      <path d="M9 31C13 22 19 15 28 11" opacity="0.6" />
    </svg>
  );
}
