import { useQueryClient } from "@tanstack/react-query";
import { useMutation as useConnectMutation } from "@connectrpc/connect-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { logoutApi } from "../api";

export const useLogout = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useConnectMutation(logoutApi, {
    onSuccess: async () => {
      // Clear react-query cache to remove admin data
      queryClient.clear();
      // Invalidate router state to re-trigger auth checks
      await router.invalidate();
      // Navigate back to login
      await navigate({ to: "/login" });
    },
  });

  const logout = () => {
    mutation.mutate({});
  };

  return {
    logout,
    isPending: mutation.isPending,
  };
};
