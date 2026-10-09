import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: string;
  marker?: { symbol: string; tone: "up" | "down" };
  subtitle?: string;
}

export function SectionHeading({ id, title, marker, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-5">
      <h2 id={id} className="text-2xl font-bold sm:text-3xl">
        {title}
        {marker ? (
          <span
            aria-hidden="true"
            className={cn("ml-2", marker.tone === "up" ? "text-success" : "text-error")}
          >
            {marker.symbol}
          </span>
        ) : null}
      </h2>
      {subtitle ? <p className="text-base-content/70 mt-1">{subtitle}</p> : null}
    </div>
  );
}
