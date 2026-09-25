export const analysisJobStatuses = [
    "queued",
    "running",
    "completed",
    "failed",
    "cancelled",
] as const;

export type AnalysisJobStatus = (typeof analysisJobStatuses)[number];

export const analysisStage = [
    "connecting",
    "cloning",
    "parsing",
    "computing",
    "insights",
    "completed",
] as const;

export type AnalysisStage = (typeof analysisStage)[number];