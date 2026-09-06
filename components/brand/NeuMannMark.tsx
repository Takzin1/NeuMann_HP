import type { SVGProps } from "react";

/**
 * NeuMann LLC — NM unicorn symbol
 *
 * ブランドの identity marker。装飾アセットとして扱わないこと。
 * サイト内での出現は Header lockup / Footer lockup / favicon・OGP に限る。
 *
 * variant:
 *  - "brand" … off-white のボディ + deep crimson の角。
 *              赤の使用はこのマークと Header CTA のみに認められる例外。
 *  - "mono"  … 全て currentColor。Footer など赤を使わない面で用いる。
 */
export function NeuMannMark({
  variant = "brand",
  className = "",
  title,
  ...props
}: SVGProps<SVGSVGElement> & {
  variant?: "brand" | "mono";
  title?: string;
}) {
  const body = variant === "brand" ? "#F3F1EE" : "currentColor";
  const horn = variant === "brand" ? "#781522" : "currentColor";

  return (
    <svg
      viewBox="0 0 264 277"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      {...props}
    >
      {/* N — 左のジグザグ */}
      <path
        d="M0 76 L0 277 L41 245 L42 170 L159 277 L159 220 Z"
        fill={body}
      />
      {/* M — 中央（頭部とたてがみ） */}
      <path
        d="M185 50 L122 91 L122 174 L159 208 L160 128 L208 168 L238 140 L185 90 Z"
        fill={body}
      />
      {/* M — 右脚 */}
      <path d="M264 135 L214 177 L214 271 L264 271 Z" fill={body} />
      {/* 角 */}
      <path d="M263 0 L192 45 L192 81 Z" fill={horn} />
    </svg>
  );
}
