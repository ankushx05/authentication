import { useMutation } from "@connectrpc/connect-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { loginApi } from "../api";
import { loginSchema  } from "../schemas/login.schema";
import type {Login} from "../schemas/login.schema";

export type FormValues = Login;

export const useLogin = () => {
  const navigate = useNavigate();
  const router = useRouter();

  const mutation = useMutation(loginApi, {
    onSuccess: async () => {
      await router.invalidate();
      await navigate({ to: "/" });
    },
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "11111111",
    },
    disabled: mutation.isPending,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return { methods, onSubmit, isPending: mutation.isPending };
};
