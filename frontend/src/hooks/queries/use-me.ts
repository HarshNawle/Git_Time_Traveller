import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/auth.store";
import { authApi } from "@/api/auth";

export function useMe() {
  const accessToken = useAuthStore((state) => state.getAccessToken());

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("No access token available");
      }
      return authApi.getMe(accessToken);
    },
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: unknown) => {
      // Don't retry on 401 (token expired)
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        (error as { status: number }).status === 401
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });
}