import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14191D",
        paper: "#FFFFFF",
        mist: "#F5F7F8",
        line: "#E4E8EB",
        muted: "#5A6670",
        // 藍 / indigo — primary brand accent (信頼・watching-over)
        ai: {
          DEFAULT: "#1B3A5C",
          hover: "#27517A",
          deep: "#13293F",
        },
        // 深緑 — used ONLY for the 脱炭素 product so color encodes meaning
        mori: {
          DEFAULT: "#1F4E3D",
          hover: "#2A6450",
        },
      },
      fontFamily: {
        // 既定: ゴシック（本文・UI・操作的な声）
        sans: [
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          '"Yu Gothic"',
          "YuGothic",
          '"Noto Sans JP"',
          "Meiryo",
          "system-ui",
          "sans-serif",
        ],
        // 明朝（理念・感情を担う声）— ごく限定的に使用
        display: [
          '"Hiragino Mincho ProN"',
          '"Yu Mincho"',
          "YuMincho",
          '"Noto Serif JP"',
          '"Shippori Mincho"',
          "serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
