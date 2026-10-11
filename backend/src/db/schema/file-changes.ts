import { index, integer, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { commits } from "./commits.js";

export const fileChangeStatusEnum = pgEnum("file_change_status", [
    "ADDED",
    "MODIFIED",
    "DELETED",
    "RENAMED",
    "COPIED",
    "BINARY",
]);

export const fileChanges = pgTable("file_changes", {
    id: uuid("id").defaultRandom().primaryKey(),
    commitId: uuid("commit_id").notNull().references(() => commits.id, {
        onDelete: "cascade"
    }),
    path: varchar("path", { length: 1000 }).notNull(),
    oldPath: varchar("old_path", { length: 1000 }),
    additions: integer("additions").default(0).notNull(),
    deletions: integer("deletions").default(0).notNull(),
    status: fileChangeStatusEnum("status").notNull()
},
    (table) => ({
        commitIdx: index("file_changes_commit_idx").on(table.commitId),
        pathIdx: index("file_changes_path_idx").on(table.path) 
    })
);