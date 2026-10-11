// components/game/PlayingView.tsx
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { AdviceCard } from "./AdviceCard";
import { GuessPanel } from "./GuessPanel";
import { RulesBox } from "./RulesBox";
import { Guess, TrialTable } from "./reusables/TrialTable";
import { Button } from "./reusables/Button";

interface PlayingViewProps {
  attempts: Guess[];
  digits: string[];
  partyId: string;
  total?: number; // MAX_TRIES once the logic is wired
  onSubmit: () => void;
  onRestart: () => void;
  onAbandon: () => void;
}

export function PlayingView({
  attempts,
  digits,
  partyId,
  total = 10,
  onSubmit,
  onRestart,
  onAbandon,
}: PlayingViewProps) {
  const g = useTranslations("Game");

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Page heading */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
            {g("status")}
          </span>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {g("title")}
          </h1>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {g("party", { id: partyId })}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr] lg:items-start">
        {/* 1 · guess card */}
        <GuessPanel
          digits={digits}
          used={attempts.length}
          total={total}
          onSubmit={onSubmit}
          className="lg:col-start-1 lg:row-start-1"
        />

        {/* 2 · attempts (mobile: right after the card) */}
        <section className="flex flex-col gap-3 lg:col-span-2 lg:row-start-2">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {g("attemptsTitle")}
              </h2>
              <p className="text-xs text-muted">{g("attemptsHint", { total })}</p>
            </div>
            <span className="font-mono text-xs text-muted">
              {/* {g(attempts.length)} / {total} */}
            </span>
          </div>
          <TrialTable guesses={attempts} />
        </section>

        {/* 3 · sidebar (mobile: last; desktop: right of the card) */}
        <aside className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1">
            <RulesBox />

          <AdviceCard title={g("adviceTitle")}>{g("advice")}</AdviceCard>

          <Button
            label={g("restart")}
            icon={<RotateCcw />}
            color="outline"
            onClick={onRestart}
            fullWidth
          />

          <button
            type="button"
            onClick={onAbandon}
            className="text-center text-[11px] font-bold uppercase tracking-widest text-muted transition hover:text-danger"
          >
            {g("abandon")}
          </button>
        </aside>
      </div>
    </div>
  );
}