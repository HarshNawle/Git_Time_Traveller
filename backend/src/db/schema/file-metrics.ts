import { integer, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core"
import { repositories } from "./repositories.js"


export const fileMetrics = pgTable("file_metrics", {
    id: uuid("id").defaultRandom().primaryKey(),
    repositoryId: uuid("repository_id").notNull()
        .references(() => repositories.id, {
            onDelete: "cascade"
        }),
    filePath: varchar("file_path", {length: 1000}).notNull(),
    commitCount: integer("commit_count").default(0).notNull(),
    totalAdditions: integer("total_additions").default(0).notNull(),
    churn: integer("churn").default(0).notNull(),
    riskScore: integer("risk_score").default(0).notNull(),
    lastChangedAt: timestamp("last_changed_at",{withTimezone: true})
},
    (table) => ({
        repositoryFileUnique: uniqueIndex("repository_file_metrics_unique")
            .on(table.repositoryId, table.filePath)
    })
);
