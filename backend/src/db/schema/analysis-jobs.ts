import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { repositories } from "./repositories.js";

export const analysisJobStatusEnum = pgEnum("analysis_job_status", [
    "queued",
    "running",
    "completed",
    "failed",
    "cancelled",
]);

export const analysisStageEnum = pgEnum("analysis_stage", [
    "connecting",
    "cloning",
    "parsing",
    "computing",
    "insights",
    "completed",
]);

export const analysisJobs = pgTable("analysis_jobs", {
    id: uuid("id").defaultRandom().primaryKey(),
    repositoryId: uuid("repository_id").notNull()
        .references(() => repositories.id, {
            onDelete: "cascade"
        }),
    status: analysisJobStatusEnum(
        "status"
    ).default("queued").notNull(),

    stage: analysisStageEnum("stage")
        .default("connecting").notNull(),
    errorCode: varchar("error_code",{length: 100}),

    errorMessage: text(
        "error_message"
    ),
    startedAt: timestamp(
        "started_at",{
            withTimezone: true
        }
    ),
    completedAt: timestamp("completed_at", {
        withTimezone: true,
    }),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
    }).defaultNow().notNull()
});