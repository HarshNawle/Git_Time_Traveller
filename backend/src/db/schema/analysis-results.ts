import { pgTable, integer, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const analysisResults = pgTable("analysis_results", {
    id: uuid("id").defaultRandom().primaryKey(),
    analysisJobId: uuid("analysis_job_id").notNull(),
    storageKey: text("storage_key").notNull(),
    resultVersion: varchar("result_version", { length: 50 }).notNull(),
    commitCount: integer("commit_count").default(0).notNull(),
    fileCount: integer("file_count").default(0).notNull(),
    contributorCount: integer("contributor_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
});