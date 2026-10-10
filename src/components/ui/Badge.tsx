import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "black"
  | "outline"
  | "blue"
  | "red"
  | "yellow"
  | "green"
  | "purple"
  | "cyan";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pill?: boolean;
}

/**
 * Neo-brutalist Badge / Tag component.
 * Used for section markers, status indicators, and category pills.
 */
export function Badge({
  className,
  variant = "default",
  pill = true,
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-surface text-foreground border-2 border-border shadow-neo-sm",
    black: "bg-foreground text-background border-2 border-border shadow-neo-sm",
    outline: "bg-transparent text-foreground border-2 border-border",
    blue: "bg-gdg-blue text-white border-2 border-black shadow-neo-sm",
    red: "bg-gdg-red text-white border-2 border-black shadow-neo-sm",
    yellow: "bg-gdg-yellow text-black border-2 border-black shadow-neo-sm",
    green: "bg-gdg-green text-black border-2 border-black shadow-neo-sm",
    purple: "bg-gdg-purple text-white border-2 border-black shadow-neo-sm",
    cyan: "bg-gdg-cyan text-black border-2 border-black shadow-neo-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider select-none",
        pill ? "rounded-full" : "rounded-lg",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
