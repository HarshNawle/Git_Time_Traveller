import z from "zod";
import { UUIDSchema } from "./common.schema.js";

export const ExportFormatSchema = z.enum([
    "GIF",
    "MP4",
    "WEBM",
    "PNG",
    "JPEG",
]);

export const StartExportSchema = z.object({
    repoId: UUIDSchema,
    format: ExportFormatSchema,
    scope: z.enum([
        "TIMELINE",
        "HEATMAP",
        "CONTRIBUTORS",
    ]),
    quality: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH"
    ]).default("MEDIUM")
});