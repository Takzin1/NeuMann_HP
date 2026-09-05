"use client";

import { useState, type FormEvent } from "react";
import { contactSection, contactTypes } from "@/lib/site";

// お問い合わせフォームの入力値
export interface ContactFormValues {
  name: string;
  affiliation: string;
  email: string;
  type: string;
  message: string;
}

// ---------------------------------------------------------------------------
// 送信処理は未実装（UIのみ）。
// 将来、以下のいずれかに接続する想定です。
//   1. app/api/contact/route.ts を作成し、fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })
//   2. Google Forms / Resend / SendGrid 等の外部サービス
// 接続時は submitContact の中身を差し替えるだけで済むよう分離しています。
// ---------------------------------------------------------------------------
async function submitContact(_values: ContactFormValues): Promise<void> {
  // TODO: 送信APIに接続する
  throw new Error("not-implemented");
}

// 入力は 16px。14px 以下にすると iOS Safari でフォーカス時にズームが発生する。
const inputClass =
  "focus-ring type-body w-full rounded-button border border-line bg-elevated px-4 text-fg placeholder:text-fg-muted";
const inputHeight = "h-11";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "unavailable">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values: ContactFormValues = {
      name: String(data.get("name") ?? ""),
      affiliation: String(data.get("affiliation") ?? ""),
      email: String(data.get("email") ?? ""),
      type: String(data.get("type") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      await submitContact(values);
    } catch {
      // 送信機能が未接続の間は、メールでの連絡を案内する
      setStatus("unavailable");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      aria-label="お問い合わせフォーム"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="type-secondary mb-2 block font-medium text-fg-muted"
          >
            お名前 <span className="text-fg-muted">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${inputClass} ${inputHeight}`}
          />
        </div>

        <div>
          <label
            htmlFor="contact-affiliation"
            className="type-secondary mb-2 block font-medium text-fg-muted"
          >
            所属
          </label>
          <input
            id="contact-affiliation"
            name="affiliation"
            type="text"
            autoComplete="organization"
            placeholder="例：自治体名／大学名／企業名"
            className={`${inputClass} ${inputHeight}`}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="type-secondary mb-2 block font-medium text-fg-muted"
          >
            メールアドレス <span className="text-fg-muted">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={`${inputClass} ${inputHeight}`}
          />
        </div>

        <div>
          <label
            htmlFor="contact-type"
            className="type-secondary mb-2 block font-medium text-fg-muted"
          >
            お問い合わせ種別 <span className="text-fg-muted">*</span>
          </label>
          <select
            id="contact-type"
            name="type"
            required
            defaultValue=""
            className={`${inputClass} ${inputHeight} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22%20fill%3D%22none%22%20stroke%3D%22%23928B88%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[position:right_16px_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              選択してください
            </option>
            {contactTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="type-secondary mb-2 block font-medium text-fg-muted"
          >
            本文 <span className="text-fg-muted">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            className={`${inputClass} resize-y py-4`}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-secondary text-fg-muted">
          送信いただいた内容は、
          <a href="/privacy" className="focus-ring text-fg underline underline-offset-2">
            プライバシーポリシー
          </a>
          に基づき取り扱います。
        </p>
        <button
          type="submit"
          className="focus-ring type-secondary inline-flex h-11 items-center justify-center rounded-button bg-fg px-6 text-void transition-colors duration-state ease-std hover:bg-fg-muted"
        >
          送信する
        </button>
      </div>

      {/* 送信機能は未接続。押してから初めて分かる状態にしないため、
          メールでの連絡先は常時表示する。送信を試みた場合のみ role="status"
          で読み上げる要素を追加し、視覚的にも hairline で囲って強調する。 */}
      <p className="type-secondary mt-6 border-t border-line pt-6 text-fg-muted">
        フォームからの送信機能は現在準備中です。お手数ですが、
        <a
          href={`mailto:${contactSection.email}`}
          className="focus-ring font-medium text-fg underline underline-offset-2"
        >
          {contactSection.email}
        </a>
        まで直接ご連絡ください。
      </p>

      {status === "unavailable" && (
        <p
          role="status"
          className="type-secondary mt-4 border-l border-line pl-4 text-fg"
        >
          送信は完了していません。上記のメールアドレスへご連絡ください。
        </p>
      )}
    </form>
  );
}
