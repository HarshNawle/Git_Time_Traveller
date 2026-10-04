import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const exportStatusEnum = pgEnum("export_status", ["pending", "processing", "completed", "failed"]);
export const exportFormatEnum = pgEnum("export_format", ["json", "csv", "pdf", "markdown"]);

export const exports = pgTable("exports", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    repositoryId: uuid("repository_id"),
    analysisResultId: uuid("analysis_result_id"),
    format: exportFormatEnum("format").notNull(),
    status: exportStatusEnum("status").default("pending").notNull(),
    storageKey: text("storage_key"),
    errorMessage: text("error_message"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
});