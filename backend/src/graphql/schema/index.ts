import { GraphQLContext } from "../context.js";
import { repositories, analysisJobs } from "../../db/schema/index.js";
import { eq } from "drizzle-orm";

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
      const result = await context.db
        .select()
        .from(analysisJobs)
        .where(eq(analysisJobs.id, jobId))
        .limit(1);
      return result[0] || null;
    },

    repoInsights: async (
      _: unknown,
      { repoId }: { repoId: string },
      context: GraphQLContext
    ) => {
      const result = await context.db
        .select()
        .from(repositories)
        .where(eq(repositories.id, repoId))
        .limit(1);
      return result[0] || null;
    },
  },

  Mutation: {
    submitRepo: async (
      _: unknown,
      { url }: { url: string },
      context: GraphQLContext
    ) => {
      const result = await context.db
        .insert(repositories)
        .values({
          sourceType: "github",
          url,
          name: url.split("/").pop() || "unknown",
        })
        .returning();
      return result[0];
    },

    cancelAnalysisJob: async (
      _: unknown,
      { jobId }: { jobId: string },
      context: GraphQLContext
    ) => {
      await context.db
        .update(analysisJobs)
        .set({ status: "cancelled", completedAt: new Date() })
        .where(eq(analysisJobs.id, jobId));
      return true;
    },
  },
};