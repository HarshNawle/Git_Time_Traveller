import { eq } from "drizzle-orm";

import { db } from "../db/client.js";
import { user } from "../db/index.js";

export class UserRepository {
  async findById(id: string) {
    const result = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByGithubId(githubId: string) {
    const result = await db
      .select()
      .from(user)
      .where(eq(user.githubId, githubId))
      .limit(1);

    return result[0] ?? null;
  }

  async create(data: {
    githubId: string;
    githubUsername: string;
    avatar?: string | null;
  }) {
    const result = await db
      .insert(user)
      .values({
        githubId: data.githubId,
        githubUsername: data.githubUsername,
        avatar: data.avatar ?? null,
      })
      .returning();

    return result[0];
  }

  async findOrCreate(data: {
    githubId: string;
    githubUsername: string;
    avatar?: string | null;
  }) {
    const existingUser = await this.findByGithubId(data.githubId);

    if (existingUser) {
      return existingUser;
    }

    return this.create(data);
  }

  async deleteById(id: string) {
    const result = await db
      .delete(user)
      .where(eq(user.id, id))
      .returning();

    return result[0] ?? null;
  }
}