import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const feedbackVoteEnum = pgEnum("feedback_vote", ["up", "down"]);

export const insightFeedback = pgTable("insight_feedback", {
    id: uuid("id").defaultRandom().primaryKey(),
    insightId: uuid("insight_id").notNull(),
    userId: uuid("user_id").notNull(),
    vote: feedbackVoteEnum("vote").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});