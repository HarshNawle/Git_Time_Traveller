import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const rpositoryProviderEnum = pgEnum(
    "repositroy_provider" , 
    ["GITHUB"]
);

export const repositoryStatusEnum = pgEnum(
    "repository_status", [
        "PENDING",
        "ANALYZING",
        "COMPLETED",
        "FAILED"
    ],
);

export const repositories = pgTable(
    "repositories",{
        id: uuid("id").defaultRandom().primaryKey(),
        provider: rpositoryProviderEnum("provider").default("GITHUB").notNull(),
        owner: varchar("owner", { length: 100 }).notNull(),
        name: varchar("name", { length: 100 }).notNull(),
        fullName: varchar("full_name", { length: 200 }).notNull(),
        url: varchar("url", { length: 500 }).notNull(),
        defaultBranch: varchar("default_branch", { length: 255 }),
        currentCommitHash: varchar("current_commit_hash", { length: 40 }),
        status: repositoryStatusEnum("status").default("PENDING").notNull(),
        description: text("description"),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    }
);
