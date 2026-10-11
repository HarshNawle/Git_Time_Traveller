import {
    pgTable,
    uuid,
    varchar,
    integer,
    timestamp,
    uniqueIndex,
  } from "drizzle-orm/pg-core";
  
  import { repositories } from "./repositories.js";
  
  export const contributorMetrics = pgTable(
    "contributor_metrics",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      repositoryId: uuid("repository_id")
        .notNull()
        .references(() => repositories.id, {
          onDelete: "cascade",
        }),
  
      contributorIdentity: varchar(
        "contributor_identity",
        {
          length: 320,
        },
      ).notNull(),
  
      displayName: varchar("display_name", {
        length: 200,
      }).notNull(),
  
      commitCount: integer("commit_count")
        .default(0)
        .notNull(),
  
      additions: integer("additions")
        .default(0)
        .notNull(),
  
      deletions: integer("deletions")
        .default(0)
        .notNull(),
  
      filesTouched: integer("files_touched")
        .default(0)
        .notNull(),
  
      lastCommitAt: timestamp("last_commit_at", {
        withTimezone: true,
      }),
    },
    (table) => ({
      contributorUnique: uniqueIndex(
        "repository_contributor_unique",
      ).on(
        table.repositoryId,
        table.contributorIdentity,
      ),
    }),
  );