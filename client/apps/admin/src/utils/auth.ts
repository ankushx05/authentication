import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

export const getAuthState = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookieHeader = getRequestHeader("cookie") ?? "";

    const hasAccessToken = cookieHeader
      .split(";")
      .some((c) => c.trim().startsWith("admin_access_token="));

    return { isAuthenticated: hasAccessToken };
  },
);
