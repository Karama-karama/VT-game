'use client';
import { useState } from "react";
import { Button } from "@/app/components/reusables/Button";
import { GameView } from "@/app/components/reusables/GameView";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { PlayingView } from "@/app/components/PlayingView";

import {MAX_TRIES, validateGuess } from "@/app/lib/game/logic";
import { useGame } from "@/app/lib/game/use-game"
import { Modal } from "@/app/components/reusables/Modal";

export default function GamePage(){
 const t = useTranslations("PostGame");
 const g = useTranslations("Game");

const { game, submitGuess, abandon, restart } = useGame();

  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!game) return null; // still loading from localStorage (skeleton later)

  function handleChange(next: string) {
    setValue(next);
    setError(null);
  }

  function handleSubmit() {
    const problem = validateGuess(value);
    if (problem) {
      setError(g(`errors.${problem}`));
      return;
    }
    submitGuess(value);
    setValue("");
  }

  function handleRestart() {
    restart();
    setValue("");
    setError(null);
  }

  // Finished game → result screen (also what you see after a refresh)
  if (game.status !== "playing") {
    const seconds = Math.round(((game.finishedAt ?? game.startedAt) - game.startedAt) / 1000);
    return (
      <>
      <GameView
        status={game.status === "won" ? "success" : "fail"}
        code={game.secret.split("")}
        count={game.attempts.length}
        seconds={seconds}
        attempts={game.attempts.map((a) => ({ input: a.guess, taureau: a.bulls, vache: a.cows }))}

      >
        <Button label={t("retry")} icon={<RotateCcw />} onClick={handleRestart} />
      </GameView>
      </>
    );
  }

  return (
    <>
      <PlayingView
        partyId={game.id.slice(0, 6).toUpperCase()}
        total={MAX_TRIES}
        attempts={game.attempts.map((a) => ({ input: a.guess, taureau: a.bulls, vache: a.cows }))}
        value={value}
        onValueChange={handleChange}
        error={error}
        onSubmit={handleSubmit}
        onRestart={handleRestart}
        onAbandon={() => setConfirmOpen(true)}
      />

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={g("abandonTitle")}
        closeLabel={g("close")}
      >
        <p className="text-sm text-muted">{g("abandonText")}</p>
        <div className="flex justify-end gap-3">
          <Button label={g("cancel")} color="outline" onClick={() => setConfirmOpen(false)} />
          <Button
            label={g("abandonConfirm")}
            color="danger"
            onClick={() => { abandon(); setConfirmOpen(false); }}
          />
        </div>
      </Modal>
    </>
  );
}