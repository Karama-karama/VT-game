"use client";
import { useEffect, useReducer } from "react";
import { newGame } from "./session";
import { gameReducer, type Game, type GameAction } from "./state";
import { loadGame, recordResult, saveGame } from "./storage";

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
    if (game.status !== "playing") recordResult(game);
  }, [game]);

  return {
    game,
    submitGuess: (guess: string) => dispatch({ type: "guess", guess, now: Date.now() }),
    abandon: () => dispatch({ type: "abandon", now: Date.now() }),
    restart: () => {
      // restarting mid-game counts as an abandon
      if (game?.status === "playing") {
        recordResult(gameReducer(game, { type: "abandon", now: Date.now() }));
      }
      dispatch({ type: "load", game: newGame() });
    },
  };
}