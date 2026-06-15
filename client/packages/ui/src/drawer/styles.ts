import { tv } from "tailwind-variants";

export const drawerStyles = tv({
  slots: {
    backdrop:
      "[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute",
    viewport: "fixed inset-0 flex",
    content: "mx-auto w-full",
    close: "absolute right-4 top-4",
    title: "",
    description: "",
    popup:
      "bg-surface p-6 text-foreground shadow-lg overflow-y-auto overscroll-contain touch-auto transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none  data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
    footer: "flex items-center justify-end gap-2",
    bar: "w-12 h-1 mx-auto mb-4 rounded-full bg-surface-tertiary",
  },
  variants: {
    anchor: {
      right: {
        viewport: "justify-end",
        popup: [
          "data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))]",
          "supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:pr-6",
        ],
      },
      left: {
        viewport: "justify-start",
        popup: [
          "data-ending-style:transform-[translateX(calc(-100%+var(--bleed)-var(--viewport-padding)-2px))] data-starting-style:transform-[translateX(calc(-100%+var(--bleed)-var(--viewport-padding)-2px))]",
          "supports-[-webkit-touch-callout:none]:ml-0 supports-[-webkit-touch-callout:none]:pl-6",
        ],
      },
      down: {
        viewport: "items-end",
        popup: [
          "data-ending-style:transform-[translateY(calc(100%-3rem+2px))] data-starting-style:transform-[translateY(calc(100%-3rem+2px))]",
          "-mb-12",
          "pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+3rem)] pt-4 ",
        ],
      },
      up: {
        viewport: "items-start",
        popup: [
          "data-ending-style:transform-[translateY(calc(-100%+3rem-2px))] data-starting-style:transform-[translateY(calc(-100%+3rem-2px))]",
          "-mt-12",
          "pt-[calc(1.5rem+env(safe-area-inset-top,0px)+3rem)] pb-4 ",
        ],
      },
    },
    size: {
      xs: {
        popup: "max-w-xs",
      },
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
      "2xl": {
        popup: "max-w-2xl",
      },
      "3xl": {
        popup: "max-w-3xl",
      },
      "4xl": {
        popup: "max-w-4xl",
      },
      "5xl": {
        popup: "max-w-5xl",
      },
      full: {
        popup: "max-w-full",
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
    radius: {
      none: { popup: "rounded-none" },
      sm: { popup: "rounded-sm" },
      md: { popup: "rounded-md" },
      lg: { popup: "rounded-lg" },
      full: { popup: "rounded-full" },
    },
  },
  compoundVariants: [
    {
      anchor: ["right", "left"],
      className: {
        viewport:
          "[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] items-stretch p-(--viewport-padding)",
        popup: [
          "[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px]",
          "transform-[translateX(var(--drawer-swipe-movement-x))] ",
          "h-full",
        ],
      },
    },
    {
      anchor: ["down", "up"],
      className: {
        viewport: "justify-center",
        popup: [
          "transform-[translateY(var(--drawer-swipe-movement-y))]",
          "w-full max-h-[calc(80vh+3rem)]",
        ],
      },
    },
  ],
  defaultVariants: {
    size: "md",
    backdrop: "opaque",
    anchor: "down",
    radius: "md",
  },
});
