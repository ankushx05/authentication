import { useQuery } from "@connectrpc/connect-query";
import { getProfileApi } from "../api";

export const useProfile = () => {
  return useQuery(getProfileApi);
};
