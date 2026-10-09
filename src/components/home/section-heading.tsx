import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: string;
  marker?: { symbol: string; tone: "up" | "down" };
  subtitle?: string;
}

export function SectionHeading({ id, title, marker, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        {marker ? (
          <span
            aria-hidden="true"
            className={cn(marker.tone === "up" ? "text-error" : "text-success")}
          >
            {marker.symbol}
          </span>
        ) : null}
        <h2 id={id} className="text-xl font-bold">
          {title}
        </h2>
      </div>
      {subtitle ? <p className="text-base-content/70 mt-1">{subtitle}</p> : null}
    </div>
  );
}
