import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const toggleStyles = tv({
  base: [
    "inline-flex items-center justify-center rounded-md text-sm font-medium",
    "ring-offset-background transition-colors",
    "hover:bg-surface-secondary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:status-disabled",
    "data-pressed:bg-surface-secondary",
    "aspect-square",
  ],
  variants: {
    size: {
      sm: "h-6",
      md: "h-7",
      lg: "h-8",
    },
    variant: {
      default: "bg-transparent",
      outline: "border border-border bg-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export type ToggleVariants = VariantProps<typeof toggleStyles>;
