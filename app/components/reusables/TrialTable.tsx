import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Tag } from "./Tag";

interface TrialTableProps {
    guesses: Guess[],
    className?: string; 
}
export type Guess = {
    input: string,
    taureau: number,
    vache: number
}
export function TrialTable(
{ guesses, className = "" }: TrialTableProps
){
    const t= useTranslations("Table")
    return (
 <div className={`w-full overflow-x-auto rounded-xl border border-border ${className}`}>
      <table className="table-fixed w-full min-w-[20rem] border-collapse text-left text-sm">
        <caption className="sr-only">{t("caption")}</caption>

        <thead className="bg-ink text-ink-foreground">
          <tr className="text-[11px] uppercase tracking-widest">
            <th scope="col" className="px-4 py-3 font-bold">{t("trial")}</th>
            <th scope="col" className="px-4 py-3 font-bold">{t("input")}</th>
            <th scope="col" className="px-4 py-3 text-right font-bold">{t("result")}</th>
          </tr>
        </thead>

        <tbody>
          {guesses.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-muted">
                {t("empty")}
              </td>
            </tr>
          ) : (
            guesses.map((guess, index) => (
              <tr
                key={index}
                className="animate-row-in border-t border-border/60 odd:bg-surface-2 even:bg-surface motion-reduce:animate-none"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted">
                 {'#'}{String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 font-mono text-base font-bold tracking-[0.4em] text-foreground">
                  {guess.input}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Tag tone="taureau" size="sm" badge="T">{guess.taureau}T</Tag>
                    <Tag tone="vache" size="sm" badge="V">{guess.vache}V</Tag>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    )
}