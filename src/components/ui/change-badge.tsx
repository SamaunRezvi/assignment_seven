import { formatPercent } from "@/lib/format/bengali";
import { cn } from "@/lib/utils";
import type { PriceChange } from "@/types/product";

const styles = {
  up: "bg-success/10 text-success",
  down: "bg-error/10 text-error",
  flat: "bg-base-300 text-base-content/60",
} as const;

const symbols = { up: "▲", down: "▼", flat: "—" } as const;

const labels = {
  up: "দাম বেড়েছে",
  down: "দাম কমেছে",
  flat: "দাম অপরিবর্তিত",
} as const;

export function ChangeBadge({ change, className }: { change: PriceChange; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        styles[change.dir],
        className,
      )}
      title={labels[change.dir]}
    >
      <span aria-hidden="true">{symbols[change.dir]}</span>
      <span className="sr-only">{labels[change.dir]}</span>
      {change.dir === "flat" ? formatPercent(0) : formatPercent(change.pct)}
    </span>
  );
}
