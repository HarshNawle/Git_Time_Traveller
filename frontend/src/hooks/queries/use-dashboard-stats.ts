import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/api/dashboard/dashboard.api";

export function useDashboardStats(username?: string) {
  return useQuery({
    queryKey: ["dashboard", "workspace", username],
    queryFn: () => dashboardApi.getWorkspace(username!),
    enabled: Boolean(username),
    staleTime: 5 * 60 * 1000,
  });
}
