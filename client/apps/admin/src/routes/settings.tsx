import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthState } from "#/utils/auth";
import { SettingsPage } from "#/features/settings";

export const Route = createFileRoute("/settings")({
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: SettingsPage,
});
