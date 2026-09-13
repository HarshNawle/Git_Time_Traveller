import { useMutation } from "@tanstack/react-query";

import { graphqlRequest } from "@/api/graphql-client";

const SUBMIT_REPO = `
  mutation SubmitRepo($url: String!) {
    submitRepo(url: $url) {
      id
      status
      stage
      progress
      repoId
    }
  }
`;

interface SubmitRepoResponse {
  submitRepo: {
    id: string;
    status: string;
    stage: string;
    progress: number;
    repoId: string | null;
  };
}

export function useSubmitRepoMutation() {
  return useMutation({
    mutationFn: async (url: string) => {
      const result =
        await graphqlRequest<SubmitRepoResponse>(
          SUBMIT_REPO,
          { url }
        );

      return result.submitRepo;
    },
  });
}