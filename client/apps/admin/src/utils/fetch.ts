import { ConnectError } from "@connectrpc/connect";

export const getErrorMessage = (err: unknown): string => {
  const unknownError = "Something went wrong";
  if (err instanceof ConnectError) {
    return err.rawMessage || unknownError;
  } else if (err instanceof Error) {
    return err.message || unknownError;
  } else {
    return unknownError;
  }
};
