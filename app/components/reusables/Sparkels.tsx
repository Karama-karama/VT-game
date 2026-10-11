// components/game/Sparkles.tsx
import { Sparkle } from "lucide-react";

const SPOTS = [
  { top: "8%",  left: "10%", size: 18, delay: "0s",   color: "text-warning" },
  { top: "14%", left: "86%", size: 14, delay: "0.4s", color: "text-success" },
  { top: "38%", left: "4%",  size: 12, delay: "0.9s", color: "text-primary" },
  { top: "46%", left: "94%", size: 20, delay: "0.2s", color: "text-warning" },
  { top: "76%", left: "8%",  size: 16, delay: "1.1s", color: "text-success" },
  { top: "84%", left: "90%", size: 12, delay: "0.7s", color: "text-primary" },
];

export function Sparkles() {
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