import {Tag} from "./reusables/Tag";
import { useTranslations } from 'next-intl';

export function RulesBox() {
    const r = useTranslations('Rules');
    const g = useTranslations('Game');

    return (
        <div className="mt-6 w-full p-4 sm:p-5 bg-[#FAF7F2]/80 border border-[#E8DFC9] rounded-2xl text-left">
          <div className="flex justify-between items-center pb-3 border-b border-[#E8DFC9]">
            <h4 className="font-bold text-sm text-[#2C2416]">
              {r("subtitle")}
            </h4>
            <span className="text-[10px] font-extrabold tracking-wider text-[#8C8068] uppercase">
              {r("title")}
            </span>
          </div>

          <div className="mt-3.5 flex flex-col gap-2.5 text-xs">
            {/* Bull legend */}
            <div className="flex items-center gap-3">
              <Tag tone="taureau" size="sm" badge="T">{g("taureau")}</Tag>
              
              <span className="text-[#6B604B]">
                {r("clues.bull.description")}
              </span>
            </div>

            {/* Cow legend */}
            <div className="flex items-center gap-3">
              <Tag tone="vache" size="sm" badge="V">{g("vache")}</Tag>
              <span className="text-[#6B604B]">
                {r("clues.cow.description")}
              </span>
            </div>
          </div>
        </div>
    )
}