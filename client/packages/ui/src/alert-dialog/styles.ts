import { tv } from "tailwind-variants";

export const alertDialogStyles = tv({
  slots: {
    header: "p-4 text-base font-bold",
    backdrop: [
      "fixed inset-0 min-h-dvh transition-all  duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 z-backdrop",
      "supports-[-webkit-touch-callout:none]:absolute",
    ],
    popup: [
      "z-dialog fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  max-w-md w-full",
      "transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
      "bg-surface shadow-lg p-4",
    ],
    footer: "flex w-full items-center justify-end gap-2 pt-4",
    trigger: "",
    title: "text-foreground",
    description: "text-foreground-secondary",
    cancel: "",
    action: "",
  },
  variants: {
    radius: {
      none: {
        popup: "rounded-none",
      },
      sm: {
        popup: "rounded-sm",
      },
      md: {
        popup: "rounded-md",
      },
      lg: {
        popup: "rounded-lg",
      },
    },
    size: {
      sm: {
        popup: "max-w-sm",
      },
      md: {
        popup: "max-w-md",
      },
      lg: {
        popup: "max-w-lg",
      },
      xl: {
        popup: "max-w-xl",
      },
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
    backdrop: "opaque",
    radius: "md",
    size: "md",
  },
});
