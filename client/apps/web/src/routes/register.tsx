import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { Field } from "@repo/ui/field";
import { RHFField } from "@repo/ui/rhf";
import { IconButton } from "@repo/ui/icon-button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Text } from "@repo/ui/text";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { Link as LinkUI } from "@repo/ui/link";

import { authValidator } from "@/validators";
import { useMutation } from "@connectrpc/connect-query";
import { AuthService } from "#/gen/app/auth/v1/auth_pb";
import { useState } from "react";
import { InputGroup } from "@repo/ui/input-group";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

type FormValues = authValidator.Register;

function RegisterPage() {
  const mutation = useMutation(AuthService.method.register);

  const form = useForm<FormValues>({
    resolver: zodResolver(authValidator.register),
    defaultValues: {
      email: "test@gmail.com",
      fullname: "Test User",
      username: "testuser",
      password: "testpassword",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    console.log("Register data:", data);
    mutation.mutate(data);
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Text variant="h3">Create an account</Text>
          <Text variant="paragraph2" className="text-foreground-secondary">
            Enter your details below to create your account
          </Text>
        </div>

        <FormProvider {...form}>
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
                      <EyeIcon
                        size={16}
                        className="text-foreground-secondary"
                      />
                    )}
                  </IconButton>
                </InputGroup.Suffix>
              </InputGroup>
              <RHFField.FieldError />
            </RHFField>

            <Button
              type="submit"
              color="primary"
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
              className="mt-2 w-full [&>svg]:size-3"
            >
              Register
            </Button>
          </form>
        </FormProvider>

        <Text
          variant="paragraph2"
          className="text-center text-foreground-secondary"
        >
          Already have an account?{" "}
          <LinkUI render={<Link to="/" />}>Sign in</LinkUI>
        </Text>
      </div>
    </main>
  );
}
