import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const tooltipStyles = tv({
  slots: {
    popup: [
      "bg-surface inline-flex px-3 py-1 text-sm font-medium text-foreground",
      "transition-[transform,scale,opacity] data-ending-style:opacity-0 data-ending-style:scale-90 data-instant:transition-none data-starting-style:opacity-0 data-starting-style:scale-90",
    ],
    arrow: [
      "text-surface",
      "data-[side=bottom]:-top-2 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
    ],
    positioner: "z-popover outline-hidden",
  },
  variants: {
    radius: {
      none: { popup: "rounded-none" },
      sm: { popup: "rounded-sm" },
      md: { popup: "rounded-md" },
      lg: { popup: "rounded-lg" },
      full: { popup: "rounded-full" },
    },
  },
  defaultVariants: {
    radius: "md",
  },
});

export type TooltipVariants = VariantProps<typeof tooltipStyles>;
export type TooltipSlots = keyof ReturnType<typeof tooltipStyles>;
