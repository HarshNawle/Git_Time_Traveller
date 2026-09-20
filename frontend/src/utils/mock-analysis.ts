import type { AnalysisJob } from "@/types/analysis";

export const mockAnalysisJob: AnalysisJob = {
  id: "demo-analysis",

  repositoryId: "demo",

  status: "running",

  progress: 72,

  currentStep: 4,

  totalSteps: 6,

  currentStepLabel: "Building timeline data",

  estimatedTime: "~ 1 minute",

  steps: [
    {
      id: "repository",
      title: "Repository found",
      description:
        "Repository is valid and accessible",
      status: "completed",
      duration: "2s",
    },

    {
      id: "commits",
      title: "Fetching commits",
      description:
        "Downloaded 12,463 commits",
      status: "completed",
      duration: "18s",
    },

    {
      id: "branches",
      title: "Processing branches and tags",
      description:
        "Found 42 branches and 128 tags",
      status: "completed",
      duration: "24s",
    },

    {
      id: "timeline",
      title: "Building timeline data",
      description:
        "Analyzing commit relationships, merges, and file changes...",
      status: "running",
      duration: "6s",
    },

    {
      id: "insights",
      title: "Generating insights",
      description:
        "Calculating contributors, language usage, and patterns...",
      status: "pending",
    },

    {
      id: "finalize",
      title: "Finalizing analysis",
      description:
        "Almost there...",
      status: "pending",
    },
  ],
};