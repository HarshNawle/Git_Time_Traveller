import z from "zod";
import { UUIDSchema } from "./common.schema.js";

export const JobIdSchema = z.object({
    jobId: UUIDSchema,
});

export const JobStatusSchema = z.enum([
    "QUEUED",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    "CANCELLED",
]);

export const JobStageSchema = z.enum([
    "VALIDATING",
    "CLONING",
    "PARSING",
    "ANALYZING",
    "GENERATING_INSIGHTS",
    "STORING",
    "COMPLETED",
    "FAILED",
]);

export const JobProgressSchema = z
    .number()
    .int()
    .min(0)
    .max(100);

export const AnalysisJobSchema = z.object({
    id: UUIDSchema,
    repoId: UUIDSchema,
    status: JobStatusSchema,
    stage: JobStageSchema,
    progress: JobProgressSchema,

    message: z
        .string().max(500).optional(),
    createdAt: z.coerce.date(),
    updateAt: z.coerce.date()
});

export const CancelAnalysisJobSchema = z.object({
    jodId: UUIDSchema
});

export const AnalysisProgressEventSchema = z.object({
    stage: JobStageSchema,
    progress: JobProgressSchema,
    message: z.string().min(1).max(500),
});

