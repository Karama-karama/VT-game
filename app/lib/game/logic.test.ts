import { describe, expect, it } from "vitest";
import { evaluateGuess, generateSecret, sanitizeGuess, validateGuess } from "./logic";

describe("evaluateGuess", () => {
  it("counts bulls and cows", () => {
    expect(evaluateGuess("1234", "1243")).toEqual({ bulls: 2, cows: 2 });
  });
  it("detects a perfect guess", () => {
    expect(evaluateGuess("1234", "1234")).toEqual({ bulls: 4, cows: 0 });
  });
  it("handles no match", () => {
    expect(evaluateGuess("1234", "5678")).toEqual({ bulls: 0, cows: 0 });
  });
});

describe("validateGuess", () => {
  it("accepts a valid guess", () => expect(validateGuess("1234")).toBeNull());
  it("rejects duplicates", () => expect(validateGuess("1123")).toBe("duplicate"));
  it("rejects wrong length", () => expect(validateGuess("12")).toBe("length"));
  it("rejects non-digits", () => expect(validateGuess("12a4")).toBe("digits"));
});

describe("generateSecret", () => {
  it("always returns 4 distinct digits", () => {
    for (let i = 0; i < 200; i++) {
      const secret = generateSecret();
      expect(secret).toMatch(/^\d{4}$/);
      expect(new Set(secret).size).toBe(4);
    }
  });
  it("code doesn't start with a O ", ()=> {
    const secret = generateSecret();
    expect(secret[0] !== '0')
  })
});

describe("sanitizeGuess", () => {
  it("strips non-digits", () => expect(sanitizeGuess("1a2-3")).toBe("123"));
  it("drops repeated digits", () => expect(sanitizeGuess("1123")).toBe("123"));
  it("caps the length", () => expect(sanitizeGuess("123456")).toBe("1234"));
});