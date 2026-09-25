export interface AnalysisResult {
    id: string;
  
    analysisJobId: string;
  
    storageKey: string;
  
    resultVersion: string;
  
    commitCount: number;
  
    fileCount: number;
  
    contributorCount: number;
  
    createdAt: Date;
  
    expiresAt: Date | null;
  }