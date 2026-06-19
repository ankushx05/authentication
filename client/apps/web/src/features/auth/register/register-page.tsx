import { Text } from "@repo/ui/text";
import { Form } from "./components/form";
import { Link } from "@tanstack/react-router";
import { Link as LinkUI } from "@repo/ui/link";

export const RegisterPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Text variant="h3">Create an account</Text>
          <Text variant="paragraph2" className="text-foreground-secondary">
            Enter your details below to create your account
          </Text>
        </div>

        <Form />

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
};
