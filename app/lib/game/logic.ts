export const CODE_LENGTH = 4;
export const MAX_TRIES = 10;

export function generateSecret(length = CODE_LENGTH): string {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = digits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    // If index 0 gets assigned '0', swap it with a random non-zero digit in the selected slice
  if (digits[0] === "0") {
    // Pick a random position between 1 and (length - 1)
    const swapIndex = Math.floor(Math.random() * (length - 1)) + 1;
    [digits[0], digits[swapIndex]] = [digits[swapIndex], digits[0]];
  }
  console.log(digits.slice(0, length).join(""))
    return digits.slice(0, length).join("");
}

export type GuessError = "digits" | "length" | "duplicate";

export function validateGuess(guess: string, length = CODE_LENGTH): GuessError | null {
  if (guess.length !== length) return "length";
  if (!/^\d+$/.test(guess)) return "digits";
  if (new Set(guess).size !== guess.length) return "duplicate";
  return null;
}

export function evaluateGuess(secret: string, guess: string) {
  let bulls = 0; // right digit, right place → Taureau
  let cows = 0;  // right digit, wrong place → Vache
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) bulls++;
    else if (secret.includes(guess[i])) cows++;
  }
  return { bulls, cows };
}

// Keeps digits only, drops repeats, caps the length. Safe to call on every keystroke.
export function sanitizeGuess(raw: string, length = CODE_LENGTH): string {
  return [...new Set(raw.replace(/\D/g, ""))].join("").slice(0, length);
}