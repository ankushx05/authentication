import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const toolbarStyles = tv({
  slots: {
    root: [
      "flex items-center gap-1 rounded-lg border border-border bg-surface p-1",
    ],
    button: [
      "inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium",
      "ring-offset-background transition-colors",
      "hover:bg-surface-secondary hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:status-disabled",
      "data-pressed:bg-surface-secondary",
    ],
    link: [
      "inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium",
      "text-foreground-secondary underline-offset-4 hover:text-foreground hover:underline",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    ],
    separator: "mx-1 h-6 w-px shrink-0 bg-border",
    group: "flex items-center gap-1",
    input: [
      "flex-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm",
      "placeholder:text-foreground-tertiary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    ],
  },
  variants: {
    orientation: {
      horizontal: { root: "flex-row", separator: "h-6 w-px" },
      vertical: {
        root: "flex-col",
        separator: "h-px w-full",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type ToolbarVariants = VariantProps<typeof toolbarStyles>;
