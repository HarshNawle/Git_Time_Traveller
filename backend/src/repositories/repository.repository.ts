import { and, eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { repositories } from "../db/index.js";



export class RepositoryRepository {
  async findById(id: string) {
    const result = await db
      .select()
      .from(repositories)
      .where(eq(repositories.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByUrl(url: string) {
    const result = await db
      .select()
      .from(repositories)
      .where(eq(repositories.url, url))
      .limit(1);

    return result[0] ?? null;
  }

  async findByOwnerAndName(owner: string, name: string) {
    const result = await db
      .select()
      .from(repositories)
      .where(
        and(
          eq(repositories.owner, owner),
          eq(repositories.name, name)
        )
      )
      .limit(1);

    return result[0] ?? null;
  }

  async create(data: {
    sourceType: "github" | "local";
    url?: string | null;
    owner?: string | null;
    name: string;
    defaultBranch?: string | null;
    commitCount?: number;
    fileCount?: number;
  }) {
    const result = await db
      .insert(repositories)
      .values({
        sourceType: data.sourceType,
        url: data.url ?? null,
        owner: data.owner ?? null,
        name: data.name,
        defaultBranch: data.defaultBranch ?? null,
        commitCount: data.commitCount ?? 0,
        fileCount: data.fileCount ?? 0,
      })
      .returning();

    return result[0];
  }

  async updateStats(
    id: string,
    data: {
      commitCount?: number;
      fileCount?: number;
      defaultBranch?: string;
    }
  ) {
    const result = await db
      .update(repositories)
      .set({
        ...(data.commitCount !== undefined && {
          commitCount: data.commitCount,
        }),

        ...(data.fileCount !== undefined && {
          fileCount: data.fileCount,
        }),

        ...(data.defaultBranch !== undefined && {
          defaultBranch: data.defaultBranch,
        }),
      })
      .where(eq(repositories.id, id))
      .returning();

    return result[0] ?? null;
  }

  async deleteById(id: string) {
    const result = await db
      .delete(repositories)
      .where(eq(repositories.id, id))
      .returning();

    return result[0] ?? null;
  }
}