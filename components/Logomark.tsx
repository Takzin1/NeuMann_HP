import type { SVGProps } from "react";

// 上に向かって広がる同心円の弧＋点。
// 「見守り＝静かに広がるシグナル」「共助の波紋」を表す。
export function Logomark({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="16" cy="22" r="2" fill="#1B3A5C" />
      <path
        d="M9 20a7 7 0 0 1 14 0"
        stroke="#1B3A5C"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.5 18.5a10.5 10.5 0 0 1 21 0"
        stroke="#1B3A5C"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M2.5 17a13.5 13.5 0 0 1 27 0"
        stroke="#1B3A5C"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.28"
      />
    </svg>
  );
}
