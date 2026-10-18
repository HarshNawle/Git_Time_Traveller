import {
    pgEnum,
    pgTable,
    uuid,
    timestamp,
    uniqueIndex,
  } from "drizzle-orm/pg-core";
  import { repositories } from "./repositories.js";
import { users } from "./users.js";
  
  export const repositoryRoleEnum = pgEnum(
    "repository_role",
    [
      "OWNER",
      "EDITOR",
      "VIEWER",
    ],
  );
  
  export const repositoryMemberships = pgTable(
    "repository_memberships",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      userId: uuid("user_id")
        .notNull()
        .references(() => users.id, {
          onDelete: "cascade",
        }),
  
      repositoryId: uuid("repository_id")
        .notNull()
        .references(() => repositories.id, {
          onDelete: "cascade",
        }),
  
      role: repositoryRoleEnum("role")
        .default("OWNER")
        .notNull(),
  
      createdAt: timestamp("created_at", {
        withTimezone: true,
      })
        .defaultNow()
        .notNull(),
    },
    (table) => ({
      userRepositoryUnique: uniqueIndex(
        "user_repository_unique",
      ).on(
        table.userId,
        table.repositoryId,
      ),
    }),
  );