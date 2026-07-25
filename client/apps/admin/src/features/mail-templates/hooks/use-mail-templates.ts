import { useQuery } from "@connectrpc/connect-query";
import { listMailTemplatesApi } from "../api";

export const useMailTemplates = () => {
  const { data, isLoading, error, refetch } = useQuery(listMailTemplatesApi);

  return {
    mailTemplates: data?.mailTemplates ?? [],
    isLoading,
    error,
    refetch,
  };
};
