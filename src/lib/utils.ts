import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names with clsx and merges Tailwind conflicts with tailwind-merge.
 * Essential for customizable neo-brutalist component variants.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
