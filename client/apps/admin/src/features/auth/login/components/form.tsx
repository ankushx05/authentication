import { Field } from "@repo/ui/field";
import { IconButton } from "@repo/ui/icon-button";
import { InputGroup } from "@repo/ui/input-group";
import { RHFField } from "@repo/ui/rhf";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useLogin, type FormValues } from "../hooks/use-login";
import { Button } from "@repo/ui/button";

export const Form = () => {
  const { methods, onSubmit, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <RHFField<FormValues> name="email">
          <Field.Label>Email</Field.Label>
          <Field.Content>
            <RHFField.Input placeholder="john@example.com" type="email" />
            <RHFField.FieldError />
          </Field.Content>
        </RHFField>

        {/* Password */}
        <RHFField<FormValues> name="password">
          <Field.Label>Password</Field.Label>
          <InputGroup>
            <RHFField.InputGroupInput
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <InputGroup.Suffix>
              <IconButton
                size="sm"
                radius="full"
                label="Toggle password"
                variant="light"
                onClick={handleTogglePassword}
                type="button"
              >
                {showPassword ? (
                  <EyeClosedIcon
                    size={16}
                    className="text-foreground-secondary"
                  />
                ) : (
                  <EyeIcon size={16} className="text-foreground-secondary" />
                )}
              </IconButton>
            </InputGroup.Suffix>
          </InputGroup>
          <RHFField.FieldError />
        </RHFField>

        <Button
          type="submit"
          color="primary"
          isLoading={isPending}
          className="mt-2 w-full [&>svg]:size-3"
        >
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
};
