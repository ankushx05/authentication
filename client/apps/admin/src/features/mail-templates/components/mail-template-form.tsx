import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { Field } from "@repo/ui/field";
import { RHFField } from "@repo/ui/rhf";
import { Text } from "@repo/ui/text";
import { Dialog } from "@repo/ui/dialog";
import { mailTemplateSchema } from "../schemas/mail-template.schema";
import type {
  FormValues,
  MailTemplateInput,
} from "../schemas/mail-template.schema";
import {
  extractVariables,
  useMailTemplateMutations,
} from "../hooks/use-mail-template-mutations";
import { useEmailTemplateVariables } from "../hooks/use-email-template-variables";
import { EmailTemplate } from "#/gen/admin/mail_template/v1/mail_template_pb";
import type { MailTemplate } from "#/gen/admin/mail_template/v1/mail_template_pb";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Code, Sparkles, Tag, Loader2 } from "lucide-react";

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

export const MailTemplateFormModal = ({
  isOpen,
  onClose,
  initialData,
}: Props) => {
  const { createTemplate, isCreating, updateTemplate, isUpdating } =
    useMailTemplateMutations();
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
  const uniqueKeyValue = methods.watch("uniqueKey");
  const extractedVars = extractVariables(bodyValue || "");

  const { getAcceptedVariables, isLoading: isLoadingVars } = useEmailTemplateVariables();

  // Get accepted variables for the selected template key
  const acceptedVars = useMemo(
    () => getAcceptedVariables(Number(uniqueKeyValue)),
    [uniqueKeyValue, getAcceptedVariables],
  );

  // Find missing variables (accepted but not in the body)
  const missingVars = useMemo(
    () => acceptedVars.filter((v) => !extractedVars.includes(v)),
    [acceptedVars, extractedVars],
  );

  // Find extra variables (in body but not in accepted list)
  const extraVars = useMemo(
    () => extractedVars.filter((v) => !acceptedVars.includes(v)),
    [acceptedVars, extractedVars],
  );

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
            <Text
              variant="paragraph2"
              className="text-sm text-foreground-secondary mt-1"
            >
              Configure email templates with dynamic variables like {"{{name}}"}
              , {"{{email}}"}
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
                <RHFField.Input
                  placeholder="e.g. Welcome Email"
                  variant="bordered"
                />
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

            {/* Accepted Variables for Selected Template */}
            {isLoadingVars ? (
              <div className="p-3 flex items-center gap-2 bg-background-secondary border border-border rounded-xl">
                <Loader2 className="animate-spin size-4 text-primary" />
                <span className="text-xs text-foreground-secondary">Loading accepted variables...</span>
              </div>
            ) : acceptedVars.length > 0 && (
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Tag size={14} />
                  <span>
                    Accepted Variables for this Template ({acceptedVars.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {acceptedVars.map((v) => {
                    const isUsed = extractedVars.includes(v);
                    return (
                      <span
                        key={v}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${
                          isUsed
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {isUsed ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <AlertTriangle size={12} />
                        )}
                        {"{{" + v + "}}"}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <RHFField<FormValues> name="subject">
              <Field.Label>Subject</Field.Label>
              <Field.Content>
                <RHFField.Input
                  placeholder="e.g. Welcome to our platform, {{name}}!"
                  variant="bordered"
                />
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
                  {extractedVars.map((v) => {
                    const isAccepted = acceptedVars.includes(v);
                    return (
                      <span
                        key={v}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${
                          isAccepted
                            ? "bg-primary/10 border-primary-soft-hover text-primary"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        }`}
                      >
                        <Code size={12} />
                        {"{{" + v + "}}"}
                        {!isAccepted && (
                          <span className="text-[10px] ml-1 opacity-75">
                            (extra)
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <Text
                  variant="paragraph2"
                  className="text-xs text-foreground-muted italic"
                >
                  Type {"{{variable_name}}"} in body to add dynamic variables.
                </Text>
              )}
            </div>

            {/* Missing Variables Warning */}
            {missingVars.length > 0 && (
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <AlertTriangle size={14} />
                  <span>
                    Missing Variables — not found in the body (
                    {missingVars.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {missingVars.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400"
                    >
                      <AlertTriangle size={12} />
                      {"{{" + v + "}}"}
                    </span>
                  ))}
                </div>
                <Text
                  variant="paragraph2"
                  className="text-[11px] text-amber-400/70 italic"
                >
                  These variables are expected by the template but were not
                  found in the body. The form will still submit.
                </Text>
              </div>
            )}

            {/* Extra Variables Warning */}
            {extraVars.length > 0 && (
              <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                  <Code size={14} />
                  <span>
                    Extra Variables — not in the accepted list (
                    {extraVars.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {extraVars.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400"
                    >
                      <Code size={12} />
                      {"{{" + v + "}}"}
                    </span>
                  ))}
                </div>
                <Text
                  variant="paragraph2"
                  className="text-[11px] text-blue-400/70 italic"
                >
                  These variables are used in the body but are not in the
                  accepted list for this template. They won't be replaced at
                  send time.
                </Text>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                color="secondary"
                onClick={onClose}
                disabled={isPending}
              >
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
