// components/game/AdviceCard.tsx
import type { ReactNode } from "react";

interface AdviceCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function AdviceCard({ title, children, className = "" }: AdviceCardProps) {
  return (
    <div
      role="note"
      className={`rounded-2xl border border-warning/40 bg-accent p-4 text-left ${className}`}
    >
      <h3 className="text-sm font-bold text-accent-foreground">{title}</h3>
      <div className="mt-1 text-sm leading-relaxed text-accent-foreground/80">{children}</div>
    </div>
  );
}