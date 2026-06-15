"use client";

import { Field } from "../field";
import { useRHFContext } from "./rhf-context";

export const RHFFieldError = (props: RHFFieldError.Props) => {
  const { fieldState } = useRHFContext();
  const { error } = fieldState;
  if (!error) return null;
  return (
    <Field.Error match {...props}>
      {error?.message}
    </Field.Error>
  );
};

export namespace RHFFieldError {
  export interface Props {}
  // export interface Props extends Field.Error.Props {}
}
