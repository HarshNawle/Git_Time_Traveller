import { pgEnum, pgTable, text, timestamp, uuid, varchar, jsonb } from "drizzle-orm/pg-core";

export const insightSeverityEnum = pgEnum("insight_severity", ["low", "medium", "high"]);

export const insights = pgTable("insights", {
    id: uuid("id").defaultRandom().primaryKey(),
    analysisResultId: uuid("analysis_result_id").notNull(),
    repositoryId: uuid("repository_id").notNull(),
    path: text("path").notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    summary: text("summary").notNull(),
    severity: insightSeverityEnum("severity").notNull(),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});