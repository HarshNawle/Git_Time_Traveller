import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { analysisJobs } from "../db/index.js";



export class AnalysisJobRepository {
  async findById(id: string) {
    const result = await db
      .select()
      .from(analysisJobs)
      .where(eq(analysisJobs.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByRepositoryId(repositoryId: string) {
    return db
      .select()
      .from(analysisJobs)
      .where(eq(analysisJobs.repositoryId, repositoryId));
  }

  async create(data: {
    repositoryId: string;
    status?: "queued" | "running" | "completed" | "failed" | "cancelled";
    stage?:
      | "connecting"
      | "cloning"
      | "parsing"
      | "computing"
      | "insights"
      | "completed";
  }) {
    const result = await db
      .insert(analysisJobs)
      .values({
        repositoryId: data.repositoryId,
        status: data.status ?? "queued",
        stage: data.stage ?? "connecting",
        progress: 0,
      })
      .returning();

    return result[0];
  }

  async updateStatus(
    id: string,
    data: {
      status:
        | "queued"
        | "running"
        | "completed"
        | "failed"
        | "cancelled";

      stage?:
        | "connecting"
        | "cloning"
        | "parsing"
        | "computing"
        | "insights"
        | "completed";

      progress?: number;

      errorCode?: string | null;

      errorMessage?: string | null;

      startedAt?: Date | null;

      completedAt?: Date | null;
    }
  ) {
    const result = await db
      .update(analysisJobs)
      .set({
        status: data.status,

        ...(data.stage !== undefined && {
          stage: data.stage,
        }),

        ...(data.progress !== undefined && {
          progress: data.progress,
        }),

        ...(data.errorCode !== undefined && {
          errorCode: data.errorCode,
        }),

        ...(data.errorMessage !== undefined && {
          errorMessage: data.errorMessage,
        }),

        ...(data.startedAt !== undefined && {
          startedAt: data.startedAt,
        }),

        ...(data.completedAt !== undefined && {
          completedAt: data.completedAt,
        }),
      })
      .where(eq(analysisJobs.id, id))
      .returning();

    return result[0] ?? null;
  }

  async updateProgress(id: string, progress: number) {
    const result = await db
      .update(analysisJobs)
      .set({
        progress,
      })
      .where(eq(analysisJobs.id, id))
      .returning();

    return result[0] ?? null;
  }

  async cancel(id: string) {
    const result = await db
      .update(analysisJobs)
      .set({
        status: "cancelled",
      })
      .where(eq(analysisJobs.id, id))
      .returning();

    return result[0] ?? null;
  }
}