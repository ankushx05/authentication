import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthState } from "#/utils/auth";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return <Outlet />;
}
