import { generateSecret } from "./logic";
import { createGame, type Game } from "./state";
import { loadGame, saveGame } from "./storage";

export function newGame(): Game {
  return createGame(generateSecret(), crypto.randomUUID(), Date.now());
}

// Home → "Jouer": keep an unfinished game, otherwise start a fresh one
export function startOrResumeGame() {
  if (loadGame()?.status === "playing") return;
  saveGame(newGame());
}