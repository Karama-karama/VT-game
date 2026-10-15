// components/game/Sparkles.tsx
import { Sparkle } from "lucide-react";
import confetti from "canvas-confetti";

const SPOTS = [
  { top: "8%",  left: "10%", size: 18, delay: "0s",   color: "text-warning" },
  { top: "14%", left: "86%", size: 14, delay: "0.4s", color: "text-success" },
  { top: "38%", left: "4%",  size: 12, delay: "0.9s", color: "text-primary" },
  { top: "46%", left: "94%", size: 20, delay: "0.2s", color: "text-warning" },
  { top: "76%", left: "8%",  size: 16, delay: "1.1s", color: "text-success" },
  { top: "84%", left: "90%", size: 12, delay: "0.7s", color: "text-primary" },
];

export function Sparkles() {
  // High-energy multi-point burst
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Fire a rich cluster of colors
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#fbbf24", "#34d399"], // Amber / Success green
    });
    fire(0.2, {
      spread: 60,
      colors: ["#38bdf8", "#f472b6"], // Sky blue / Pink
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#a855f7", "#fbbf24"], // Purple / Amber
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#34d399", "#ffffff"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#f472b6", "#38bdf8"],
    });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
      {SPOTS.map((spot, i) => (
        <Sparkle
          key={i}
          size={spot.size}
          fill="currentColor"
          className={`absolute animate-twinkle ${spot.color}`}
          style={{ top: spot.top, left: spot.left, animationDelay: spot.delay }}
        />
      ))}
    </div>
  );
}