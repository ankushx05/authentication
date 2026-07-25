import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { Field } from "@repo/ui/field";
import { RHFField } from "@repo/ui/rhf";
import { Text } from "@repo/ui/text";
import { Dialog } from "@repo/ui/dialog";
import {
  mailTemplateSchema
  
  
} from "../schemas/mail-template.schema";
import type {FormValues, MailTemplateInput} from "../schemas/mail-template.schema";
import { extractVariables, useMailTemplateMutations } from "../hooks/use-mail-template-mutations";
import { EmailTemplate  } from "#/gen/admin/mail_template/v1/mail_template_pb";
import type {MailTemplate} from "#/gen/admin/mail_template/v1/mail_template_pb";
import { useState } from "react";
import { Code, Sparkles } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: MailTemplate | null;
}

const enumOptions = [
  { label: "Admin Login", value: EmailTemplate.ADMIN_LOGIN },
  { label: "User Login", value: EmailTemplate.USER_LOGIN },
  { label: "User Registration", value: EmailTemplate.USER_REGISTER },
  { label: "User Forgot Password", value: EmailTemplate.USER_FORGOT_PASSWORD },
];

export const MailTemplateFormModal = ({ isOpen, onClose, initialData }: Props) => {
  const { createTemplate, isCreating, updateTemplate, isUpdating } = useMailTemplateMutations();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<FormValues, any, MailTemplateInput>({
    resolver: zodResolver(mailTemplateSchema),
    defaultValues: {
      id: initialData?.id ?? undefined,
      name: initialData?.name ?? "",
      subject: initialData?.subject ?? "",
      body: initialData?.body ?? "",
      uniqueKey: initialData?.uniqueKey ?? EmailTemplate.USER_REGISTER,
    },
  });

  const bodyValue = methods.watch("body");
  const extractedVars = extractVariables(bodyValue || "");

  const onSubmit = methods.handleSubmit(async (values: MailTemplateInput) => {
    setErrorMessage(null);
    try {
      if (initialData?.id) {
        await updateTemplate({ ...values, id: initialData.id });
      } else {
        await createTemplate(values);
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong");
    }
  });

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content className="max-w-xl p-6 bg-background rounded-2xl border border-border shadow-xl">
        <Dialog.Header className="flex justify-between items-center pb-4 border-b border-border">
          <div>
            <Text variant="h5" className="font-bold">
              {initialData ? "Edit Mail Template" : "Add Mail Template"}
            </Text>
            <Text variant="paragraph2" className="text-sm text-foreground-secondary mt-1">
              Configure email templates with dynamic variables like {"{{name}}"}, {"{{email}}"}
            </Text>
          </div>
        </Dialog.Header>

        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            {errorMessage && (
              <div className="p-3 text-sm rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                {errorMessage}
              </div>
            )}

            <RHFField<FormValues> name="name">
              <Field.Label>Template Name</Field.Label>
              <Field.Content>
                <RHFField.Input placeholder="e.g. Welcome Email" variant="bordered" />
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>

            <RHFField<FormValues> name="uniqueKey">
              <Field.Label>Unique Key (Proto Enum)</Field.Label>
              <Field.Content>
                <select
                  className="w-full bg-background-secondary border border-border hover:border-foreground-muted focus:border-primary px-3 py-2.5 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                  {...methods.register("uniqueKey")}
                >
                  {enumOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} ({EmailTemplate[opt.value]})
                    </option>
                  ))}
                </select>
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>

            <RHFField<FormValues> name="subject">
              <Field.Label>Subject</Field.Label>
              <Field.Content>
                <RHFField.Input placeholder="e.g. Welcome to our platform, {{name}}!" variant="bordered" />
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>

            <RHFField<FormValues> name="body">
              <Field.Label>Email Body (HTML supported)</Field.Label>
              <Field.Content>
                <textarea
                  rows={6}
                  placeholder="Hi {{name}},\n\nWelcome to our platform! Your username is {{username}}.\n\nBest regards,\nTeam"
                  className="w-full bg-background-secondary border border-border hover:border-foreground-muted focus:border-primary p-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors font-mono resize-y"
                  {...methods.register("body")}
                />
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>

            {/* Dynamic Real-time Variables Display */}
            <div className="p-3 bg-background-secondary border border-border rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground-secondary">
                <Sparkles size={14} className="text-primary" />
                <span>Detected Dynamic Variables ({extractedVars.length})</span>
              </div>
              {extractedVars.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {extractedVars.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-primary/10 border border-primary-soft-hover text-primary"
                    >
                      <Code size={12} />
                      {"{{" + v + "}}"}
                    </span>
                  ))}
                </div>
              ) : (
                <Text variant="paragraph2" className="text-xs text-foreground-muted italic">
                  Type {"{{variable_name}}"} in body to add dynamic variables.
                </Text>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" color="secondary" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" color="primary" isLoading={isPending}>
                {initialData ? "Save Changes" : "Create Template"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
};
