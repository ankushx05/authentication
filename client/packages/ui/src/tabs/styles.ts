import { tv } from "tailwind-variants";

import {
  colorVariants,
  dataFocusVisibleClasses,
  focusVisibleClasses,
} from "../utils/variants";

import type { VariantProps } from "tailwind-variants";

export const tabsStyles = tv({
  slots: {
    root: "",
    list: [
      "relative inline-flex z-0",
      "p-1",
      "h-fit",
      "gap-2",
      "items-center",
      "flex-nowrap",
      "overflow-x-auto",
      "scrollbar-hide",
      "max-w-full overflow-auto",
    ],
    tab: [
      "z-0 text-foreground-secondary",
      "w-full",
      "px-3",
      "py-1",
      "flex flex-row items-center justify-center gap-2",
      "relative",
      "outline-none",
      "cursor-default",
      "transition-opacity",
      "tap-highlight-transparent",
      "disabled:status-disabled",
      "data-active:text-foreground",
      ...focusVisibleClasses,
    ],
    indicator: [
      "bg-white",
      "w-(--active-tab-width) rounded-xs transition-all duration-200 ease-in-out",
      "absolute -z-1 left-0 translate-x-(--active-tab-left)",
    ],
    panel: ["py-3", "px-1", "outline-none", ...dataFocusVisibleClasses],
  },
  variants: {
    variant: {
      solid: {
        list: "bg-background-secondary",
        indicator:
          "h-(--active-tab-height) top-(--active-tab-top) bottom-(--active-tab-bottom)",
      },
      light: {
        list: "bg-transparent",
        indicator:
          "h-(--active-tab-height) top-(--active-tab-top) bottom-(--active-tab-bottom)",
      },
      underlined: {
        list: "bg-transparent",
        indicator: "bottom-0 h-0.5 shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
      },
      bordered: {
        list: "border border-border bg-transparent shadow-sm",
        indicator:
          "h-(--active-tab-height) top-(--active-tab-top) bottom-(--active-tab-bottom)",
      },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: {
        list: "rounded-xl",
        tab: "h-7 rounded text-xs",
        indicator: "rounded",
      },
      md: {
        list: "rounded-xl",
        tab: "h-8 rounded text-sm",
        indicator: "rounded-md",
      },
      lg: {
        list: "rounded-lg",
        tab: "h-9 rounded-xl text-base",
        indicator: "rounded-xl",
      },
    },
    radius: {
      none: {
        list: "rounded-none",
        tab: "rounded-none",
        indicator: "rounded-none",
      },
      sm: {
        list: "rounded",
        tab: "rounded",
        indicator: "rounded",
      },
      md: {
        list: "rounded-md",
        tab: "rounded-md",
        indicator: "rounded-md",
      },
      lg: {
        list: "rounded-lg",
        tab: "rounded-lg",
        indicator: "rounded-lg",
      },
      full: {
        list: "rounded-full",
        tab: "rounded-full",
        indicator: "rounded-full",
      },
    },
    fullWidth: {
      true: {
        root: "w-full",
        list: "w-full",
      },
    },
    disableAnimation: {
      true: {
        tab: "transition-none",
        tabContent: "transition-none",
      },
    },
  },
  compoundVariants: [
    {
      variant: ["solid", "bordered", "light"],
      color: "default",
      className: {
        indicator: ["bg-background", "dark:bg-default", "shadow-sm"],
        tabContent: "group-data-selected:text-default-foreground",
      },
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "primary",
      className: {
        indicator: colorVariants.solid.primary,
        tabContent: "group-data-selected:text-primary-foreground",
      },
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "secondary",
      className: {
        indicator: colorVariants.solid.secondary,
        tabContent: "group-data-selected:text-secondary-foreground",
      },
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "success",
      className: {
        indicator: colorVariants.solid.success,
        tabContent: "group-data-selected:text-success-foreground",
      },
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "warning",
      className: {
        indicator: colorVariants.solid.warning,
        tabContent: "group-data-selected:text-warning-foreground",
      },
    },
    {
      variant: ["solid", "bordered", "light"],
      color: "danger",
      className: {
        indicator: colorVariants.solid.danger,
        tabContent: "group-data-selected:text-danger-foreground",
      },
    },
    {
      variant: "underlined",
      color: "default",
      className: {
        indicator: "bg-foreground",
        tabContent: "group-data-selected:text-foreground",
      },
    },
    {
      variant: "underlined",
      color: "primary",
      className: {
        indicator: "bg-primary",
        tabContent: "group-data-selected:text-primary",
      },
    },
    {
      variant: "underlined",
      color: "secondary",
      className: {
        indicator: "bg-secondary",
        tabContent: "group-data-selected:text-secondary",
      },
    },
    {
      variant: "underlined",
      color: "success",
      className: {
        indicator: "bg-success",
        tabContent: "group-data-selected:text-success",
      },
    },
    {
      variant: "underlined",
      color: "warning",
      className: {
        indicator: "bg-warning",
        tabContent: "group-data-selected:text-warning",
      },
    },
    {
      variant: "underlined",
      color: "danger",
      className: {
        indicator: "bg-danger",
        tabContent: "group-data-selected:text-danger",
      },
    },
  ],
  defaultVariants: {
    color: "default",
    variant: "solid",
    size: "md",
    fullWidth: false,
  },
});

export type TabsVariants = VariantProps<typeof tabsStyles>;
export type TabsSlots = keyof ReturnType<typeof tabsStyles>;
