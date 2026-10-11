import type { ReactNode } from "react";
type Level= "good" | "medium" | "bad" | "inactive";

interface Thresholds {
  good: number;   // segments before this fraction are "good"
  medium: number; // segments before this fraction are "medium", the rest "bad"
}

interface ProgressBarProps{
    total?: number; // number of tries
    current?: number;
    className?: string;
    children?: ReactNode; // the extra text
    label?: ReactNode; // the extra text
    thresholds?: Thresholds;
} 

const levelClasses: Record<Level, string> = {
    inactive: "bg-[#E7DCCB] text-accent-foreground border-accent-foreground/20",
    good: "bg-[#2F7D57] text-success border-success/30",
    medium: "bg-[#F1BE48] text-amber-600 border-[#F1BE48]/30",
    bad: "bg-[#D9543D] text-danger border-danger/30",
};


function getLevel(
  index: number,
  current: number,
  total: number,
  { good, medium }: Thresholds
): Level {
  if (index >= current) return "inactive";
  const position = index / total; // 0 → first segment, <1 → last
  if (position < good) return "good";
  if (position < medium) return "medium";
  return "bad";
}
export function ProgressBar({
  total = 10,
  current = 0,
  thresholds = { good: 0.4, medium: 0.8 },
  label,
  children,
  className = "",
}: ProgressBarProps) {
const safeCurrent = Math.min(Math.max(current, 0), total); // clamp 0..total
  return (
 <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      {(label || children) && (
        <div className="flex items-center justify-between text-xs font-medium text-muted ">
          <div>{label}</div>
          <div>{children}</div>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={safeCurrent}
        className="flex w-full items-center gap-1 sm:gap-1.5"
      >
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
              levelClasses[getLevel(index, safeCurrent, total, thresholds)]
            }`}
          />
        ))}
      </div>
    </div>
  );
}