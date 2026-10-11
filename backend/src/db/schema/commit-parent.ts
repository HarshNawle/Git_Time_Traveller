import { index, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { commits } from "./commits.js";


export const commitParents = pgTable("commit_parents", {
    id: uuid("id").defaultRandom().primaryKey(),
    commitId: uuid("commit_id").notNull().references(() => commits.id, {
        onDelete: "cascade"
    }),

    parentHash: varchar("parent_hash", {
        length: 40
    }).notNull(),

    parentOrder: integer("parent_order").notNull(),
},
    (table) => ({
        commitIdx: index("commit_parents_commit_idx",)
            .on(table.commitId),
    })
)