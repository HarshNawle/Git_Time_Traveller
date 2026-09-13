// export const users = pgTable(
//   "users",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     githubId: varchar("github_id", { length: 32 }).notNull(),
//     username: varchar("username", { length: 255 }).notNull(),
//     avatarUrl: text("avatar_url"),
//     // Nullable: GitHub OAuth "public" scope doesn't guarantee a
//     // verified/public email (TRD §5 — minimum viable scope).
//     email: varchar("email", { length: 320 }),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .notNull()
//       .defaultNow(),
//     lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
//   },
//   (t) => ({
//     // One row per GitHub identity; used to look up/create on OAuth callback.
//     githubIdUnique: uniqueIndex("users_github_id_unique").on(t.githubId),
//   })
// );

import { pgTable } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid
})