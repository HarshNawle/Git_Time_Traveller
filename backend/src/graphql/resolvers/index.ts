import { GraphQLContext } from "../context.js";

export const resolvers = {
  Query: {
    health: () => {
      return "Git History Time Traveller API is running";
    },

    analysisJob: async (
      _: unknown,
      { jobId }: { jobId: string },
      context: GraphQLContext
    ) => {
      return context.services.analysisService.getJob(
        jobId
      );
    },

    repoInsights: async (
      _: unknown,
      { repoId }: { repoId: string },
      context: GraphQLContext
    ) => {
      return context.services.insightService
        .getRepositoryInsights(repoId);
    },
  },

  Mutation: {
    submitRepo: async (
      _: unknown,
      { url }: { url: string },
      context: GraphQLContext
    ) => {
      return context.services.repositoryService
        .submitGitHubRepository({ url });
    },

    cancelAnalysisJob: async (
      _: unknown,
      { jobId }: { jobId: string },
      context: GraphQLContext
    ) => {
      await context.services.analysisService
        .cancelJob(jobId);

      return true;
    },
  },
};