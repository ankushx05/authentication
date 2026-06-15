import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const sliderStyles = tv({
  slots: {
    root: "relative flex touch-none select-none items-center",
    control: "flex items-center",
    track:
      "relative h-5 w-full grow overflow-hidden rounded-full bg-neutral-800",
    indicator: "absolute h-full bg-secondary",
    thumb: [
      "block h-5 w-5 rounded-full bg-white",
      "has-focus-visible:focus-visible",
      "disabled:status-disabled",
    ],
    value: "text-sm",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "w-full",
        control: "w-full",
      },
      vertical: {
        control: "h-full",
        root: "h-full flex-col",
        track: "h-full w-5",
        indicator: "w-full bottom-0",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type SliderVariants = VariantProps<typeof sliderStyles>;
