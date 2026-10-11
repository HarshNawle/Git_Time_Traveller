import { relations } from "drizzle-orm";
import { repositories, user } from "./index.js";
import { repositoryMemberships } from "./schema/memberships.js";
import { sessions } from "./schema/sessions.js";
import { commits } from "./schema/commits.js";
import { gitReferences } from "./schema/git-references.js";
import { fileMetrics } from "./schema/file-metrics.js";
import { contributorMetrics } from "./schema/contributor-metrics.js";
import { commitParents } from "./schema/commit-parent.js";
import { fileChanges } from "./schema/file-changes.js";


export const usersRelations = relations(
  user,
  ({ many }) => ({
    memberships: many(repositoryMemberships),
    sessions: many(sessions),
  }),
);

export const repositoriesRelations = relations(
  repositories,
  ({ many }) => ({
    memberships: many(repositoryMemberships),
    commits: many(commits),
    gitReferences: many(gitReferences),
    fileMetrics: many(fileMetrics),
    contributorMetrics: many(contributorMetrics),
  }),
);

export const membershipsRelations = relations(
  repositoryMemberships,
  ({ one }) => ({
    user: one(user, {
      fields: [repositoryMemberships.userId],
      references: [user.id],
    }),

    repository: one(repositories, {
      fields: [repositoryMemberships.repositoryId],
      references: [repositories.id],
    }),
  }),
);

export const sessionsRelations = relations(
  sessions,
  ({ one }) => ({
    user: one(user, {
      fields: [sessions.userId],
      references: [user.id],
    }),
  }),
);

export const commitsRelations = relations(
  commits,
  ({ one, many }) => ({
    repository: one(repositories, {
      fields: [commits.repositoryId],
      references: [repositories.id],
    }),

    parents: many(commitParents),
    fileChanges: many(fileChanges),
  }),
);

export const commitParentsRelations = relations(
  commitParents,
  ({ one }) => ({
    commit: one(commits, {
      fields: [commitParents.commitId],
      references: [commits.id],
    }),
  }),
);

export const fileChangesRelations = relations(
  fileChanges,
  ({ one }) => ({
    commit: one(commits, {
      fields: [fileChanges.commitId],
      references: [commits.id],
    }),
  }),
);

export const gitReferencesRelations = relations(
  gitReferences,
  ({ one }) => ({
    repository: one(repositories, {
      fields: [gitReferences.repositoryId],
      references: [repositories.id],
    }),
  }),
);

export const fileMetricsRelations = relations(
  fileMetrics,
  ({ one }) => ({
    repository: one(repositories, {
      fields: [fileMetrics.repositoryId],
      references: [repositories.id],
    }),
  }),
);

export const contributorMetricsRelations = relations(
  contributorMetrics,
  ({ one }) => ({
    repository: one(repositories, {
      fields: [contributorMetrics.repositoryId],
      references: [repositories.id],
    }),
  }),
);