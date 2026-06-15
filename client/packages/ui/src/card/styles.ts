import { tv } from "tailwind-variants";

export const cardStyles = tv({
  slots: {
    root: "relative flex flex-col overflow-hidden transition-colors",
    header: "relative flex flex-col gap-1 px-4 pt-4",
    title: "font-medium",
    description: "text-foreground-secondary",
    footer: "flex justify-end gap-2 px-4 pb-4",
    content: "h-full p-4",
  },
  variants: {
    bg: {
      default: {
        root: "bg-surface",
      },
      secondary: {
        root: "bg-surface",
      },
    },
    isBordered: {
      true: { root: "border border-border-dark" },
      false: {},
    },
    isElevated: {
      true: { root: "shadow-sm" },
      false: {},
    },
    radius: {
      none: { root: "rounded-none" },
      sm: { root: "rounded-sm" },
      md: { root: "rounded-md" },
      lg: { root: "rounded-lg" },
      full: { root: "rounded-full" },
    },
  },
  defaultVariants: {
    bg: "default",
    radius: "md",
    isBordered: false,
    isElevated: false,
  },
});
