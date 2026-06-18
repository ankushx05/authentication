import { createConnectTransport } from "@connectrpc/connect-web";

export const rpcTransport = createConnectTransport({
  baseUrl: "http://localhost:8888",
  useBinaryFormat: process.env.NODE_ENV === "production",
  fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
});
