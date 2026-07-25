import { Button } from "@repo/ui/button";
import { Dialog } from "@repo/ui/dialog";
import { Text } from "@repo/ui/text";
import { useMailTemplateMutations } from "../hooks/use-mail-template-mutations";
import type { MailTemplate } from "#/gen/admin/mail_template/v1/mail_template_pb";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template: MailTemplate | null;
}

export const MailTemplateDeleteDialog = ({ isOpen, onClose, template }: Props) => {
  const { deleteTemplate, isDeleting } = useMailTemplateMutations();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!template) return null;

  const handleDelete = async () => {
    setErrorMessage(null);
    try {
      await deleteTemplate(template.id);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to delete template");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content className="max-w-md p-6 bg-background rounded-2xl border border-border shadow-xl space-y-4">
        <div className="flex items-center gap-3 text-rose-500">
          <div className="p-2 bg-rose-500/10 rounded-xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <Text variant="h6" className="font-bold text-foreground">
              Delete Mail Template
            </Text>
            <Text variant="paragraph2" className="text-xs text-foreground-secondary mt-0.5">
              This action cannot be undone.
            </Text>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 text-sm rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
            {errorMessage}
          </div>
        )}

        <p className="text-sm text-foreground-secondary">
          Are you sure you want to delete <strong className="text-foreground">{template.name}</strong>?
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <Button color="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
