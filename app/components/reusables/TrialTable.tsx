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
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{t("caption")}</caption>
        {/* Strictly control space allocation */}
        <colgroup>
          <col className="w-12 sm:w-16"/> 
          <col className="w-auto"/>       
          <col className="w-28 sm:w-36"/> 
        </colgroup>
        <thead className="bg-ink text-ink-foreground">
          <tr className="text-[10px] uppercase tracking-widest">
            <th scope="col" className="pl-3 pr-1 py-3 font-bold">{t("trial")}</th>
            <th scope="col" className="px-2 py-3 font-bold text-center ">{t("input")}</th>
            <th scope="col" className="pr-3 pl-1 py-3 text-center  font-bold">{t("result")}</th>
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
                <td className="px-2 py-3 sm:px-3 font-mono text-xs text-muted text-center">
                 {'#'}{String(index + 1).padStart(2, "0")}
                </td>
                <td className="pl-3 pr-1 py-2.5 font-mono text-base font-bold tracking-[0.15em] sm:tracking-[0.4em] text-foreground  text-center ">
                  {guess.input}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1 sm:gap-2">
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