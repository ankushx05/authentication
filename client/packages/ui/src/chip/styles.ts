import { tv } from "tailwind-variants";

const allColors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
] as const;

const colorVariants = {
  solid: {
    default: "bg-default text-default-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    danger: "bg-danger text-danger-foreground",
  },
  bordered: {
    default: "border-default text-default-foreground",
    primary: "border-primary text-primary",
    secondary: "border-secondary text-secondary",
    success: "border-success text-success",
    warning: "border-warning text-warning",
    danger: "border-danger text-danger",
  },
  soft: {
    default: "bg-default-soft text-default-foreground",
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-soft text-secondary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
  },
};

export const chipStyles = tv({
  slots: {
    root: [
      "relative box-border inline-flex min-w-min max-w-fit shrink-0",
      "items-center justify-between whitespace-nowrap rounded-full gap-2",
      "font-medium",
    ],
    dot: "size-1.5 rounded-full",
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        root: "border",
      },
      soft: {},
      dot: {
        dot: "outline-2",
      },
    },
    size: {
      sm: {
        root: "h-5 px-1 text-xs",
      },
      md: {
        root: "h-6 px-2 text-xs",
      },
      lg: {
        root: "h-7 px-3 text-sm",
      },
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
    },
    isSquare: {
      true: {
        root: "flex aspect-square items-center justify-center",
      },
    },
    isBordered: {
      true: {
        root: "border",
      },
    },
    radius: {
      none: { root: "rounded-none" },
      sm: { root: "rounded-sm" },
      md: { root: "rounded-md" },
      lg: { root: "rounded-lg" },
      full: { root: "rounded-full" },
    },
  },
  compoundVariants: [
    ...(["solid", "bordered", "soft"] as const).flatMap((variant) =>
      allColors.map((color) => ({
        variant,
        color,
        className: {
          root: colorVariants[variant][color],
        },
      })),
    ),
    // dot
    ...allColors.map((color) => ({
      variant: "dot" as const,
      color,
      className: {
        dot: colorVariants["solid"][color],
      },
    })),
    {
      variant: "dot",
      color: "primary",
      className: {
        dot: "outline-primary-soft-border",
      },
    },
    {
      variant: "dot",
      color: "secondary",
      className: {
        dot: "outline-secondary-soft-border",
      },
    },
    {
      variant: "dot",
      color: "success",
      className: {
        dot: "outline-success-soft-border",
      },
    },
    {
      variant: "dot",
      color: "warning",
      className: {
        dot: "outline-warning-soft-border",
      },
    },
    {
      variant: "dot",
      color: "danger",
      className: {
        dot: "outline-danger-soft-border",
      },
    },
    {
      variant: "dot",
      color: "default",
      className: {
        dot: "outline-default-soft-border",
      },
    },
    // bordered
    {
      isBordered: true,
      color: "danger",
      className: { root: "border-danger" },
    },
    {
      isBordered: true,
      color: "primary",
      className: { root: "border-primary" },
    },
    {
      isBordered: true,
      color: "secondary",
      className: { root: "border-secondary" },
    },
    {
      isBordered: true,
      color: "success",
      className: { root: "border-success" },
    },
    {
      isBordered: true,
      color: "warning",
      className: { root: "border-warning" },
    },
    {
      isBordered: true,
      color: "default",
      className: { root: "border-border" },
    },
  ],
  defaultVariants: {
    color: "default",
    size: "md",
    radius: "full",
    variant: "solid",
  },
});
