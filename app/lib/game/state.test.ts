// lib/game/state.test.ts
import { describe, expect, it } from "vitest";
import { MAX_TRIES } from "./logic";
import { createGame, gameReducer } from "./state";

const base = createGame("1234", "game-1", 1000);

describe("gameReducer", () => {
  it("records an attempt without mutating the previous state", () => {
    const next = gameReducer(base, { type: "guess", guess: "1243", now: 2000 });
    expect(next.attempts).toEqual([{ guess: "1243", bulls: 2, cows: 2 }]);
    expect(base.attempts).toHaveLength(0);
    expect(next.status).toBe("playing");
  });

  it("wins on four bulls and stamps the finish time", () => {
    const next = gameReducer(base, { type: "guess", guess: "1234", now: 2000 });
    expect(next.status).toBe("won");
    expect(next.finishedAt).toBe(2000);
  });

  it("loses after MAX_TRIES wrong guesses", () => {
    let game = base;
    for (let i = 0; i < MAX_TRIES; i++) {
      game = gameReducer(game, { type: "guess", guess: "5678", now: 3000 });
    }
    expect(game.status).toBe("lost");
    expect(game.attempts).toHaveLength(MAX_TRIES);
  });

  it("ignores invalid guesses", () => {
    expect(gameReducer(base, { type: "guess", guess: "11", now: 2000 })).toBe(base);
  });

  it("ignores guesses once the game is finished", () => {
    const won = gameReducer(base, { type: "guess", guess: "1234", now: 2000 });
    expect(gameReducer(won, { type: "guess", guess: "5678", now: 3000 })).toBe(won);
  });

  it("can be abandoned", () => {
    const next = gameReducer(base, { type: "abandon", now: 2500 });
    expect(next.status).toBe("abandoned");
    expect(next.finishedAt).toBe(2500);
  });
});