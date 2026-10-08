import z from "zod";
import { FilePathSchema } from "./repo.schema.js";

export const CommitSchema = z.object({
    hash: z.string().regex(/^[a-f0-9]{7,40}$/,"Invalid Git commit hash"),
    message: z.string().min(1).max(1000),
    author: z.string().min(1).max(200),
    email: z.string().email().optional(),
    timestamp: z.coerce.date()
});

export const FileChangeSchema = z.object({
    path: FilePathSchema,
    additions: z.number().int().min(0),
    deletions: z.number().int().min(0),
    changes: z.number().int().min(0),

    status: z.enum([
        "added",
        "modified",
        "deleted",
        "renamed"
    ]),
});

export const CommitWithChangesSchema = CommitSchema.extend({
    files: z.array(FileChangeSchema).max(10000)
});

export const FileStatsSchema = z.object({
    path: FilePathSchema,
    totalChanges: z.number().int().min(0),
    additions: z.number().int().min(0),
    deletions: z.number().int().min(0),
    firstChangesAt: z.coerce.date(),
    lastChnagesAt: z.coerce.date(),
    authors: z.array(z.string().min(1)).max(100),
});

export const HotspotScoreSchema = z.object({
    churnScore: z.number().min(0).max(100),
    recencyScore: z.number().min(0).max(100),
    growthScore: z.number().min(0).max(100),
    totalScore: z.number().min(0).max(100),
})