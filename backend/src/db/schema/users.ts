import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const user = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    githubId: varchar("github_id", {
        length: 255,
    }).notNull().unique(),
    githubUsername: varchar("github_username", {
        length: 255,
    }).notNull(),
    githubAvatarUrl: text(
        "github_avatar_url"
    ),

    createdAt: timestamp(
        "created_at", {
            withTimezone: true
        }
    ).defaultNow().notNull(),
    updatedAt: timestamp(
        "updated_at",{
            withTimezone: true
        }
    ).defaultNow().notNull(), 
});