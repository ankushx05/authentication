import { Button } from "@repo/ui/button";
import { Text } from "@repo/ui/text";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getAuthState } from "#/utils/auth";
import { useLogout } from "#/features/auth/login/hooks/use-logout";
import { Settings, LogOut, Mail } from "lucide-react";

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
  const { logout, isPending } = useLogout();

  return (
    <main className="flex flex-col justify-center min-h-screen p-6 max-w-lg mx-auto gap-8">
      <div className="flex flex-col gap-2 text-center">
        <Text variant="h2" className="font-extrabold tracking-tight">
          Admin Control Center
        </Text>
        <Text variant="paragraph2" className="text-foreground-secondary">
          Manage application configurations, authentication settings, and email templates.
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <Link to="/mail-templates">
          <Button
            color="primary"
            className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl"
          >
            <Mail size={18} />
            Mail Templates
          </Button>
        </Link>

        <Link to="/settings">
          <Button
            color="secondary"
            className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl"
          >
            <Settings size={18} />
            Mail Settings
          </Button>
        </Link>

        <Button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl"
          onClick={logout}
          isLoading={isPending}
          color="secondary"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </main>
  );
}
