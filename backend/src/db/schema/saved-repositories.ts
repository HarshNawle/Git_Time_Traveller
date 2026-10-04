import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const savedRepositories = pgTable("saved_repositories", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    repositoryUrl: text("repository_url").notNull(),
    repositoryName: varchar("repository_name", { length: 255 }).notNull(),
    owner: varchar("owner", { length: 255 }),
    defaultBranch: varchar("default_branch", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});