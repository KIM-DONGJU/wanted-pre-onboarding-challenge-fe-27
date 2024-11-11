import { QueryClient } from "@tanstack/react-query";
import { ONE_MINUTE } from "../const/time";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * ONE_MINUTE,
      gcTime: 5 * ONE_MINUTE,
    },
  },
});