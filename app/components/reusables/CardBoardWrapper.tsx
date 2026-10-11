import type { ReactNode } from "react";

interface GameCardProps {
  tilted?: boolean;
  className?: string;
  children: ReactNode;
}

export function CardBoardWrapper({
  tilted = false,
  className = "",
  children,
}: GameCardProps) {
  return (
    <div
      className={`
        relative w-full max-w-xl p-6 sm:p-8
        bg-[#EFE6D5] text-[#2C2416] 
        border border-[#DCD3BE] rounded-[28px] 
        shadow-[0_6px_0_0_#C5BA9E]
        transition-transform duration-300 ease-out
        ${tilted ? "rotate-[0.8deg] hover:rotate-0" : ""}
        ${className}
      `}
    >
      {/* Screw/Rivet details in top corners */}
      <span className="absolute top-3.5 left-4 w-2 h-2 rounded-full bg-[#A89C83]/40 border border-[#8C8068]/30" />
      <span className="absolute top-3.5 right-4 w-2 h-2 rounded-full bg-[#A89C83]/40 border border-[#8C8068]/30" />

      {children}
    </div>
  );
}