import { useMutation, useQuery } from "@connectrpc/connect-query";
import { useQueryClient } from "@tanstack/react-query";
import { getMailSettingsApi, updateMailSettingsApi } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  mailSettingsSchema,
  type MailSettingsInput,
} from "../schemas/settings.schema";

export type FormValues = MailSettingsInput;

export const useSettings = () => {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, isLoading, error: queryError } = useQuery(getMailSettingsApi);

  const methods = useForm<FormValues>({
    resolver: zodResolver(mailSettingsSchema),
    defaultValues: {
      host: "",
      username: "",
      password: "",
      encryption: "TLS",
    },
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (data?.settings) {
      reset({
        host: data.settings.host || "",
        username: data.settings.username || "",
        password: data.settings.password || "",
        encryption: data.settings.encryption || "TLS",
      });
    }
  }, [data, reset]);

  const mutation = useMutation(updateMailSettingsApi, {
    onSuccess: (res) => {
      setSuccessMessage(res.message || "Settings updated successfully!");
      setErrorMessage(null);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      setErrorMessage(err.message || "Failed to update settings");
      setSuccessMessage(null);
    },
  });

  const onSubmit = handleSubmit((values) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    mutation.mutate({
      settings: {
        host: values.host,
        username: values.username,
        password: values.password,
        encryption: values.encryption,
      },
    });
  });

  return {
    methods,
    onSubmit,
    isLoading: isLoading || mutation.isPending,
    isPending: mutation.isPending,
    queryError,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
  };
};
