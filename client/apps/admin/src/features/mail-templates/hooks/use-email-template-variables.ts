import { useQuery } from "@connectrpc/connect-query";
import { getEmailTemplateVariablesApi } from "../api";
import type { EmailTemplate } from "#/gen/admin/mail_template/v1/mail_template_pb";

export const useEmailTemplateVariables = () => {
  const { data, isLoading, error } = useQuery(getEmailTemplateVariablesApi);

  const getAcceptedVariables = (template: EmailTemplate): string[] => {
    if (!data) return [];
    const info = data.templateVariables.find((t) => t.template === template);
    return info ? info.variables : [];
  };

  return {
    getAcceptedVariables,
    isLoading,
    error,
  };
};
