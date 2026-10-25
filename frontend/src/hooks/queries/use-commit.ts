import { useQuery } from "@tanstack/react-query";
import { commitApi } from "@/api/dashboard/dashboard.api";

export function useLatestCommit(fullName: string) {
  const [owner, repo] = fullName.split("/");

  return useQuery({
    queryKey: ["latest-commit", fullName],
    queryFn: () => commitApi.getLatestCommit(owner, repo),
    enabled: Boolean(owner && repo),
    staleTime: 5 * 60 * 1000,
  });
}

export function useContributorsStats(fullName: string) {
  const [owner, repo] = fullName.split("/");

  return useQuery({
    queryKey: ["contributors-stats", fullName],
    queryFn: () => commitApi.getContributorsStats(owner, repo),
    enabled: Boolean(owner && repo),
    staleTime: 10 * 60 * 1000,
  });
}