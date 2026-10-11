import { type ReactNode } from "react";
import { Tag } from "./reusables/Tag";
import { Copyright } from "lucide-react";

interface HeaderProps {
  children?: ReactNode; // right side: language toggle, "no account" tag...
}

export function Footer({ children }: HeaderProps) {
  return (
 <>
      <footer className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-8 border-t border-accent-foreground ">
        <div className="flex items-center gap-3">
          
        </div>

        <div className="flex items-center gap-3">
          {children}
          <Tag tone="neutral" size="sm" upperCase icon={<Copyright />}>
          Karama
        </Tag>

        </div>
      </footer>
    </>
  );
}