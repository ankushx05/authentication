import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const toastStyles = tv({
  slots: {
    root: [
      [
        "absolute right-0 bottom-0 left-auto w-full mr-0 origin-bottom",
        "z-[calc(1000-var(--toast-index))]",
      ],
      ["p-4", "[--gap:0.75rem]", "[--peek:0.75rem]"],
      [
        "[--height:var(--toast-frontmost-height,var(--toast-height))]",
        "h-(--height) data-expanded:h-(--toast-height)",
      ],
      ["rounded-lg border bg-clip-padding shadow-lg select-none border-border"],
      [
        "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
        "[--shrink:calc(1-var(--scale))]",
        "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
      ],
      [
        "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
      ],
      [
        "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
      ],
      [
        "data-starting-style:transform-[translateY(150%)]",
        "data-ending-style:opacity-0",
        "data-limited:opacity-0",
        "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]",
      ],
      [
        "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
      ],
      [
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
      ],
    ],
    content: [
      "overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100",
    ],
    title: "font-medium text-sm",
    description: "text-xs text-foreground-secondary",
    close: "absolute top-2 right-2",
    icon: "shrink-0 size-3",
    viewport:
      "fixed z-10 top-auto right-4 bottom-4 mx-auto flex w-62.5 sm:right-8 sm:bottom-8 sm:w-75",
  },
  variants: {
    variant: {
      default: {
        root: "bg-surface",
      },
      success: {
        root: "border-success bg-success",
        title: "text-success-foreground",
        description: "text-success-foreground",
      },
      error: {
        root: "border-danger bg-danger",
        title: "text-danger-foreground",
        description: "text-danger-foreground",
      },
      warning: {
        root: "border-warning bg-warning",
        title: "text-warning-foreground",
        description: "text-warning-foreground",
      },
      info: {
        root: "border-primary bg-primary",
        title: "text-primary-foreground",
        description: "text-primary-foreground",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ToastVariants = VariantProps<typeof toastStyles>;
