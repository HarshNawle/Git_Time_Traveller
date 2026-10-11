import { index, pgEnum, pgTable, unique, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { repositories } from "./repositories.js";


export const gitReferenceTypeEnum = pgEnum("git_reference_type", [
    "LOCAL_BRANCH",
    "REMOTE_BRANCH",
    "TAG"
]);

export const gitReferences = pgTable("git_references", {
    id: uuid("id").defaultRandom().primaryKey(),

    repositoryId: uuid("repository_id")
      .notNull()
      .references(() => repositories.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", {
      length: 500,
    }).notNull(),

    type: gitReferenceTypeEnum("type").notNull(),
    targetCommitHash: varchar("target_commit_hash",{length: 40}).notNull(),
},
    (table) => ({
        referenceUnique: uniqueIndex("repository_reference_unique")
            .on(table.repositoryId, table.type,table.name),
        
        respositoryIdx: index("git_references_repository_idx")
            .on(table.repositoryId)
    })
);