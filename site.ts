// ===========================================================================
// NeuMann合同会社 — コーポレートサイトのテキスト・データ管理ファイル
//
// サイト内の文言・項目は基本的にこのファイルだけを編集すれば反映されます。
// （旧LPのコンテンツは lib/content.ts に温存しています）
// ===========================================================================

// --- 型定義 -----------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export interface WhatWeDoItem {
  id: string;
  title: string;
  body: string;
}

export interface Project {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  description: string;
  features?: string[];
  status: string[];
  note?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  body: string;
}

export interface CompanyField {
  label: string;
  value: string;
  provisional?: boolean; // 未確定情報（「予定」表記）
}

export interface ContactTypeOption {
  value: string;
  label: string;
}

// --- 会社・ブランド ----------------------------------------------------------

export const site = {
  name: "NeuMann合同会社",
  nameEn: "NeuMann LLC",
  wordmark: "NeuMann",
  tagline: "Research, Development and Implementation Company",
  url: "", // 公開ドメイン決定後に設定（例: https://neumann-llc.jp）
  description:
    "NeuMann合同会社は、AI・DX・地域課題解決の領域で、研究や実証から得られた理論・データ・知見を、現場で機能するプロダクトや仕組みへ翻訳するR&Dカンパニーです。",
};

// --- ナビゲーション ----------------------------------------------------------

export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Company", href: "/#company" },
  { label: "Contact", href: "/#contact" },
];

export const footerNav: NavItem[] = [
  ...nav,
  { label: "Privacy Policy", href: "/privacy" },
];

// --- Hero -------------------------------------------------------------------

export const hero = {
  eyebrow: "R&D Company",
  // メインコピー（配列＝改行単位）
  headline: ["研究と実証を、", "社会で使われる仕組みへ。"],
  sub: "NeuMannは、AI・DX・地域課題解決の領域で、研究や実証から得られた理論・データ・知見を、現場で機能するプロダクトや制度設計へ翻訳するR&Dカンパニーです。",
  ctaPrimary: { label: "事業を見る", href: "/#projects" },
  ctaSecondary: { label: "お問い合わせ", href: "/#contact" },
  keywords: [
    "Research",
    "Development",
    "Implementation",
    "Local Innovation",
    "AI / DX",
    "Public Impact",
  ],
};

// --- Mission ----------------------------------------------------------------

export const mission = {
  eyebrow: "Mission",
  headline: "研究成果や実証知を、\n社会の中で実際に使われる形へ変換する。",
  body: [
    "NeuMannは、大学・地域・行政・民間の間にあるギャップを埋めるためのR&Dカンパニーです。",
    "理論を理論のままで終わらせず、実証を一過性のイベントで終わらせず、現場で使われ続けるプロダクトや仕組みとして社会に実装します。",
  ],
};

// --- What We Do ---------------------------------------------------------------

export const whatWeDo = {
  eyebrow: "What We Do",
  heading: "研究と現場のあいだで、私たちが担う3つの役割",
  items: [
    {
      id: "research-translation",
      title: "Research Translation",
      body: "研究・実証で得られた知見を、社会実装可能な構造へ整理します。",
    },
    {
      id: "product-development",
      title: "Product Development",
      body: "AI、LINE、Web、クラウド等を活用し、現場で使えるプロダクトを開発します。",
    },
    {
      id: "public-implementation",
      title: "Public Implementation",
      body: "自治体・地域団体・大学・企業と連携し、実証から導入までを支援します。",
    },
  ] as WhatWeDoItem[],
};

// --- Projects -----------------------------------------------------------------

export const projectsSection = {
  eyebrow: "Projects",
  heading: "現場で検証しながら育てている取り組み",
  lead: "いずれのプロジェクトも、研究・実証で得た知見を出発点に、持続的に運用される仕組みとしての実装を目指しています。",
};

