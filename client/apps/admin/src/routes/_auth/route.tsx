import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthState } from "#/utils/auth";
import z from "zod";

const searchSchema = z.object({
  session_expired: z.boolean().optional().catch(undefined),
});

export const Route = createFileRoute("/_auth")({
  validateSearch: searchSchema,
  beforeLoad: async ({ search }) => {
    if (search.session_expired) {
      return;
    }

    const { isAuthenticated } = await getAuthState();
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
