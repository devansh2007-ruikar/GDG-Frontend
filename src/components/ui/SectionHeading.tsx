import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center" | "right";
  badgeVariant?: "default" | "black" | "blue" | "red" | "yellow" | "green" | "purple";
}

/**
 * Neo-brutalist Section Heading component.
 * Renders the distinctive pixel display font heading with optional badge and subtitle.
 */
export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  badgeVariant = "yellow",
  className,
  ...props
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  return (
    <div
      className={cn("flex flex-col space-y-3 mb-8 md:mb-12", alignClass, className)}
      {...props}
    >
      {badge && (
        <Badge variant={badgeVariant} className="mb-1">
          {badge}
        </Badge>
      )}
      <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
