import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const previewCardStyles = tv({
  slots: {
    positioner: "z-popover outline-hidden",
    popup: [
      "bg-surface max-w-64 p-2 text-sm shadow-lg backdrop-blur-3xl",
      "origin-(--transform-origin)",
      "transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
    ],
    arrow: [
      "text-surface",
      "data-[side=bottom]:-top-2 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
    ],
    backdrop: [
      "z-backdrop fixed inset-0 min-h-dvh",
      "transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
    ],
  },
  variants: {
    radius: {
      none: { popup: "rounded-none" },
      sm: { popup: "rounded-sm" },
      md: { popup: "rounded-md" },
      lg: { popup: "rounded-lg" },
    },
    backdrop: {
      transparent: {
        backdrop: "",
      },
      opaque: {
        backdrop: "bg-black/50",
      },
      blur: {
        backdrop: "bg-black/30 backdrop-blur-md backdrop-saturate-150",
      },
    },
  },
  defaultVariants: {
    radius: "md",
    backdrop: "transparent",
  },
});

export type PreviewCardVariants = VariantProps<typeof previewCardStyles>;
export type PreviewCardSlots = keyof ReturnType<typeof previewCardStyles>;
