"use client";

import { RadioGroup } from "../radio-group";
import { useRHFContext } from "./rhf-context";

export const RHFRadioGroup = (props: RHFRadioGroup.Props) => {
  const { field } = useRHFContext();
  const { value, onChange, onBlur, name, ref, disabled } = field;
  // const { invalid } = fieldState;
  return (
    <RadioGroup
      ref={ref}
      disabled={disabled}
      // isInvalid={invalid}
      name={name}
      onBlur={onBlur}
      onValueChange={onChange}
      value={value}
      {...props}
    />
  );
};

export namespace RHFRadioGroup {
  export interface Props extends RadioGroup.Props {}
}
