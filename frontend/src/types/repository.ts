export interface Repository {
    id: string;
  
    owner: string;
  
    name: string;
  
    fullName: string;
  
    description?: string;
  
    url: string;
  
    defaultBranch: string;
  
    stars?: number;
  
    estimatedCommits?: number;
  
    size?: string;
  
    createdAt?: string;
  
    topics?: string[];
  }