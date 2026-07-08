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

const inputClass =
  "focus-ring w-full rounded-sm border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-muted/60";

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
      className="rounded-md border border-line bg-paper p-6 sm:p-8"
      aria-label="お問い合わせフォーム"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-[13px] font-semibold text-ink"
          >
            お名前 <span className="text-ai">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="contact-affiliation"
            className="mb-2 block text-[13px] font-semibold text-ink"
          >
            所属
          </label>
          <input
            id="contact-affiliation"
            name="affiliation"
            type="text"
            autoComplete="organization"
            placeholder="例：自治体名／大学名／企業名"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-[13px] font-semibold text-ink"
          >
            メールアドレス <span className="text-ai">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="contact-type"
            className="mb-2 block text-[13px] font-semibold text-ink"
          >
            お問い合わせ種別 <span className="text-ai">*</span>
          </label>
          <select
            id="contact-type"
            name="type"
            required
            defaultValue=""
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22%20fill%3D%22none%22%20stroke%3D%22%235A6670%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[position:right_14px_center] bg-no-repeat pr-10`}
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
            className="mb-2 block text-[13px] font-semibold text-ink"
          >
            本文 <span className="text-ai">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-relaxed text-muted">
          送信いただいた内容は、
          <a href="/privacy" className="focus-ring rounded-sm underline underline-offset-2 hover:text-ink">
            プライバシーポリシー
          </a>
          に基づき取り扱います。
        </p>
        <button
          type="submit"
          className="focus-ring inline-flex items-center justify-center rounded-sm bg-ai px-8 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-ai-hover"
        >
          送信する
        </button>
      </div>

      {status === "unavailable" && (
        <p
          role="status"
          className="mt-5 rounded-sm border border-ai/25 bg-ai/5 px-4 py-3 text-[13px] leading-relaxed text-ink"
        >
          フォームからの送信機能は現在準備中です。お手数ですが、
          <a
            href={`mailto:${contactSection.email}`}
            className="focus-ring rounded-sm font-semibold text-ai underline underline-offset-2"
          >
            {contactSection.email}
          </a>
          まで直接ご連絡ください。
        </p>
      )}
    </form>
  );
}
