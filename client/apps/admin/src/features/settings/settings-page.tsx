import { Text } from "@repo/ui/text";
import { Link } from "@tanstack/react-router";
import { SettingsForm } from "./components/form";
import { ArrowLeft } from "lucide-react";

export const SettingsPage = () => {
  return (
    <main className="max-w-lg mx-auto mt-10 space-y-4 ">
      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors max-w-fit"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="flex flex-col">
          <Text variant="h5" className="font-bold tracking-tight">
            Mail Settings
          </Text>
          <Text variant="paragraph2" className="text-foreground-secondary">
            Manage your application's SMTP credentials and sender configuration
          </Text>
        </div>
      </div>

      <SettingsForm />
    </main>
  );
};
