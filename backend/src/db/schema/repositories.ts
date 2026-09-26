import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const repositorySourceTypeEnum = pgEnum(
    "repositroy_source_type" , [
        "github", "local"
    ]
);

export const repositories = pgTable(
    "repositories",{
        id: uuid("id").defaultRandom().primaryKey(),
        sourceType: repositorySourceTypeEnum(
            "source_type"
        ).notNull(),
        url: text("url"),
        owner: varchar("owner", {
            length: 255
        }),
        name: varchar("name", {
            length: 255,
        }).notNull(),
        defaultBranch: varchar(
            "default_branch",
            {
                length: 255
            }
        ),
        commitCount: integer(
            "commit_count"
        ).default(0).notNull(),
        fileCount: integer("file_count").default(0).notNull(),
        createdAt: timestamp(
            "created_at", {
                withTimezone: true
            }
        ).defaultNow().notNull(),
        updatedAt: timestamp("updated_at",{
            withTimezone: true
        }).defaultNow().notNull(),
    }
);
