import z from "zod";
import { UUIDSchema } from "./common.schema.js";
import { RepoFilterSchema } from "./repo.schema.js";

export const TimelineFileSchema = z.object({
    repoId: UUIDSchema,
    filter: RepoFilterSchema.optional() 
});

export const HeatmapFilterSchema = z.object({
    repoId: UUIDSchema,
    filter: RepoFilterSchema.optional(),
    granularity: z.enum([
        "daily",
        "weekly",
        "monthly",
    ]),
});

export const ContributorFilterSchema = z.object({
    repoId: UUIDSchema,
    filter: RepoFilterSchema.optional(),
    contributorId: UUIDSchema.optional()
});