export const projects: Project[] = [
  {
    id: "mimamorikun",
    name: "見守りくん",
    nameEn: "Mimamori-kun",
    category: "地域安心プラットフォーム",
    description:
      "LINE・QR・3ステップで、日常の見守りと災害時の安否確認をつなぐ地域安心プラットフォーム。",
    features: [
      "高齢者見守り",
      "災害時安否確認",
      "自治体・地域団体向け導入",
      "管理画面による状況把握",
      "実証から導入までを想定した設計",
    ],
    status: ["PoC", "Public Sector Collaboration"],
    note: "※ 見守りくんは医療・救急・警備サービスの代替ではありません。緊急時は119番・110番等の公的機関へご連絡ください。",
    featured: true,
  },
  {
    id: "local-ai-dx-research",
    name: "Local AI / DX Research",
    category: "研究・実証・実装",
    description:
      "地域課題、自治体DX、中小企業支援、防災、見守り領域におけるAI活用の研究・実証・実装。",
    status: ["Research", "Prototype", "Field Test"],
  },
  {
    id: "rd-studio",
    name: "R&D Studio",
    category: "開発スタジオ",
    description:
      "研究テーマや地域課題を、プロダクト仮説、実証設計、提案資料、運用設計へ落とし込む開発スタジオ。",
    status: ["R&D", "Consulting"],
  },
];

// --- Services -------------------------------------------------------------------

export const servicesSection = {
  eyebrow: "Services",
  heading: "研究から運用まで、一連の工程を支援します",
};

export const services: ServiceItem[] = [
  {
    id: "ai-dx-dev",
    title: "AI・DXシステム開発",
    body: "AIやクラウドを活用した業務システム・サービスの設計と開発。",
  },
  {
    id: "anshin-platform",
    title: "地域安心プラットフォームの企画・開発・運営",
    body: "見守り・安否確認など、地域の安心を支える仕組みづくり。",
  },
  {
    id: "govtech-dx",
    title: "自治体向けDX支援",
    body: "現場の業務や制度を踏まえた、無理のないデジタル化の伴走支援。",
  },
  {
    id: "mimamori-bousai",
    title: "高齢者見守り・防災システム",
    body: "日常の見守りと災害時の初動をつなぐシステムの構築。",
  },
  {
    id: "research-design",
    title: "地域課題解決に関するリサーチ・実証設計",
    body: "課題の構造化から実証計画の設計・評価指標づくりまで。",
  },
  {
    id: "poc",
    title: "PoC設計・実装・評価",
    body: "仮説検証のための試作開発と、導入判断につながる評価。",
  },
  {
    id: "genai",
    title: "生成AI活用支援",
    body: "業務・地域課題への生成AI導入の検討・試行・定着支援。",
  },
  {
    id: "implementation-support",
    title: "研究成果の社会実装支援",
    body: "研究知を、現場で使われるプロダクトや制度設計へ接続。",
  },
  {
    id: "bizdev",
    title: "事業開発・提案資料作成支援",
    body: "実証・導入に向けた事業設計と、行政・企業向け提案資料の作成。",
  },
];

// --- Positioning -------------------------------------------------------------------

export const positioning = {
  eyebrow: "Positioning",
  heading: "3つの領域の交点に立つ",
  body: "NeuMannは、研究機関、開発会社、コンサルティング会社のいずれか一つに閉じる会社ではありません。",
  lines: [
    { from: "研究で得られた問いを、", to: "現場で試せる仮説へ。" },
    { from: "実証で得られたデータを、", to: "継続利用できる仕組みへ。" },
    { from: "地域の課題を、", to: "社会に展開可能なプロダクトへ。" },
  ],
  closing: "その翻訳と実装を担うR&Dカンパニーです。",
  domains: ["Research", "Product", "Public Implementation"],
};

// --- Company -------------------------------------------------------------------

