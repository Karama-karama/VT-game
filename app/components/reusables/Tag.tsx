import type { ReactNode } from "react";
type Tone = "vache" | "taureau" | "neutral";
type Size = "sm" | "md";

interface TagProps{
    tone?: Tone;
    size?: Size;
    badge?: string;
    icon?: ReactNode;
    upperCase?: boolean;
    className?: string;
    children: ReactNode; // the extra text
} 

const tones: Record<Tone, string> = {
  taureau: "bg-success-soft text-success border-success/30",
  vache: "bg-danger-soft text-danger border-danger/30",
  neutral: "bg-accent text-accent-foreground border-accent-foreground/20",
};
const badgeTones: Record<Tone, string> = {
  taureau: "bg-success text-white",
  vache: "bg-danger text-white",
  neutral: "bg-accent-foreground text-accent",
};
const sizes: Record<Size, { tag: string; badge: string }> = {
  sm: { tag: "gap-1.5 px-2 py-0.5 text-xs", badge: "size-4 text-[10px]" },
  md: { tag: "gap-2 px-3 py-1 text-sm", badge: "size-6 text-xs" },
};
export function Tag({
    tone ="vache",
    size = "md",
    badge,
    icon,
    upperCase = false,
    className = "",
    children,
}: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border font-semibold px-2.5 py-2.25",
        tones[tone],
        sizes[size].tag,
        upperCase ? "uppercase tracking-wider" : "",
        className,
      ].join(" ")}
    >
      {badge && (
        <span
          aria-hidden
          className={`grid shrink-0 place-items-center rounded-full font-bold ${badgeTones[tone]} ${sizes[size].badge}`}
        >
          {badge}
        </span>
      )}
      {icon && <span aria-hidden className="size-3.5 shrink-0 [&>svg]:size-full">{icon}</span>}
      {children}
    </span>
  )
}