import { dashboardApi } from "@/api/dashboard/dashboard.api";
import { useAuthStore } from "@/stores/auth.store"
import { useQuery } from "@tanstack/react-query";


export const useUserRepositories = () => {
    const username = useAuthStore((state) => state.user?.githubUsername);

    return useQuery({
        queryKey: ["user", "repositories", username],
        queryFn: () => dashboardApi.getWorkspace(username!),
        enabled: Boolean(username),
        staleTime: 5*60*1000,
        select: (data) => data.repositories,
    });
};
