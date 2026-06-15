import { Description as DescriptionRoot } from "./description";

export const Description = Object.assign(DescriptionRoot, {});

export namespace Description {
  export interface Props extends DescriptionRoot.Props {}
}
