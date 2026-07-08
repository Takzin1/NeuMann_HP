# NeuMann合同会社 — 公式コーポレートサイト

「研究と実証を、社会で使われる仕組みへ。」

NeuMann合同会社（NeuMann LLC）の公式コーポレートサイトです。
研究や実証で得られた理論・データ・知見を、社会で実際に使われるプロダクトや仕組みへ翻訳するR&Dカンパニーとしての信頼感を伝えることを目的としています。

- **フレームワーク**: Next.js 14（App Router）+ TypeScript
- **スタイリング**: Tailwind CSS v3
- **デプロイ前提**: Vercel

## セットアップ

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## 本番ビルド

```bash
npm run build
npm run start
```

## ページ構成

| パス | 内容 |
| --- | --- |
| `/` | コーポレートTOP（Hero / Mission / What We Do / Projects / Services / Positioning / Company / Contact を1ページで構成。ナビゲーションは各セクションへのアンカーリンク） |
| `/privacy` | プライバシーポリシー |
| `/lp` | 旧プロダクトLP（アーカイブ・noindex。不要になれば `app/lp/` ごと削除可） |

## ファイル構成

```
neumann-lp/
├── app/
│   ├── layout.tsx              # 全体レイアウト・SEOメタデータ・スキップリンク
│   ├── page.tsx                # コーポレートTOP
│   ├── privacy/page.tsx        # プライバシーポリシー
│   ├── lp/page.tsx             # 旧LP（アーカイブ）
│   └── globals.css             # ベーススタイル・フォーカスリング・Reveal
├── components/
│   ├── corporate/              # コーポレートサイト用コンポーネント
│   │   ├── Header.tsx          # 固定ヘッダー（スマホはハンバーガーメニュー）
│   │   ├── Footer.tsx          # フッター
│   │   ├── SectionTitle.tsx    # セクション見出し（英語eyebrow＋明朝見出し）
│   │   ├── Hero.tsx            # Hero（メインコピー・CTA・キーワードレール）
│   │   ├── MissionSection.tsx
│   │   ├── WhatWeDo.tsx        # 3つの役割カード
│   │   ├── ProjectCard.tsx     # プロジェクトカード（見守りくんはフィーチャー表示）
│   │   ├── ProjectsSection.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── Positioning.tsx     # 3領域（Research / Product / Public Implementation）交差図
│   │   ├── CompanyInfo.tsx     # 会社概要テーブル
│   │   ├── CompanySection.tsx
│   │   ├── ContactForm.tsx     # お問い合わせフォーム（UIのみ・送信は未接続）
│   │   └── ContactSection.tsx
│   └── （その他）               # 旧LP用コンポーネント（/lp で使用・温存）
├── lib/
│   ├── site.ts                 # ★ コーポレートサイトの全文言・データはここで一元管理
│   └── content.ts              # 旧LPのコンテンツ（温存）
├── tailwind.config.ts          # カラートークン（paper / ink / mist / line / muted / 藍）
└── next.config.mjs
```

## 文言・データの更新方法

サイト内のテキスト（会社情報・サービス一覧・プロジェクト一覧・ナビゲーション・プライバシーポリシー等）は、原則として **`lib/site.ts` だけを編集すれば反映されます**。

未確定の会社情報（所在地・設立日など）は `provisional: true` を付けて「予定」表記にしています。確定したら `lib/site.ts` の該当項目を書き換えてください。

## お問い合わせフォームについて

現在はUIのみで、送信処理は未実装です。送信ボタンを押すとメールでの連絡先を案内します。

将来の接続先候補と手順:

1. **自前API**: `app/api/contact/route.ts` を作成し、`components/corporate/ContactForm.tsx` 内の `submitContact` を `fetch("/api/contact", ...)` に差し替える
2. **Resend / SendGrid**: 上記API Route内でメール送信SDKを呼び出す
3. **Google Forms**: `submitContact` からフォームのエンドポイントへPOSTする

フォームの入力値は `ContactFormValues` 型に集約済みのため、`submitContact` の中身の差し替えだけで接続できます。

## 今後追加すべき機能・改善点

- [ ] お問い合わせフォームの送信処理（API Route + Resend/SendGrid 等）
- [ ] 公開ドメイン確定後、`app/layout.tsx` の `metadataBase` と `lib/site.ts` の `site.url` を設定
- [ ] OGP画像（`app/opengraph-image.png` の追加）
- [ ] favicon / apple-touch-icon の設置
- [ ] News / お知らせセクション（実証・連携・掲載情報の時系列掲載）
- [ ] 各セクションの個別ページ化（`/about` `/projects` `/services` など。`lib/site.ts` にデータを集約済みのため分割は容易）
- [ ] プロジェクト詳細ページ（見守りくん等）
- [ ] Google Analytics / Search Console の導入
- [ ] プライバシーポリシーの専門家レビュー
- [ ] 会社情報（所在地・設立日）確定後の更新と「予定」表記の削除

## 注意事項

- 見守りくんは医療・救急・警備サービスの代替ではありません。
- 所在地・設立日など「予定」と記載の情報は未確定です。確定情報として扱わないでください。
