import { useQuery } from "@tanstack/react-query";

export function useAnalysisJob(repositoryId: string) {
  return useQuery({
    queryKey: ["analysis-job", repositoryId],

    queryFn: () =>
      getAnalysisJob(repositoryId),

    enabled: Boolean(repositoryId),

    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (
        status === "completed" ||
        status === "failed" ||
        status === "cancelled"
      ) {
        return false;
      }

      return 1000;
    },
  });
}