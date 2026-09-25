export interface RepoFilter {
    dateFrom?: Date;
  
    dateTo?: Date;
  
    authors?: string[];
  
    pathPattern?: string;
  
    branch?: string;
  }