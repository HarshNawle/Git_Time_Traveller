import z from "zod";
import { UUIDSchema } from "./common.schema.js";
import { FilePathSchema } from "./repo.schema.js";
import { HotspotScoreSchema } from "./git.schema.js";

export const FeedbackVoteSchema = z.enum([
    "UP",
    "DOWN"
]);

export const InsightFeedbackSchema = z.object({
    insightId: UUIDSchema,
    vote: FeedbackVoteSchema,
    commet: z.string().trim().max(1000).optional()
});

export const InsightSchema = z.object({
    id:UUIDSchema,
    repoId: UUIDSchema,
    filePath: FilePathSchema,
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(2000),
    severity: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
    ]),
    hotspotScore: HotspotScoreSchema,
    createdAt: z.coerce.date(),
});