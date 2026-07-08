import Link from "next/link";
import { Logomark } from "@/components/Logomark";
import { footer, footerNav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* ブランド */}
          <div>
            <div className="flex items-center gap-2.5">
              <Logomark className="h-7 w-7" />
              <span className="text-[17px] font-bold tracking-tight text-ink">
                {footer.name}
              </span>
            </div>
            <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted">
              {footer.tagline}
            </p>
          </div>

          {/* リンク */}
          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="focus-ring rounded-sm text-[13.5px] text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[12px] text-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
