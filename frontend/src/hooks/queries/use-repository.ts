import { dashboardApi } from "@/api/dashboard/dashboard.api";
import { useAuthStore } from "@/stores/auth.store"
import { useQuery } from "@tanstack/react-query";

export const useRepository = (repositoryId: string) => {
    const username = useAuthStore((state) => state.user?.githubUsername);

    return useQuery({
        queryKey: ["repository", repositoryId, username],
        queryFn: async () => {
          const data = await dashboardApi.getWorkspace(username!);
          return data.repositories.find((r) => r.id === repositoryId);
        },
        enabled: Boolean(username && repositoryId),
        staleTime: 5 * 60 * 1000,
    })
}