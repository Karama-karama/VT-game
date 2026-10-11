"use client"

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { Modal } from "./reusables/Modal";
import { RulesBox } from "./RulesBox"
import { LanguageToggle } from "./languageSwitcher";

interface HeaderProps {
  children?: ReactNode; // right side: language toggle, "no account" tag...
}

export function Header({ children }: HeaderProps) {
  const t = useTranslations("header");
  const [rulesOpen, setRulesOpen] = useState(false);
  return (
 <>
      <header className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-8 border-b-2 border-accent-foreground ">
        <div className="flex items-center gap-3">
          <Logo className="-rotate-6 shadow-card transition-transform duration-200 hover:rotate-0" />
          <div className="flex flex-col text-left leading-tight">
            <span className="font-display text-base font-bold text-foreground">{t("name")}</span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
              {t("tagline")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {children}
          <button
            type="button"
            onClick={() => setRulesOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground transition hover:bg-surface"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-foreground" />
            {t("rules")}
          </button>
        <LanguageToggle />

        </div>
      </header>

      <Modal
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        title={t("rules")}
        closeLabel={t("close")}
      >
        <RulesBox />
      </Modal>
    </>
  );
}