"use client";

import { OtpInput } from "../otp-input";
import { useRHFContext } from "./rhf-context";

export const RHFOtpInput = (props: RHFOtpInput.Props) => {
  const { field, fieldState } = useRHFContext();
  const { value, onChange, onBlur, ref, disabled } = field;
  const { invalid } = fieldState;
  return (
    <OtpInput
      ref={ref}
      disabled={disabled}
      isInvalid={invalid}
      onBlur={onBlur}
      onValueChange={onChange}
      value={value}
      {...props}
    />
  );
};

export namespace RHFOtpInput {
  export interface Props extends OtpInput.Props {}
}
