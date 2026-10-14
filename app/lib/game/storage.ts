import type { Game, Status } from "./state";

const GAME_KEY = "vt:v1:game";   // v1 → a future format change won't crash old saves
const STATS_KEY = "vt:v1:stats";
const HISTORY_LIMIT = 30;

export interface FinishedGame {
  id: string;
  status: Exclude<Status, "playing">;
  tries: number;
  durationMs: number;
  finishedAt: number;
}

export interface Stats {
  played: number;
  won: number;
  lost: number;
  abandoned: number;
  history: FinishedGame[];
}

const EMPTY_STATS: Stats = { played: 0, won: 0, lost: 0, abandoned: 0, history: [] };

function read(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // storage blocked, or corrupted JSON
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota / private mode: the game still works, it just won't persist
  }
}

function isGame(value: unknown): value is Game {
  if (typeof value !== "object" || value === null) return false;
  const g = value as Record<string, unknown>;
  return (
    typeof g.id === "string" &&
    typeof g.secret === "string" && /^\d{4}$/.test(g.secret) &&
    Array.isArray(g.attempts) &&
    typeof g.status === "string" &&
    ["playing", "won", "lost", "abandoned"].includes(g.status) &&
    typeof g.startedAt === "number" &&
    (g.finishedAt === null || typeof g.finishedAt === "number")
  );
}

function isStats(value: unknown): value is Stats {
  if (typeof value !== "object" || value === null) return false;
  const s = value as Record<string, unknown>;
  return (
    ["played", "won", "lost", "abandoned"].every((k) => typeof s[k] === "number") &&
    Array.isArray(s.history)
  );
}

export function loadGame(): Game | null {
  const data = read(GAME_KEY);
  return isGame(data) ? data : null;
}

export function saveGame(game: Game) {
  write(GAME_KEY, game);
}

export function loadStats(): Stats {
  const data = read(STATS_KEY);
  return isStats(data) ? data : EMPTY_STATS;
}

// Idempotent: a game id is counted once, even if this runs twice (Strict Mode, refresh...)
export function recordResult(game: Game) {
  if (game.status === "playing" || game.finishedAt === null) return;

  const stats = loadStats();
  if (stats.history.some((entry) => entry.id === game.id)) return;

  const entry: FinishedGame = {
    id: game.id,
    status: game.status,
    tries: game.attempts.length,
    durationMs: game.finishedAt - game.startedAt,
    finishedAt: game.finishedAt,
  };

  write(STATS_KEY, {
    ...stats,
    played: stats.played + 1,
    [game.status]: stats[game.status] + 1,
    history: [entry, ...stats.history].slice(0, HISTORY_LIMIT),
  });
}