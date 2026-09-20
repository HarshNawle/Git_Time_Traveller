export type AnalysisStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type AnalysisStepStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: AnalysisStepStatus;
  duration?: string;
}

export interface AnalysisJob {
  id: string;

  repositoryId: string;

  status: AnalysisStatus;

  progress: number;

  currentStep: number;

  totalSteps: number;

  currentStepLabel: string;

  estimatedTime?: string;

  steps: AnalysisStep[];

  error?: string;
}