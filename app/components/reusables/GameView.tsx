// components/game/GameView.tsx
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Trophy, Flag } from "lucide-react";
import { DigitInput } from "./DigitInput";
import { Sparkles } from "../reusables/Sparkels"

type Status = "success" | "fail";

interface GameViewProps {
  status: Status;
  code: string[];
  count: number;     // tries used
  seconds: number;   // elapsed time
  className?: string;
  children?: ReactNode; // action buttons
}

const styles: Record<Status, { card: string; icon: string; Icon: typeof Trophy }> = {
  success: {
    card: "border-success shadow-[0_4px_0_0_var(--success)]",
    icon: "border-success bg-success-soft text-success",
    Icon: Trophy,
  },
  fail: {
    card: "border-danger shadow-[0_4px_0_0_var(--danger)]",
    icon: "border-danger bg-danger-soft text-danger",
    Icon: Flag,
  },
};

const pad = (n: number) => String(n).padStart(2, "0");
const formatTime = (total: number) => `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-surface-2 border border-border px-3 py-3">
      <span className="font-display text-xl font-bold text-foreground">{value}</span>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</span>
    </div>
  );
}

export function GameView({
  status,
  code,
  count,
  seconds,
  className = "",
  children,
}: GameViewProps) {
  const p = useTranslations("PostGame");
  const { card, icon, Icon } = styles[status];

  return (
    <section
      className={`relative mx-auto w-full max-w-xl overflow-hidden rounded-[28px] border bg-surface-2 p-6 sm:p-8 ${card} ${className}`}
    >
      {status === "success" && <Sparkles />}

      <div className="relative flex flex-col items-center text-center">
        <div className={`mb-5 grid size-20 place-items-center rounded-full border ${icon}`}>
          <Icon className="size-9" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-widest text-muted">
          {p(`${status}.label`)}
        </span>
        <h2 className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
          {p(`${status}.title`)}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted sm:text-base">
          {p(`${status}.subtitle`, { count })}
        </p>

        {/* Code reveal */}
        <div className="mt-6 flex w-full flex-col items-center gap-3 rounded-xl bg-surface px-3 py-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted">
            {p("preview")}
          </span>
          <div className="flex justify-center gap-2 sm:gap-3">
            {code.map((digit, index) => (
              <DigitInput
                key={index}
                hidden={false}
                value={digit}
                className="border border-success bg-success-soft shadow-[0_4px_0_0_var(--success)]"
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid w-full grid-cols-2 gap-3">
          <Stat value={pad(count)} label={p("tries")} />
          <Stat value={formatTime(seconds)} label={p("time")} />
        </div>

        {children && <div className="mt-6 flex w-full justify-center">{children}</div>}
      </div>
    </section>
  );
}