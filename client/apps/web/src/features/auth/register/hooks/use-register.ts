import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerApi } from "../api";
import { registerSchema, type Register } from "../schemas/register.schema";

export type FormValues = Register;

export const useRegister = () => {
  const mutation = useMutation(registerApi);

  const methods = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    disabled: mutation.isPending,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return { methods, onSubmit, isPending: mutation.isPending };
};
