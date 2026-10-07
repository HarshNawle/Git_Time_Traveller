import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    integer,
  } from "drizzle-orm/pg-core";
  
  import { repositories } from "./repositories.js";
  
  export const commits = pgTable("commits", {
    id: uuid("id").defaultRandom().primaryKey(),
  
    repositoryId: uuid("repository_id")
      .notNull()
      .references(() => repositories.id, {
        onDelete: "cascade",
      }),
  
    sha: varchar("sha", {
      length: 40,
    })
      .notNull()
      .unique(),
  
    message: text("message").notNull(),
  
    authorName: varchar("author_name", {
      length: 255,
    }),
  
    authorEmail: varchar("author_email", {
      length: 255,
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
  });