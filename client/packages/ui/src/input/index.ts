import { Input as InputRoot } from "./input";

import type { InputVariants } from "./styles";

export const Input = InputRoot;

export namespace Input {
  export interface Props extends InputRoot.Props {}
  export type Variants = InputVariants;
}
