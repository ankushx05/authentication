import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TransportProvider } from "@connectrpc/connect-query";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ConnectError, Code } from "@connectrpc/connect";
import { getErrorMessage } from "#/utils/fetch";
import z from "zod";
import { toastManager } from "./toast";
type Props = {
  children: React.ReactNode;
};

export const rpcTransport = createConnectTransport({
  baseUrl: "http://localhost:8888",
  useBinaryFormat: process.env.NODE_ENV === "production",
  fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
});

function handleUnauthenticatedError(error: unknown) {
  if (error instanceof ConnectError && error.code === Code.Unauthenticated) {
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login?session_expired=true";
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleUnauthenticatedError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleUnauthenticatedError(error);
      onMutationError(error);
    },
    onSuccess: (data) => {
      if (process.env.NODE_ENV !== "production") {
        console.log(data);
      }
      const result = z.object({ message: z.string() }).safeParse(data);
      if (result.success) {
        const { message } = result.data;
        toastManager.add({
          description: message,
          type: "success",
        });
      }
    },
  }),
});

export const ReactQueryProvider = ({ children }: Props) => {
  return (
    <TransportProvider transport={rpcTransport}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TransportProvider>
  );
};

function onMutationError(err: unknown) {
  if (err instanceof ConnectError && err.code === Code.Unauthenticated) {
    return;
  }

  const error = getErrorMessage(err);
  const errorMessage = error.charAt(0).toLocaleUpperCase() + error.slice(1);

  toastManager.add({
    description: errorMessage,
    type: "error",
  });
}
