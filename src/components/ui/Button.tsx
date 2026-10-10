"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary" // Solid black with white text, hard shadow
  | "outline" // Surface bg with border & hard shadow
  | "pill" // Rounded full pill with neo border & shadow
  | "pill-blue"
  | "pill-red"
  | "pill-yellow"
  | "pill-green"
  | "pill-purple"
  | "pill-cyan"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

/**
 * Neo-brutalist Button Component.
 * Supports tactile press states, hard 2px borders, solid offset shadows,
 * and Google brand colored pill variants.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles: 2px border, hard shadow, tactile transition
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gdg-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    // Size variants
    const sizeStyles: Record<ButtonSize, string> = {
      sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
      md: "text-sm px-5 py-2.5 gap-2 rounded-xl",
      lg: "text-base px-7 py-3.5 gap-2.5 rounded-xl font-semibold",
    };

    // Visual variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-foreground text-background border-2 border-border shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-sm",
      outline:
        "bg-surface text-foreground border-2 border-border shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg hover:bg-muted/40 active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-sm",
      pill:
        "rounded-full bg-surface text-foreground border-2 border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none font-semibold",
      "pill-blue":
        "rounded-full bg-gdg-blue text-white border-2 border-black shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none font-semibold",
      "pill-red":
        "rounded-full bg-gdg-red text-white border-2 border-black shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none font-semibold",
      "pill-yellow":
        "rounded-full bg-gdg-yellow text-black border-2 border-black shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none font-semibold",
      "pill-green":
        "rounded-full bg-gdg-green text-black border-2 border-black shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none font-semibold",
      "pill-purple":
        "rounded-full bg-gdg-purple text-white border-2 border-black shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none font-semibold",
      "pill-cyan":
        "rounded-full bg-gdg-cyan text-black border-2 border-black shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 active:translate-y-0 active:shadow-none font-semibold",
      ghost:
        "bg-transparent text-foreground hover:bg-muted/60 border-2 border-transparent hover:border-border hover:shadow-neo-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
        {children}
        {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
