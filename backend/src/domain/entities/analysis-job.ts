import { AnalysisJobStatus, AnalysisStage } from "../enums/analysis.js";

  
  export interface AnalysisJob {
    id: string;
  
    repositoryId: string;
  
    status:
      AnalysisJobStatus;
  
    stage:
      AnalysisStage;
  
    progress: number;
  
    errorCode:
      string | null;
  
    errorMessage:
      string | null;
  
    startedAt:
      Date | null;
  
    completedAt:
      Date | null;
  
    createdAt: Date;
  
    updatedAt: Date;
  }