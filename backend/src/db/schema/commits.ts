import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    integer,
    uniqueIndex,
    index,
  } from "drizzle-orm/pg-core";
  
  import { repositories } from "./repositories.js";
  
  export const commits = pgTable("commits", {
    id: uuid("id").defaultRandom().primaryKey(),
  
    repositoryId: uuid("repository_id")
      .notNull()
      .references(() => repositories.id, {
        onDelete: "cascade",
      }),
  
    hash: varchar("hash", {
      length: 40,
    })
      .notNull(),

    shortHash: varchar("short_hash", {
      length: 12,
    })
      .notNull(),
  
    message: text("message").notNull(),
  
    authorName: varchar("author_name", {
      length: 255,
    }),
  
    authorEmail: varchar("author_email", {
      length: 320,
    }),
  
    committedAt: timestamp("committed_at", {
      withTimezone: true,
    }).notNull(),
  
    additions: integer("additions").notNull().default(0),
  
    deletions: integer("deletions").notNull().default(0),
  
    changedFiles: integer("changed_files").notNull().default(0),
  
    url: text("url"),
  
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
    (table) => ({
      repoHashUnique: uniqueIndex("repository_commit_hash_unique")
        .on( table.repositoryId, table.hash),

      repoTimeIdx: index("commits_repository_time_idx")
        .on( table.repositoryId, table.committedAt )
    }),
  );