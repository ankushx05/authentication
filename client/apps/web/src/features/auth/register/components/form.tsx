import { Field } from "@repo/ui/field";
import { IconButton } from "@repo/ui/icon-button";
import { InputGroup } from "@repo/ui/input-group";
import { RHFField } from "@repo/ui/rhf";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRegister, type FormValues } from "../hooks/use-register";
import { Button } from "@repo/ui/button";

export const Form = () => {
  const { methods, onSubmit, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Fullname */}
        <RHFField<FormValues> name="fullname">
          <Field.Label>Full Name</Field.Label>
          <Field.Content>
            <RHFField.Input placeholder="John Doe" />
            <RHFField.FieldError />
          </Field.Content>
        </RHFField>

        {/* Username  */}
        <RHFField<FormValues> name="username">
          <Field.Label>Username</Field.Label>
          <Field.Content>
            <RHFField.Input placeholder="johndoe" />
            <RHFField.FieldError />
          </Field.Content>
        </RHFField>

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
              placeholder="Enter your name"
            />
            <InputGroup.Suffix>
              <IconButton
                size="sm"
                radius="full"
                label="Toggle password"
                variant="light"
                onClick={handleTogglePassword}
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
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
