import { tv } from "tailwind-variants";

export const progressStyles = tv({
  slots: {
    root: "box-border grid w-48 grid-cols-2 gap-y-2",
    label: "text-sm font-medium text-foreground-secondary",
    value:
      "col-start-2 m-0 text-right text-sm leading-5 text-foreground-secondary",
    track: "col-span-2 block h-1 rounded-sm w-48 overflow-hidden bg-default",
    indicator: "block bg-default-active transition-all duration-500",
  },
});
