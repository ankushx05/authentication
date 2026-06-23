import { Text } from "@repo/ui/text";
import { Form } from "./components/form";

export const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Text variant="h3">Admin Login</Text>
          <Text variant="paragraph2" className="text-foreground-secondary">
            Enter your email and password to sign in to the Admin Dashboard
          </Text>
        </div>

        <Form />
      </div>
    </main>
  );
};
