import { Button } from "@repo/ui/button";
import { Text } from "@repo/ui/text";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { getAuthState } from "#/utils/auth";
import { useLogout } from "#/features/auth/login/hooks/use-logout";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: App,
});

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const { logout, isPending } = useLogout();

  return (
    <main className="flex flex-col gap-4 p-8 max-w-md mx-auto">
      <Text variant="h2">
        Hello Admin {isClicked && <span className="text-red-500">👋</span>}
      </Text>
      <div className="flex gap-4">
        <Button
          className={"max-w-fit"}
          onClick={() => setIsClicked(true)}
          color="danger"
        >
          Click Me!
        </Button>
        <Button
          className={"max-w-fit"}
          onClick={logout}
          isLoading={isPending}
          color="secondary"
        >
          Logout
        </Button>
      </div>
    </main>
  );
}
