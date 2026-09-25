import { InsightSeverity } from "../enums/insight.js";

  
  export interface Insight {
    id: string;
  
    analysisResultId: string;
  
    repositoryId: string;
  
    path: string;
  
    title: string;
  
    summary: string;
  
    severity: InsightSeverity;
  
    metadata: Record<string, unknown>;
  
    createdAt: Date;
  }