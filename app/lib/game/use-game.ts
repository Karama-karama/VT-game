"use client";
import { useEffect, useReducer } from "react";
import { newGame } from "./session";
import { gameReducer, type Game, type GameAction } from "./state";
import { loadGame, recordResult, saveGame } from "./storage";
import { track } from "@vercel/analytics";

// Helper to calculate duration and fire Vercel analytics events
function trackGameAnalytics(game: Game) {
  const durationSeconds = game.finishedAt && (game).startedAt 
    ? Math.round((game.finishedAt - (game).startedAt) / 1000) 
    : undefined;

  if (game.status === "won") {
    track("game_completed", {
      result: "win",
      attempts: game.attempts.length,
      durationSeconds,
    });
  } else if (game.status === "lost") {
    track("game_completed", {
      result: "loss",
      attempts: game.attempts.length,
      durationSeconds,
    });
  } else if (game.status === "abandoned") {
    track("game_abandoned", {
      attempts: game.attempts.length,
      durationSeconds,
    });
  }
}

// null = "not loaded from localStorage yet"
function reducer(state: Game | null, action: GameAction): Game | null {
  if (action.type === "load") return action.game;
  return state ? gameReducer(state, action) : state;
}

export function useGame() {
  const [game, dispatch] = useReducer(reducer, null);

  // 1. Hydrate once after mount (localStorage doesn't exist on the server)
  useEffect(() => {
    dispatch({ type: "load", game: loadGame() ?? newGame() });
  }, []);

  // 2. Persist every change, and count finished games
  useEffect(() => {
    if (!game) return;
    saveGame(game);
    if (game.status !== "playing") 
      {
        recordResult(game);
        trackGameAnalytics(game);
      }
  }, [game]);

  return {
    game,
    submitGuess: (guess: string) => dispatch({ type: "guess", guess, now: Date.now() }),
    abandon: () => dispatch({ type: "abandon", now: Date.now() }),
    restart: () => {
      // restarting mid-game counts as an abandon
      if (game?.status === "playing") {
        const abandonedGame =gameReducer(game, { type: "abandon", now: Date.now() });
        recordResult(abandonedGame)
        trackGameAnalytics(abandonedGame);
      }
      dispatch({ type: "load", game: newGame() });
    },
  };
}