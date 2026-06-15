import { tv } from "tailwind-variants";

import { textStyles } from "../text/styles";

export const linkStyles = tv({
  extend: textStyles,
  base: ["cursor-pointer text-foreground-link hover:text-foreground-link/80"],
  variants: {
    underline: {
      hover: "hover:underline hover:underline-offset-4",
      never: "",
      always:
        "underline underline-offset-4 transition-all hover:underline-offset-2",
    },
  },
  defaultVariants: {
    underline: "hover",
  },
});
