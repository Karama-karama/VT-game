// components/game/GuessPanel.tsx
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProgressBar } from "./ProgressBar";
import { CardBoardWrapper } from "./reusables/CardBoardWrapper";
import { DigitInput } from "./reusables/DigitInput";
import { Button } from "./reusables/Button";
import { CODE_LENGTH, sanitizeGuess } from "@/app/lib/game/logic";

// interface GuessPanelProps {
//   digits: string[];   // one entry per cell, "" when empty
//   used: number;       // tries already played
//   total: number;      // max tries
//   onSubmit: () => void;
//   className?: string;
// }
interface GuessPanelProps {
  value: string;                       // what the player typed so far
  onValueChange: (value: string) => void;
  error?: string | null;               // already translated
  used: number;
  total: number;
  onSubmit: () => void;
  className?: string;
}
export function GuessPanel({value, onValueChange, error, used, total, onSubmit, className = "",}: GuessPanelProps) {
  const g = useTranslations("Game");
const digits = Array.from({ length: CODE_LENGTH }, (_, i) => value[i] ?? "");
  return (
    <CardBoardWrapper className={className}>
      <div className="flex flex-col items-center gap-4">
        <ProgressBar total={total} current={used} label={g("progress", { current: used, total })}>
          {g("remaining", { count: total - used })}
        </ProgressBar>

        <h2 className="mt-2 font-display text-lg font-bold text-foreground sm:text-xl">
          {g("message")}
        </h2>

        {/* <div className="flex justify-center gap-3 sm:gap-4">
          {digits.map((digit, index) => (
            <DigitInput key={index} hidden={false} value={digit} />
          ))}
        </div> */}
             <div className="relative">
          <div className="flex justify-center gap-3 sm:gap-4">
            {digits.map((digit, index) => (
              <DigitInput
                key={index}
                hidden={false}
                value={digit}
                className={index === value.length ? "border-primary" : ""}
              />
            ))}
          </div>

          <input
            value={value}
            onChange={(e) => onValueChange(sanitizeGuess(e.target.value))}
            onKeyDown={(e) => { if (e.key === "Enter") onSubmit(); }}
            inputMode="numeric"
            enterKeyHint="go"
            autoComplete="off"
            autoFocus
            aria-label={g("message")}
            className="absolute inset-0 h-full w-full cursor-pointer text-base opacity-0"
          />
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