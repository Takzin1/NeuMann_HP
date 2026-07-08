// ヒーロー背景の署名的ビジュアル。
// 等高線（地形/リスク面/防災）を極薄の藍で重ね、右側へマスクして
// 左の本文の可読性を保つ。boldnessはここだけに集中させる。
export function BackdropContours({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        WebkitMaskImage:
          "linear-gradient(100deg, transparent 0%, transparent 34%, rgba(0,0,0,0.5) 58%, #000 80%)",
        maskImage:
          "linear-gradient(100deg, transparent 0%, transparent 34%, rgba(0,0,0,0.5) 58%, #000 80%)",
      }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#1B3A5C" fill="none">
          <path
            d="M-40 470C120 430 230 470 350 430S600 360 700 400 840 470 900 450"
            strokeWidth="1.1"
            opacity="0.30"
          />
          <path
            d="M-40 420C130 386 250 426 360 384S590 318 700 352 840 420 900 398"
            strokeWidth="1.1"
            opacity="0.26"
          />
          <path
            d="M-40 372C140 342 268 380 372 340S585 280 700 308 845 372 900 350"
            strokeWidth="1.1"
            opacity="0.22"
          />
          <path
            d="M-40 326C150 300 286 336 384 300S585 246 700 268 848 326 900 306"
            strokeWidth="1.1"
            opacity="0.18"
          />
          <path
            d="M-40 282C160 260 300 294 398 262S588 214 700 232 850 282 900 264"
            strokeWidth="1.1"
            opacity="0.15"
          />
          <path
            d="M-40 240C170 222 312 252 410 224S592 184 700 198 852 240 900 224"
            strokeWidth="1.1"
            opacity="0.12"
          />
          <path
            d="M-40 200C180 186 324 212 422 188S596 156 700 166 854 200 900 186"
            strokeWidth="1.1"
            opacity="0.09"
          />
          <path
            d="M-40 162C190 152 336 174 432 154S600 130 700 138 856 162 900 150"
            strokeWidth="1.1"
            opacity="0.06"
          />
        </g>
      </svg>
    </div>
  );
}
