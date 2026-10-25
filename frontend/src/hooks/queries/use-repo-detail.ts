import { useQuery } from "@tanstack/react-query";
import { repoDetailApi } from "@/api/dashboard/dashboard.api";

export function useRepoDetail(fullName: string) {
  const [owner, repo] = fullName.split("/");

  return useQuery({
    queryKey: ["repo-detail", fullName],
    queryFn: () => repoDetailApi.getFullDetail(owner, repo),
    enabled: Boolean(owner && repo),
    staleTime: 10 * 60 * 1000,
  });
}