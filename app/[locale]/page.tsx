'use client';
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { IntroCard } from "../components/reusables/IntroCard";
import { CardBoardWrapper } from "../components/reusables/CardBoardWrapper";
import { DigitInput } from "../components/reusables/DigitInput";
import { RulesBox } from "../components/RulesBox";
import { startOrResumeGame } from "@/app/lib/game/session";

// const MAX_TRIES = 10;
// const attempts = [1, 2, 3, 4, 6, 6, 6, 7, 8]; // Example attempts for demonstration
export default function Home() {
  // const t = useTranslations('HomePage');
  // const g = useTranslations('Game');
  const intro = useTranslations("IntroCard");
  const router = useRouter();
  return (
    <>
         <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <IntroCard onPlay={() => {
        startOrResumeGame();
        router.push("/game");
        }} />
      <CardBoardWrapper tilted={true} className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="flex flex-col items-center text-center pt-2">
        <span className="text-[11px] font-bold tracking-widest text-[#8C8068] uppercase">
          {intro("code")}
        </span>
        <h2 className="mt-1 text-xl  font-bold text-[#2C2416]">
          {intro("challenge")}
        </h2>

        {/* Masked Code Dots */}
        <div className="mt-5 flex gap-3 sm:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <DigitInput
              key={i}
              hidden={true}
            />
          ))}
        </div>
        {/* Rules Box */}
        <RulesBox/>

      </div>
        </CardBoardWrapper>
    </div>
    </>
  );
}
