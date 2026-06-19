import { AuthService } from "#/gen/app/auth/v1/auth_pb";
import { authValidator } from "#/validators";
import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type FormValues = authValidator.Register;

export const useRegister = () => {
  const mutation = useMutation(AuthService.method.register);

  const methods = useForm<FormValues>({
    resolver: zodResolver(authValidator.register),
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
