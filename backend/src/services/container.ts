import {
    RepositoryService,
    AnalysisService,
    InsightService,
    ExportService,
  } from "./index";

  export interface ServiceContainer {
    repositoryService: RepositoryService;
    analysisService: AnalysisService;
    insightService: InsightService;
    exportService: ExportService;
  }