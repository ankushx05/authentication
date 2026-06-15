import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const menubarStyles = tv({
  slots: {
    root: [
      "flex items-center gap-1 rounded-lg border border-border bg-surface p-1",
    ],
    trigger: [
      "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium",
      "ring-offset-background transition-colors",
      "hover:bg-surface-secondary hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-popup-open:bg-surface-secondary",
      "disabled:status-disabled",
    ],
  },
});

export type MenubarVariants = VariantProps<typeof menubarStyles>;
