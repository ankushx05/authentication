import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Text } from "@repo/ui/text";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { useMailTemplates } from "./hooks/use-mail-templates";
import { MailTemplateList } from "./components/mail-template-list";
import { MailTemplateFormModal } from "./components/mail-template-form";
import { MailTemplateDeleteDialog } from "./components/mail-template-delete-dialog";
import type { MailTemplate } from "#/gen/admin/mail_template/v1/mail_template_pb";

export const MailTemplatesPage = () => {
  const { mailTemplates, isLoading, error } = useMailTemplates();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<MailTemplate | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<MailTemplate | null>(null);

  const handleOpenCreate = () => {
    setSelectedTemplate(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (template: MailTemplate) => {
    setSelectedTemplate(template);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (template: MailTemplate) => {
    setTemplateToDelete(template);
    setIsDeleteDialogOpen(true);
  };

  return (
    <main className="max-w-4xl mx-auto mt-8 p-4 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors max-w-fit"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div>
            <Text variant="h4" className="font-bold tracking-tight">
              Mail Templates
            </Text>
            <Text variant="paragraph2" className="text-foreground-secondary">
              Create and manage email templates with dynamic placeholder variables
            </Text>
          </div>
        </div>

        <Button
          color="primary"
          className="flex items-center gap-2 py-2.5 px-4 rounded-xl"
          onClick={handleOpenCreate}
        >
          <Plus size={18} />
          Add Template
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <Loader2 className="animate-spin text-primary size-8" />
          <Text variant="paragraph2" className="text-foreground-secondary">
            Loading mail templates...
          </Text>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
          Failed to load templates: {error.message}
        </div>
      ) : (
        <MailTemplateList
          templates={mailTemplates}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {isFormOpen && (
        <MailTemplateFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={selectedTemplate}
        />
      )}

      {isDeleteDialogOpen && (
        <MailTemplateDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          template={templateToDelete}
        />
      )}
    </main>
  );
};
