import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const skeletonStyles = tv({
  slots: {
    root: [
      "group",
      "relative",
      "overflow-hidden",
      "bg-surface-secondary dark:bg-surface",
      "pointer-events-none",
      // before
      "before:opacity-100",
      "before:absolute",
      "before:inset-0",
      "before:-translate-x-full",
      "before:animate-[shimmer_2s_infinite]",
      "before:border-t",
      "before:border-background-quaternary/30",
      "before:bg-linear-to-r",
      "before:from-transparent",
      "before:via-background-quaternary",
      "before:to-transparent",
      // after
      "after:opacity-100",
      "after:absolute",
      "after:inset-0",
      "after:-z-10",
      "after:bg-surface-secondary",
      // state
      "data-[loaded=true]:pointer-events-auto",
      "data-[loaded=true]:overflow-visible",
      "data-[loaded=true]:bg-transparent!",
      "data-[loaded=true]:before:-z-10 data-[loaded=true]:before:animate-none data-[loaded=true]:before:opacity-0",
      "data-[loaded=true]:after:opacity-0",
    ],
    content: ["opacity-0", "group-data-[loaded=true]:opacity-100"],
  },
  variants: {
    disableAnimation: {
      true: {
        root: "before:animate-none before:transition-none after:transition-none",
        content: "transition-none",
      },
      false: {
        root: "transition-[background] duration-300!",
        content:
          "transition-opacity duration-300! motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    disableAnimation: false,
  },
});

export type SkeletonVariants = VariantProps<typeof skeletonStyles>;
