import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const linearProgressStyles = tv({
  slots: {
    track: "w-full relative overflow-hidden rounded-full",
    bar: "rounded-full absolute h-full",
  },
  variants: {
    color: {
      primary: {
        bar: "bg-primary",
        track: "bg-primary-soft",
      },
      error: {
        bar: "bg-danger",
        track: "bg-danger-soft",
      },
      success: {
        bar: "bg-success",
        track: "bg-success-soft",
      },
      secondary: {
        bar: "bg-secondary",
        track: "bg-secondary-soft",
      },
      warning: {
        bar: "bg-warning",
        track: "bg-warning-soft",
      },
    },
    size: {
      sm: {
        track: "h-0.75",
      },
      md: {
        track: "h-1.5",
      },
      lg: {
        track: "h-2",
      },
    },
    isIntermediate: {
      true: {
        bar: "animate-progress",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    color: "primary",
    isIntermediate: true,
  },
});

export type LinearProgressVariants = VariantProps<typeof linearProgressStyles>;
