export const repositorySourceTypes = [
    "github",
    "local",
] as const;

export type RepositorySourceType = (typeof repositorySourceTypes)[number]