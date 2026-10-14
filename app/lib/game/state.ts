import { CODE_LENGTH, MAX_TRIES, evaluateGuess, validateGuess } from "./logic";

export interface Attempt {
  guess: string;
  bulls: number;
  cows: number;
}

export type Status = "playing" | "won" | "lost" | "abandoned";

export interface Game {
  id: string;
  secret: string;
  attempts: Attempt[];
  status: Status;
  startedAt: number;          // ms timestamp
  finishedAt: number | null;  // ms timestamp, null while playing
}

export type GameAction =
  | { type: "guess"; guess: string; now: number }
  | { type: "abandon"; now: number }
  | { type: "load"; game: Game }; // new game OR restored save

export function createGame(secret: string, id: string, now: number): Game {
  return { id, secret, attempts: [], status: "playing", startedAt: now, finishedAt: null };
}

export function gameReducer(state: Game, action: GameAction): Game {
  switch (action.type) {
    case "guess": {
      if (state.status !== "playing") return state;
      if (validateGuess(action.guess) !== null) return state;

      const { bulls, cows } = evaluateGuess(state.secret, action.guess);
      const attempts = [...state.attempts, { guess: action.guess, bulls, cows }];

      const status: Status =
        bulls === CODE_LENGTH ? "won" : attempts.length >= MAX_TRIES ? "lost" : "playing";

      return {
        ...state,
        attempts,
        status,
        finishedAt: status === "playing" ? null : action.now,
      };
    }

    case "abandon":
      if (state.status !== "playing") return state;
      return { ...state, status: "abandoned", finishedAt: action.now };

    case "load":
      return action.game;
  }
}