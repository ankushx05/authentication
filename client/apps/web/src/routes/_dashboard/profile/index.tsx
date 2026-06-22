import { ProfilePage } from "#/features/profile";
import { DefaultErrorComponent } from "#/components/default-error";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/profile/")({
  component: ProfilePage,
  errorComponent: DefaultErrorComponent,
});
