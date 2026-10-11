import type { ButtonHTMLAttributes, ReactNode } from "react";

type Color = "primary" | "ink" | "outline" | "success" | "danger";

const colors: Record<Color, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-105",
  ink: "bg-ink text-ink-foreground hover:brightness-125",
  outline: "bg-surface-2 text-foreground border border-border hover:bg-surface",
  success: "bg-success text-white hover:brightness-110",
  danger: "bg-danger text-white hover:brightness-110",
};

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** Translated label, e.g. t("game.submit") */
  label: string;
  icon?: ReactNode;
  color?: Color;
  fullWidth?: boolean;
}

export function Button({
  label,
  icon,
  color = "primary",
  fullWidth = false,
  type = "button",
  className = "",
  ...props // onClick, disabled, etc. pass straight through
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "font-display inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5",
        "text-xs font-bold uppercase tracking-wider",
        "shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)]",
        "transition active:translate-y-px active:shadow-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        fullWidth ? "w-full" : "",
        colors[color],
        className,
      ].join(" ")}
      {...props}
    >
      {icon && <span aria-hidden className="size-4 shrink-0 [&>svg]:size-full">{icon}</span>}
      {label}
    </button>
  );
}