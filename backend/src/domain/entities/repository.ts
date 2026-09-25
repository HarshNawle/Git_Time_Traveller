import { RepositorySourceType } from "../enums/repository.js";

  
  export interface Repository {
    id: string;
  
    sourceType:
      RepositorySourceType;
  
    url: string | null;
  
    owner: string | null;
  
    name: string;
  
    defaultBranch:
      string | null;
  
    commitCount: number;
  
    fileCount: number;
  
    createdAt: Date;
  
    updatedAt: Date;
  }