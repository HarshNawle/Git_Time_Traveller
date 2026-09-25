export const exportFormats = [
    "gif",
    "webm",
  ] as const;
  
  export type ExportFormat =
    (typeof exportFormats)[number];
  
  
  export const exportScopes = [
    "filtered",
    "full",
  ] as const;
  
  export type ExportScope =
    (typeof exportScopes)[number];
  
  
  export const exportStatuses = [
    "queued",
    "processing",
    "completed",
    "failed",
    "cancelled",
  ] as const;
  
  export type ExportStatus =
    (typeof exportStatuses)[number];