export const companySection = {
  eyebrow: "Company",
  heading: "会社概要",
  note: "2026年7月17日に法人登記を完了しました。会社情報は登記内容に基づいています。",
};

export const companyFields: CompanyField[] = [
  { label: "会社名", value: "NeuMann合同会社" },
  { label: "英語表記", value: "NeuMann LLC" },
  { label: "代表", value: "弓田 隆仁" },
  {
    label: "所在地",
    value: "〒963-4317 福島県田村市船引町東部台四丁目98 東部団地4棟5号室",
  },
  { label: "設立", value: "2026年7月17日" },
  { label: "法人番号", value: "6380003006397" },
  {
    label: "事業内容",
    value:
      "AI・DXシステム開発、地域安心プラットフォームの開発・運営、自治体DX支援、地域課題解決に関する研究開発、プロダクト開発、社会実装支援",
  },
];

// --- Contact -------------------------------------------------------------------

export const contactSection = {
  eyebrow: "Contact",
  heading: "お問い合わせ",
  lead: "研究・実証・自治体連携・プロダクト開発・取材・協業に関するお問い合わせはこちらからご連絡ください。",
  // フォーム送信機能は準備中のため、メールでの連絡先を併記
  email: "takazin1999@gmail.com",
};

export const contactTypes: ContactTypeOption[] = [
  { value: "public-sector", label: "自治体・公共団体からの相談" },
  { value: "research", label: "研究・実証に関する相談" },
  { value: "product", label: "プロダクト導入に関する相談" },
  { value: "partnership", label: "協業・事業連携" },
  { value: "media", label: "取材・登壇" },
  { value: "other", label: "その他" },
];

// --- Footer -------------------------------------------------------------------

export const footer = {
  name: "NeuMann LLC",
  tagline: "Research, Development and Implementation Company",
  copyright: "© 2026 NeuMann LLC. All rights reserved.",
};

// --- Privacy Policy -------------------------------------------------------------

export const privacy = {
  title: "プライバシーポリシー",
  intro:
    "NeuMann合同会社（以下「当社」といいます）は、当社のウェブサイトおよび事業活動において取得する個人情報を、以下の方針に基づき取り扱います。",
  sections: [
    {
      heading: "1. 個人情報の取得",
      body: [
        "当社は、お問い合わせフォーム、メール、実証・連携等の各種手続きを通じて、お名前、ご所属、メールアドレス、お問い合わせ内容などの個人情報を、適正かつ公正な手段により取得します。",
      ],
    },
    {
      heading: "2. 利用目的",
      body: ["取得した個人情報は、次の目的の範囲内で利用します。"],
      list: [
        "お問い合わせへの回答および連絡",
        "研究・実証・協業等に関するご相談への対応",
        "サービス・プロダクトの提供、改善および開発",
        "必要なお知らせ・ご案内の送付",
      ],
    },
    {
      heading: "3. 第三者提供",
      body: [
        "当社は、法令に基づく場合またはご本人の同意がある場合を除き、取得した個人情報を第三者に提供しません。",
      ],
    },
    {
      heading: "4. 安全管理",
      body: [
        "当社は、個人情報の漏えい、滅失または毀損の防止その他の安全管理のために、必要かつ適切な措置を講じるよう努めます。",
      ],
    },
    {
      heading: "5. お問い合わせ窓口",
      body: [
        "個人情報の取り扱いに関するお問い合わせは、当サイトのお問い合わせフォームまたはメールにてご連絡ください。内容を確認のうえ、合理的な範囲で速やかに対応します。",
      ],
    },
    {
      heading: "6. 改定",
      body: [
        "本ポリシーの内容は、法令の改正や事業内容の変更等に応じて、予告なく改定することがあります。改定後の内容は、当サイトに掲載した時点から適用されます。",
      ],
    },
  ],
  note: "本ポリシーは一般的な方針を示すものであり、正式公開にあたっては専門家の確認を経て更新される場合があります。",
};
