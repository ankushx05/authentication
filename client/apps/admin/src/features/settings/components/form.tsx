import { Field } from "@repo/ui/field";
import { RHFField } from "@repo/ui/rhf";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Text } from "@repo/ui/text";
import { FormProvider } from "react-hook-form";
import { useSettings } from "../hooks/use-settings";
import type { FormValues } from "../hooks/use-settings";
import { Loader2, CheckCircle2, AlertCircle, XIcon } from "lucide-react";

export const SettingsForm = () => {
  const {
    methods,
    onSubmit,
    isLoading,
    isPending,
    queryError,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
  } = useSettings();

  if (isLoading && !methods.formState.isDirty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="animate-spin text-primary size-10" />
        <Text variant="paragraph2" className="text-foreground-secondary">
          Loading mail settings...
        </Text>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-6">
        {successMessage && (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="size-5 shrink-0" />
            <span>{successMessage}</span>
            <XIcon
              className="size-5 shrink-0 ml-auto cursor-pointer"
              onClick={() => setSuccessMessage(null)}
            />
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="size-5 shrink-0" />
            <span>{errorMessage}</span>
            <XIcon
              className="size-5 shrink-0 ml-auto cursor-pointer"
              onClick={() => setErrorMessage(null)}
            />
          </div>
        )}

        {queryError && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
            <AlertCircle className="size-5 shrink-0" />
            <span>Failed to load settings: {queryError.message}</span>
          </div>
        )}

        <Card>
          <Card.Content className="space-y-4">
            <RHFField<FormValues> name="host">
              <Field.Label>SMTP Host</Field.Label>
              <Field.Content>
                <RHFField.Input
                  placeholder="smtp.mailtrap.io"
                  variant="bordered"
                />
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>

            <RHFField<FormValues> name="username">
              <Field.Label>Username</Field.Label>
              <Field.Content>
                <RHFField.Input
                  placeholder="smtp-username"
                  variant="bordered"
                />
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>

            <RHFField<FormValues> name="password">
              <Field.Label>Password</Field.Label>
              <Field.Content>
                <RHFField.Input
                  placeholder="••••••••••••"
                  type="password"
                  variant="bordered"
                />
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>

            <RHFField<FormValues> name="encryption">
              <Field.Label>Encryption</Field.Label>
              <Field.Content>
                <select
                  className="w-full bg-background-secondary border border-border hover:border-foreground-muted focus:border-primary px-3 py-2.5 rounded-lg text-sm text-foreground focus:outline-none transition-colors duration-200"
                  {...methods.register("encryption")}
                >
                  <option value="None">None</option>
                  <option value="SSL">SSL</option>
                  <option value="TLS">TLS</option>
                </select>
                <RHFField.FieldError />
              </Field.Content>
            </RHFField>
          </Card.Content>
        </Card>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            color="primary"
            isLoading={isPending}
            disabled={!methods.formState.isDirty}
          >
            Save Settings
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
