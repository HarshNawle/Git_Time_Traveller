import z from "zod";
import { BranchSchema, RepoNameSchema } from "./repo.schema.js";

export const LocalStateSchema = z.object({
    commitCount : z.number().int().min(0),
    fileCount : z.number().int().min(0),
    contributorCount : z.number().int().min(0),
    totalAdditions : z.number().int().min(0),
    totalDeletions : z.number().int().min(0),
});

export const SubmitLocalRepoStatsSchema = z.object({
    stats: LocalStateSchema,
    repositoryName: RepoNameSchema,
    branch: BranchSchema.optional()
});



