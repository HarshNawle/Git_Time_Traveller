import { relations } from "drizzle-orm";

import { repositories } from "./schema/repositories.js";
import { commits } from "./schema/commits.js";

export const repositoryRelations = relations(
  repositories,
  ({ many }) => ({
    commits: many(commits),
  })
);

export const commitRelations = relations(
  commits,
  ({ one }) => ({
    repository: one(repositories, {
      fields: [commits.repositoryId],
      references: [repositories.id],
    }),
  })
);