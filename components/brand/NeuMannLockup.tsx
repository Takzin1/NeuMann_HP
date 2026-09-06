import { NeuMannMark } from "@/components/brand/NeuMannMark";
import { site } from "@/lib/site";

/**
 * NM symbol + NEUMANN wordmark の horizontal lockup。
 * identity marker として Header / Footer に一度ずつだけ置く。
 */
export function NeuMannLockup({
  variant = "brand",
  markClass = "h-6 w-auto",
}: {
  variant?: "brand" | "mono";
  markClass?: string;
}) {
  return (
    <span className="flex items-center gap-2">
      <NeuMannMark variant={variant} className={markClass} />
      <span className="type-mono text-fg">{site.wordmark}</span>
    </span>
  );
}
