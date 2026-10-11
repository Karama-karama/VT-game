'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/reusables/Button";
import { GameView } from "@/app/components/reusables/GameView";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Guess, TrialTable } from "@/app/components/reusables/TrialTable";
import { CardBoardWrapper } from "@/app/components/reusables/CardBoardWrapper";
import { ProgressBar } from "@/app/components/ProgressBar";
import { PlayingView } from "@/app/components/PlayingView";
const secret = "1234"
const restart =() => console.log('restart game')
export default function GamePage(){
 const t = useTranslations("PostGame");
 const g = useTranslations("Game");
const [guesses, setGuesses] = useState<Guess[]>([]);
  const router = useRouter();

    return (
        <div>
            <PlayingView
                partyId="07-8637"
                digits={["5", "8", "", ""]}
                attempts={[
                    { input: "1749", taureau: 0, vache: 2 },
                    { input: "5092", taureau: 1, vache: 1 },
                    { input: "5872", taureau: 2, vache: 1 },
                    { input: "5826", taureau: 3, vache: 0 },
                ]}
                onSubmit={() => {}}
                onRestart={() => {}}
                onAbandon={() => {}}
                />
        {/* <GameView status="fail" code={secret.split("")} count={5} seconds={161}>
        <Button label={t("retry")} icon={<RotateCcw />} onClick={() => router.push("/")} />
        </GameView> */}
        </div>
    )
}