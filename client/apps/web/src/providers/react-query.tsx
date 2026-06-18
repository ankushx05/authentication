import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TransportProvider } from "@connectrpc/connect-query";
import { createConnectTransport } from "@connectrpc/connect-web";
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

export const ReactQueryProvider = ({ children }: Props) => {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => onError(error),
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

  return (
    <TransportProvider transport={rpcTransport}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TransportProvider>
  );
};

function onError(err: unknown) {
  const error = getErrorMessage(err);
  const errorMessage = error.charAt(0).toLocaleUpperCase() + error.slice(1);

  toastManager.add({
    description: errorMessage,
    type: "error",
  });
}
