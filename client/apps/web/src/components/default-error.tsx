import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Text } from "@repo/ui/text";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
import { ConnectError, Code } from "@connectrpc/connect";

export function DefaultErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  const handleRetry = () => {
    reset();
    router.invalidate();
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card isBordered radius="lg" className="w-full max-w-md">
        <Card.Content>
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex size-16 items-center justify-center rounded-full bg-danger/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Text variant="h5">Something went wrong</Text>
              <Text
                variant="paragraph2"
                className="text-center text-foreground-secondary"
              >
                {getErrorDescription(error)}
              </Text>
            </div>
            <div className="flex gap-2">
              <Button color="primary" variant="light" onClick={handleRetry}>
                Try Again
              </Button>
              <Button color="primary" render={<Link to="/" />}>
                Go Home
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>
    </main>
  );
}

function getErrorDescription(error: Error): string {
  if (error instanceof ConnectError) {
    switch (error.code) {
      case Code.Unauthenticated:
        return "Your session has expired. Please log in again.";
      case Code.NotFound:
        return "The requested resource was not found.";
      case Code.Unavailable:
        return "The server is currently unavailable. Please try again later.";
      default:
        return error.rawMessage || "An unexpected error occurred.";
    }
  }

  if (error.message.includes("Failed to fetch")) {
    return "Unable to connect to the server. Please check your connection.";
  }

  return error.message || "An unexpected error occurred.";
}
