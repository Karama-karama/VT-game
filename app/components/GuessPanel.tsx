// components/game/GuessPanel.tsx
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProgressBar } from "./ProgressBar";
import { CardBoardWrapper } from "./reusables/CardBoardWrapper";
import { DigitInput } from "./reusables/DigitInput";
import { Button } from "./reusables/Button";

interface GuessPanelProps {
  digits: string[];   // one entry per cell, "" when empty
  used: number;       // tries already played
  total: number;      // max tries
  onSubmit: () => void;
  className?: string;
}

export function GuessPanel({ digits, used, total, onSubmit, className = "" }: GuessPanelProps) {
  const g = useTranslations("Game");

  return (
    <CardBoardWrapper className={className}>
      <div className="flex flex-col items-center gap-4">
        <ProgressBar total={total} current={used} label={g("progress", { current: used, total })}>
          {g("remaining", { count: total - used })}
        </ProgressBar>

        <h2 className="mt-2 font-display text-lg font-bold text-foreground sm:text-xl">
          {g("message")}
        </h2>

        <div className="flex justify-center gap-3 sm:gap-4">
          {digits.map((digit, index) => (
            <DigitInput key={index} hidden={false} value={digit} />
          ))}
        </div>

        <p className="text-xs text-muted">{g("reminder")}</p>

        <Button
          label={g("validate")}
          icon={<ArrowRight />}
          onClick={onSubmit}
          className="w-full"
        />
      </div>
    </CardBoardWrapper>
  );
}