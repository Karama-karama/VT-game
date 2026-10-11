"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string; // translated, for screen readers
  children: ReactNode;
}

export function Modal({ open, onClose, title, closeLabel, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // Sync the `open` prop with the DOM element
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose} // fires on Escape too, so state never gets out of sync
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // click on the backdrop
      }}
      className="m-auto w-[min(92vw,34rem)] rounded-card border border-border bg-surface p-0 text-foreground shadow-card backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[85dvh] flex-col gap-4 overflow-y-auto p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="grid size-8 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {children}
      </div>
    </dialog>
  );
}