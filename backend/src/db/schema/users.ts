import { bigint, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core"

export const user = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    githubId: bigint("github_id", {
        mode: "number"
    }).notNull().unique(),
    githubUsername: varchar("github_username", {
        length: 100,
    }).notNull(),
    displayName: varchar("display_name", {
        length: 200
    }),
    email: varchar("email", { length: 320 }),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    ceatedAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updateAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
},
    (table) => ({
        githubIdIdx: uniqueIndex("user_github_id_idx").on(table.githubId),
    }),
);