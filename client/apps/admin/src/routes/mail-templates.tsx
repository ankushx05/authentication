import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthState } from "#/utils/auth";
import { MailTemplatesPage } from "#/features/mail-templates";

export const Route = createFileRoute("/mail-templates")({
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: MailTemplatesPage,
});
