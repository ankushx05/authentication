import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@connectrpc/connect-query";
import {
  createMailTemplateApi,
  updateMailTemplateApi,
  deleteMailTemplateApi,
} from "../api";
import type { MailTemplateInput } from "../schemas/mail-template.schema";

// Helper function to extract variables like {{name}}, {{otp}} from template body
export const extractVariables = (body: string): string[] => {
  const matches = body.match(/\{\{(\w+)\}\}/g);
  if (!matches) return [];
  const vars = matches.map((m) => m.replace(/[{\\}]/g, "").trim());
  return Array.from(new Set(vars));
};

export const useMailTemplateMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createMailTemplateApi, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const updateMutation = useMutation(updateMailTemplateApi, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const deleteMutation = useMutation(deleteMailTemplateApi, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const createTemplate = async (values: MailTemplateInput) => {
    const variables = extractVariables(values.body);
    return await createMutation.mutateAsync({
      name: values.name,
      subject: values.subject,
      body: values.body,
      variables,
      uniqueKey: values.uniqueKey,
    });
  };

  const updateTemplate = async (values: MailTemplateInput) => {
    if (!values.id) throw new Error("ID is required for update");
    const variables = extractVariables(values.body);
    return await updateMutation.mutateAsync({
      id: values.id,
      name: values.name,
      subject: values.subject,
      body: values.body,
      variables,
      uniqueKey: values.uniqueKey,
    });
  };

  const deleteTemplate = async (id: string) => {
    return await deleteMutation.mutateAsync({ id });
  };

  return {
    createTemplate,
    isCreating: createMutation.isPending,
    updateTemplate,
    isUpdating: updateMutation.isPending,
    deleteTemplate,
    isDeleting: deleteMutation.isPending,
  };
};
