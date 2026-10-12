import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";


export const sessions = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull()
        .references(() => users.id, {
            onDelete: "cascade"
        }),

    refreshTokenHash: varchar("refresh_token_hash", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at", {
        withTimezone: true
    }).notNull(),
    revokedAt: timestamp("revoked_at", {
        withTimezone: true
    }),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
},
    (table) => ({
        userIdIdx: index("sessions_user_d_idx").on(table.userId),
    }),
);