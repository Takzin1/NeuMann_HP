import Link from "next/link";
import { NeuMannLockup } from "@/components/brand/NeuMannLockup";
import { footer, footerNav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="container-page py-30">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          {/* footer では赤を使わない。lockup は monochrome。 */}
          <div className="text-fg-muted">
            <NeuMannLockup variant="mono" />
            <p className="type-mono mt-4 text-fg-muted">{footer.tagline}</p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3">
              {footerNav.map((group) => (
                <div key={group.heading}>
                  <h2 className="type-mono text-fg">{group.heading}</h2>
                  <ul className="mt-4 flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="focus-ring type-secondary text-fg-muted transition-colors duration-state ease-std hover:text-fg"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-16 border-t border-line pt-6">
          <p className="type-mono text-fg-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
